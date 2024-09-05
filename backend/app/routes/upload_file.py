import os
from typing import Optional

import utils.common as utils
from fastapi import APIRouter, UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from functions import convert
from services.s3 import upload_file

router = APIRouter()

TEMP_DIR = os.path.join(os.getcwd(), "temp")
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)


@router.post("/convert-to-audio", response_class=FileResponse)
async def convert_to_audio(file: UploadFile):
    file_path = os.path.join(TEMP_DIR, file.filename)

    try:
        # Save the uploaded file to the 'temp' directory
        with open(file_path, "wb") as f:
            f.write(await file.read())

        if utils.is_video_file(file.filename):
            audio_file = await convert.convert_to_audio(file_path)
            return FileResponse(audio_file, filename=os.path.basename(audio_file))

        elif utils.is_audio_file(file.filename):
            return FileResponse(file_path, filename=file.filename)

        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported file type"
            )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )

    finally:
        # Clean up the uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)


@router.post("/upload-audio", tags=["upload"])
async def upload_audio(file: Optional[UploadFile]):
    try:
        if not file:
            return {"error": "File not found"}

        file_path = os.path.join("temp", file.filename)

        file = await process_file(file, file_path)

        if file is None:
            return {"error": "Invalid file format"}

        random_name = utils.generate_random_file_name()

        url = upload_file(file.file, random_name, file.filename)

        return {"message": "Audio file uploaded successfully", "url": url}
    except Exception as e:
        return {"error": str(e)}
    finally:
        os.remove(file_path)
        if file:
            file.file.close()
            os.remove(file.file.name)
