import * as React from "react";
import { HardDriveUpload } from "lucide-react";
import FileUploaderComponent from "../components/FileUploader";
import { Button } from "../components/ui/button";
import { LoadingSpinner } from "../components/icons"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
    const [files, setFiles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (files.length === 0) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", files[0]);

        try {

            const response = await axios.post(`${backendUrl}/api/v1/convert-to-audio`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );

            console.log(response.data);
            setFiles([])
            const isVideo = (files[0].type).startsWith('video/');
            const videoURL = isVideo ? URL.createObjectURL(files[0]) : null;

            navigate("/output", {
                state: {
                    audio: response.data.audio,
                    video: videoURL,
                    keywords: response.data.keywords,
                    summary: response.data.summary,
                }
            });

        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="text-foreground min-w-screen w-screen min-h-screen flex justify-center items-center flex-col gap-2 p-[1em]">
            <div className="flex flex-col gap-1 items-center">
                <span className="font-bold sm:text-[1.6rem] text-[1.4rem] text-center">
                    Few Shot Language Agnostic Key Word Spotting system for audio files.
                </span>
                <span className="text-center">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente,
                    autem.
                </span>
            </div>
            <FileUploaderComponent files={files} setFiles={setFiles} />

            <Button
                className="flex gap-2"
                disabled={(files?.length === 0 && !!files) || loading}
                onClick={handleSubmit}
            >
                Submit
                {loading ? <LoadingSpinner /> : <HardDriveUpload width={18} />}
            </Button>
        </main>
    )
}