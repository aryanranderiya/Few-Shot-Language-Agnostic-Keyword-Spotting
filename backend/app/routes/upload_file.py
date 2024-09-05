import aiofiles
from pydantic import BaseModel
from typing import Optional, List
import base64
import os
import utils.common as utils
from fastapi import APIRouter, UploadFile, HTTPException, status, BackgroundTasks
from fastapi.responses import FileResponse
from functions import convert
from services.s3 import upload_file

router = APIRouter()

TEMP_DIR = os.path.join(os.getcwd(), "temp")


class ConvertToAudioResponse(BaseModel):
    audio: str
    keywords: List[str]
    summary: str


@router.post("/convert-to-audio", response_model=ConvertToAudioResponse)
async def convert_to_audio(file: UploadFile, background_tasks: BackgroundTasks):
    file_path = os.path.join(TEMP_DIR, file.filename)
    audio_file_path = None

    try:
        content = await file.read()

        if not os.path.exists(TEMP_DIR):
            os.makedirs(TEMP_DIR)

        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)

        if utils.is_video_file(file.filename):
            audio_file_path = convert.to_audio(file_path)
        elif utils.is_audio_file(file.filename):
            audio_file_path = file_path
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type",
            )

        if audio_file_path:
            async with aiofiles.open(audio_file_path, "rb") as f:
                file_content = await f.read()
            audio_file_url = upload_audio(
                file_content, os.path.basename(audio_file_path))

            if not audio_file_url:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Could not upload to AWS",
                )

            return ConvertToAudioResponse(
                audio=audio_file_url,
                keywords=["lorem", "ipsum"],
                summary="This is a summary"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        background_tasks.add_task(remove_file, file_path)
        if audio_file_path and os.path.exists(audio_file_path):
            background_tasks.add_task(remove_file, audio_file_path)


def remove_file(path: str):
    if os.path.exists(path):
        os.remove(path)


def upload_audio(file_content: bytes, filename: str) -> Optional[str]:
    try:
        random_name = utils.generate_random_file_name()
        url = upload_file(file_content, random_name, filename)
        return url
    except Exception as e:
        return None
