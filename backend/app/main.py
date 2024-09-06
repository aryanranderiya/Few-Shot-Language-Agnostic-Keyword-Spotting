import logging

from config import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import audio
from routes.upload_file import router

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


app.include_router(router, prefix="/api/v1")

# start the FastAPI application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=config.port)
