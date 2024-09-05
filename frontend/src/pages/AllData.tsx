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
  id: string;
  name: string;
  url: string;
  keywords: string[];
}

export default function AudioTable() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    //     const fetchAudioFiles = async () => {
    //       try {
    //         // Replace '/api/audio-files' with your actual API endpoint
    //         const response = await fetch("/api/audio-files");
    //         if (!response.ok) {
    //           throw new Error("Failed to fetch audio files");
    //         }
    //         const data = await response.json();
    //         setAudioFiles(data);
    //         setIsLoading(false);
    //       } catch (err) {
    //         setError("Error fetching audio files. Please try again later.");
    //         setIsLoading(false);
    //       }
    //     };

    //     fetchAudioFiles();
    setAudioFiles([
      {
        id: "1",
        name: "Audio File 1",
        url: "/audio/file1.mp3",
        keywords: ["music", "rock", "guitar"],
      },
      {
        id: "2",
        name: "Audio File 2",
        url: "/audio/file2.mp3",
        keywords: ["podcast", "technology", "AI"],
      },
    ]);
    setIsLoading(false);
  }, []);

  const togglePlay = (id: string, url: string) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
      // In a real implementation, you would play the audio file here
      console.log(`Playing audio: ${url}`);
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
            <TableHead>Name</TableHead>
            <TableHead>Keywords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audioFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => togglePlay(file.id, file.url)}
                >
                  {playing === file.id ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                {file.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {keyword}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
