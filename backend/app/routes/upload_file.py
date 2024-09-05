import os
from typing import Optional

import utils.common as utils
from fastapi import APIRouter, UploadFile
from functions import convert
from services.s3 import upload_file

router = APIRouter()

TEMP_DIR = os.path.join(os.getcwd(), "temp")
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)


async def process_file(file: UploadFile, file_path):
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    if utils.is_video_file(file.filename):
        audio_file = await convert.convert_to_audio(file_path)

        f = open(audio_file, "rb")

        audio = UploadFile(filename=os.path.basename(audio_file), file=f)

        return audio

    if not utils.is_audio_file(file.filename):
        return None

    return file


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
        if file_path:
            utils.remove_file(file_path)
        if file and file.file and not file.file.closed:
            file.file.close()
            utils.remove_file(file.file.name)
