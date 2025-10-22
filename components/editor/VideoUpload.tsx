'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video } from 'lucide-react';
import { useVideoStore } from '@/lib/store/videoStore';
import { cn } from '@/lib/utils/cn';

export function VideoUpload() {
  const setVideoFile = useVideoStore((state) => state.setVideoFile);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setVideoFile(file);
    }
  }, [setVideoFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <>
            <Upload className="w-12 h-12 text-blue-500" />
            <p className="text-lg text-blue-600 font-medium">Drop your video here</p>
          </>
        ) : (
          <>
            <Video className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-lg text-gray-700 font-medium">
                Drag & drop a video file here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to select
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Supports: MP4, MOV, AVI, WebM
            </p>
          </>
        )}
      </div>
    </div>
  );
}
