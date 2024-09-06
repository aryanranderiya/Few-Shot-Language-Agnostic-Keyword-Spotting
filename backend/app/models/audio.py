from config import config
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(config.mongodb_url)
db = client["sih2024"]

# Define the audio model
class Audio:

    def __init__(self, url, keywords, summary):
        self.url = url
        self.keywords = keywords
        self.summary = summary


# Insert a new audio document
def insert_audio(audio):
    audios_collection = db["audios"]
    audios_collection.insert_one(audio.__dict__)


def get_audio_by_id(audio_id):
    audios_collection = db["audios"]
    return audios_collection.find_one({"_id": audio_id})


async def get_all_audios(page, limit):
    audios_collection = db["audios"]
    result = []

    if page is not None and limit is not None:
        cursor = audios_collection.find().skip(page * limit).limit(limit)
    else:
        cursor = audios_collection.find()

    for audio in cursor:
        audio["_id"] = str(audio["_id"])

        result.append(audio)

    return result
