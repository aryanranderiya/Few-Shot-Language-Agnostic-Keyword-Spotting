import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OutputPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    useEffect(() => {
        if (!state) navigate("/");
    }, [state, navigate]);

    return (
        <main className="text-foreground min-w-screen w-screen min-h-screen flex justify-center items-center flex-col gap-2 p-[1em] overflow-scroll py-[90px] bg-gray-100">
            <div className="flex flex-col gap-3 items-center">
                <span className="font-bold sm:text-4xl text-3xl text-center">
                    Output
                </span>
                <span className="text-center">
                    Few Shot Language Agnostic Key Word Spotting system for audio files.
                </span>

                <div className="flex gap-4 flex-col pt-5 items-center">
                    {!!state?.video &&
                        <video
                            width="360"
                            height="360"
                            controls
                            onCanPlay={() => setIsVideoLoaded(true)}
                            className={`${isVideoLoaded ? "visible" : "hidden"}`}
                        >
                            <source src={state?.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }

                    {!!state?.audio &&
                        <audio
                            controls
                            onCanPlay={() => setIsAudioLoaded(true)}
                            className={`${isAudioLoaded ? "visible" : "hidden"} w-[500px]`}
                        >
                            <source src={state?.audio} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    }

                    {!!state?.keywords &&
                        <div className="flex gap-4 justify-between flex-wrap flex-col w-[440px] outline outline-1 outline-gray-300 p-6 rounded-xl">
                            <span className="font-semibold text-2xl">Detected Keywords:</span>
                            <span className="flex flex-wrap max-w-[400px] gap-1 ">
                                {(state.keywords).map((_, index) =>
                                    <Badge className="cursor-default rounded-full h-[25px] min-w-[60px] text-center flex justify-center" key={index}>
                                        Test {index}
                                    </Badge>
                                )}
                            </span>
                        </div>
                    }

                    {!!state?.summary &&
                        <div className="flex gap-4 justify-between flex-wrap flex-col w-[440px] outline outline-1 outline-gray-300 p-6 rounded-xl">
                            <span className="font-semibold text-2xl">Summary</span>
                            <span className="flex flex-wrap max-w-[400px] gap-1 ">
                                {state.summary}
                            </span>
                        </div>
                    }

                </div>
            </div>
        </main>
    )

}
