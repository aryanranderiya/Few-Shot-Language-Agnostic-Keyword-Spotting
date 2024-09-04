from moviepy.editor import VideoFileClip


async def convert_to_audio(file_path: str):
    try:
        video = VideoFileClip(file_path)

        if video.audio is None:
            raise Exception("No audio found in the video")

        output_filename = file_path.replace(file_path.split(".")[-1], "mp3")
        video.audio.write_audiofile(output_filename)
        return output_filename

    except Exception as e:
        raise e
    finally:
        video.close()
