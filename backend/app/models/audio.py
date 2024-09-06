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
