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
        'flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl cursor-pointer transition-all',
        isDragActive
          ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10'
          : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-gray-50/50 shadow-sm hover:shadow-md'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-5">
        {isDragActive ? (
          <>
            <div className="p-4 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <p className="text-xl text-blue-600 font-semibold">Drop your video here</p>
          </>
        ) : (
          <>
            <div className="p-4 bg-gray-100 rounded-2xl">
              <Video className="w-10 h-10 text-gray-700" />
            </div>
            <div className="text-center">
              <p className="text-xl text-gray-900 font-semibold mb-1">
                Drag & drop a video file here
              </p>
              <p className="text-sm text-gray-700">
                or click to select
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-1 px-4 py-2 bg-gray-100 rounded-full">
              Supports: MP4, MOV, AVI, WebM
            </p>
          </>
        )}
      </div>
    </div>
  );
}
