from moviepy.editor import *


async def convert_to_audio(file_path):
    try:
        video = VideoFileClip(file_path)

        if video.audio is None:
            return {"error": "No audio track found in the video file."}

        output_filename = f"{os.path.splitext(file_path)[0]}_audio.mp3"
        video.audio.write_audiofile(output_filename)
        return output_filename

    except Exception as e:
        return {"error": str(e)}
    finally:
        video.close()
        os.remove(file_path)
