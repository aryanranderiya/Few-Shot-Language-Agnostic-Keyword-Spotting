import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayIcon, PauseIcon } from "lucide-react";
import * as React from "react";

interface AudioFile {
  _id: string;
  summary: string;
  url: string;
  keywords: string[];
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AudioTable() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/audios`);
        if (!response.ok) {
          throw new Error("Failed to fetch audio files");
        }
        const data = await response.json();
        setAudioFiles(data);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching audio files. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAudioFiles();
    setIsLoading(false);
  }, []);

  const togglePlay = (id: string, url: string) => {
    if (playing === id) {
      // If the same audio is playing, pause and reset
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlaying(null);
    } else {
      // If a different audio is selected, play the new one
      if (audioRef.current) {
        audioRef.current.pause(); // Stop any current playing audio
        audioRef.current.currentTime = 0; // Reset the previous audio
      }

      // Create a new audio element and play it
      const audio = new Audio(url);
      audioRef.current = audio;

      audio
        .play()
        .then(() => {
          console.log(`Playing audio: ${url}`);
          setPlaying(id);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });

      audio.onended = () => {
        setPlaying(null);
      };
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="text-foreground min-w-screen w-screen min-h-screen flex justify-start flex-col gap-2 p-[7em] bg-gray-100">
      <span className="font-semibold text-4xl">All Data</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Play</TableHead>
            <TableHead>Keywords</TableHead>
            <TableHead>Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audioFiles.map((file, index) => (
            <TableRow key={index}>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => togglePlay(file._id, file.url)}
                >
                  {playing === file._id ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {file.keywords.map((keyword, index) => (
                  <Badge key={index} className="mr-1 rounded-full">
                    {keyword}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{file.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
