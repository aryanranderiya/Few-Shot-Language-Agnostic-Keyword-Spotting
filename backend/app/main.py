import time

from config import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload_file import router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def ping():
    time.sleep(4)
    return {"Hello": "World"}


app.include_router(router, prefix="/api/v1")

# start the FastAPI application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=config.port)
