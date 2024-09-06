from typing import Optional

from fastapi import APIRouter
from models import audio

router = APIRouter()


@router.get("/audios")
async def get_audios(page: Optional[int] = None, limit: Optional[int] = None):
    result = await audio.get_all_audios(page, limit)
    return result


@router.get("/audios/{audio_id}")
async def get_audio_by_id(audio_id: str):
    result = audio.get_audio_by_id(audio_id)
    return result
