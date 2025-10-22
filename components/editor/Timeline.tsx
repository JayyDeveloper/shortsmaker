'use client';

import { useRef, useState } from 'react';
import { useVideoStore } from '@/lib/store/videoStore';
import { cn } from '@/lib/utils/cn';

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { duration, currentTime, setCurrentTime, captions, soundEffects } = useVideoStore();

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    setCurrentTime(Math.max(0, Math.min(newTime, duration)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    setCurrentTime(Math.max(0, Math.min(newTime, duration)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (duration === 0) {
    return (
      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400 text-sm">Timeline will appear here</p>
      </div>
    );
  }

  const progress = (currentTime / duration) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        ref={timelineRef}
        className="relative w-full h-24 bg-gray-200 rounded-lg cursor-pointer overflow-hidden"
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* Caption tracks */}
        {captions.map((caption) => {
          const left = (caption.startTime / duration) * 100;
          const width = ((caption.endTime - caption.startTime) / duration) * 100;

          return (
            <div
              key={caption.id}
              className="absolute top-2 h-6 bg-blue-400 rounded opacity-70 hover:opacity-100 transition-opacity"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={caption.text}
            >
              <div className="px-1 text-xs text-white truncate">
                {caption.text}
              </div>
            </div>
          );
        })}

        {/* Sound effect tracks */}
        {soundEffects.map((effect) => {
          const left = (effect.startTime / duration) * 100;
          const width = (effect.duration / duration) * 100;

          return (
            <div
              key={effect.id}
              className="absolute top-10 h-6 bg-green-400 rounded opacity-70 hover:opacity-100 transition-opacity"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={effect.name}
            >
              <div className="px-1 text-xs text-white truncate">
                {effect.name}
              </div>
            </div>
          );
        })}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
          style={{ left: `${progress}%` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
        </div>
      </div>

      <div className="flex gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded" />
          <span>Captions</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded" />
          <span>Sound Effects</span>
        </div>
      </div>
    </div>
  );
}
