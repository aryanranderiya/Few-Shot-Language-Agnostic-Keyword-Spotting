from moviepy.editor import *


def to_audio(file_path):
    try:
        video = VideoFileClip(file_path)

        if video.audio is None:
            return {"error": "No audio track found in the video file."}

        output_filename = f"{os.path.splitext(file_path)[0]}_audio.mp3"

        video.audio.write_audiofile(output_filename)
        return output_filename

    except Exception as e:
        raise Exception(f"Audio conversion failed: {str(e)}")

    finally:
        if 'video' in locals():
            video.close()
