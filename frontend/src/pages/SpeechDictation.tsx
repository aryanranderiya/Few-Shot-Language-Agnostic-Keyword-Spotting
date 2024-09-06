"use client";

import { Button } from "../components/ui/button.js";
import { Mic, Send } from "lucide-react";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function SpeechDictation() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

        const reader = new FileReader();
        reader.onloadend = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          setAudioData(new Uint8Array(arrayBuffer));
        };
        reader.readAsArrayBuffer(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));

        const audioFile = new File([audioBlob], "audioRecording.webm", {
          type: "audio/webm",
        });

        setAudioFile(audioFile);
        setAudioBlob(audioBlob);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  }, []);

  const sendAudioToAPI = useCallback(async () => {
    if (audioFile) {
      const formData = new FormData();
      formData.append("file", audioBlob, "recordedAudio.mp3");

      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/convert-to-audio`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAudioData(null);
        setAudioUrl(null);

        navigate("/output", {
          state: {
            audio: response.data.audio,
            video: null,
            keywords: response.data.keywords,
            summary: response.data.summary,
          },
        });
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  }, [audioData]);

  const tryAgain = useCallback(() => {
    setAudioData(null);
    setAudioUrl(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Speech Dictation
        </h1>
        <div className="flex items-center justify-center mb-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 scale-110"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!!audioUrl}
          >
            <Mic
              className={`w-8 h-8 transition-all duration-300 ${
                isRecording ? "animate-pulse" : ""
              }`}
            />
          </Button>
        </div>
        <p className="mb-4 text-center text-gray-600">
          {isRecording
            ? "Recording..."
            : audioUrl
            ? "Recording complete"
            : "Press the button to start recording"}
        </p>
        {audioUrl && (
          <div className="flex flex-col items-center space-y-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full max-w-md"
            />
            <div className="flex space-x-4">
              <Button
                onClick={tryAgain}
                variant="outline"
                className="flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={sendAudioToAPI} className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Analyse Audio
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
