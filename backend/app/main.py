from typing import Union, Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from functions.convert import to_audio
import os

app = FastAPI()


@app.get("/")
def ping():
    return {"Hello": "World"}


@app.post("/convert_audio")
async def convert_audio(file: UploadFile):
    file_location = f"{file.filename}"\

    with open(file_location, "wb") as f:
        f.write(await file.read())

    result = await to_audio(file_location)

    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])

    return result
