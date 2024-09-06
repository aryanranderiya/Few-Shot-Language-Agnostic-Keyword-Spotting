import logging

from config import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.get_audio import router as router_get_audio
from routes.upload_file import router as router_upload

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://sih24-onlycoders.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", 
)

logger = logging.getLogger(__name__)


@app.get("/")
def ping():
    return {"Hello": "World"}


app.include_router(router_upload, prefix="/api/v1")
app.include_router(router_get_audio, prefix="/api/v1")

# start the FastAPI application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=config.port)
