import utils.common as utils
from fastapi import APIRouter, UploadFile
from services.s3 import upload_file

router = APIRouter()


@router.post("/upload-audio", tags=["upload"])
async def upload_audio(file: UploadFile):
    # Check if the file is an audio file
    if not utils.is_audio_file(file.filename):
        return {"error": "File must be an audio file"}

    # Generate a random name for the audio file
    random_name = utils.generate_random_file_name()

    # Upload the audio file to S3
    url = upload_file(file.file, random_name, file.filename)

    return {"message": "Audio file uploaded successfully", "url": url}
