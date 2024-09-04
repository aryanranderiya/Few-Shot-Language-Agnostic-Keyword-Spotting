from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["your_database_name"]


# Define the audio model
class Audio:
    def __init__(self, url, keywords):
        self.url = url
        self.keywords = keywords


# Insert a new audio document
def insert_audio(audio):
    audios_collection = db["audios"]
    audios_collection.insert_one(audio.__dict__)


# Example usage
# if __name__ == "__main__":
#     # Create an instance of Audio
#     audio = Audio(
#         "https://example.com/audio.mp3",
#         [
#             {"keyword": "keyword1", "frequency": 10},
#             {"keyword": "keyword2", "frequency": 5},
#         ],
#     )

#     # Insert the audio document into the database
#     insert_audio(audio)
