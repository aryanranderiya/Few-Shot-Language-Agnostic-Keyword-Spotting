"use client";
import * as React from "react";
import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "./ui/file-upload";
import { Paperclip } from "lucide-react";
import { FileSvgDraw } from "../components/icons"


const FileUploaderComponent = ({ files, setFiles }) => {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 100,
    multiple: false,
    accept: {
      "audio/*": [".mp3", ".ogg", ".wav"],
      "video/*": [".mp4", ".mov"]
    },
  };
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2 items-center flex flex-col justify-center cursor-default gap-4"
    >
      <FileInput className="outline-dashed outline-1 outline-gray-400 max-w-[400px]">
        <div className="flex items-center justify-center flex-col p-10 w-full max-w-[400px] ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent >
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploaderComponent;
