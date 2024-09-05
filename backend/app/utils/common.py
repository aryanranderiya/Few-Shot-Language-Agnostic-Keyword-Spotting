import os
import uuid


def generate_random_file_name():
    file_name = str(uuid.uuid4())
    return file_name


def is_audio_file(file_name):
    return file_name.endswith((".mp3", ".wav", ".ogg", ".flac"))


def is_video_file(file_name):
    return file_name.endswith((".mp4", ".avi", ".mov", ".mkv"))


def remove_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)
