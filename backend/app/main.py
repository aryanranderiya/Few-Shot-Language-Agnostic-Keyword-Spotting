from config import config
from fastapi import FastAPI
from routes.upload_file import router

app = FastAPI()

app.include_router(router, prefix="/api/v1")

# start the FastAPI application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=config.port)
