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
      <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-600 text-sm">Timeline will appear here</p>
      </div>
    );
  }

  const progress = (currentTime / duration) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between text-sm font-medium text-gray-900">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        ref={timelineRef}
        className="relative w-full h-28 bg-gray-100 rounded-xl cursor-pointer overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
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
              className="absolute top-3 h-7 bg-blue-500 rounded-lg opacity-80 hover:opacity-100 transition-all shadow-sm"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={caption.text}
            >
              <div className="px-2 text-xs text-white font-medium truncate leading-7">
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
              className="absolute top-12 h-7 bg-green-500 rounded-lg opacity-80 hover:opacity-100 transition-all shadow-sm"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={effect.name}
            >
              <div className="px-2 text-xs text-white font-medium truncate leading-7">
                {effect.name}
              </div>
            </div>
          );
        })}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 shadow-lg"
          style={{ left: `${progress}%` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-md" />
        </div>
      </div>

      <div className="flex gap-4 text-xs font-medium text-gray-700">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span>Captions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Sound Effects</span>
        </div>
      </div>
    </div>
  );
}
