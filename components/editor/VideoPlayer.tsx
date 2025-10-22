'use client';

import { useRef, useEffect } from 'react';
import { useVideoStore } from '@/lib/store/videoStore';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    videoUrl,
    currentTime,
    isPlaying,
    captions,
    setCurrentTime,
    setIsPlaying,
    setDuration,
  } = useVideoStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [setCurrentTime, setDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - currentTime) > 0.1) {
      video.currentTime = currentTime;
    }
  }, [currentTime]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const activeCaption = captions.find(
    (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime
  );

  if (!videoUrl) {
    return (
      <div className="w-full aspect-[9/16] bg-gray-900 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No video loaded</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[9/16] bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
      />

      {activeCaption && (
        <div
          className={`absolute left-0 right-0 px-4 text-center ${
            activeCaption.style.position === 'top'
              ? 'top-8'
              : activeCaption.style.position === 'center'
              ? 'top-1/2 -translate-y-1/2'
              : 'bottom-20'
          }`}
        >
          <p
            style={{
              fontSize: `${activeCaption.style.fontSize}px`,
              color: activeCaption.style.color,
              backgroundColor: activeCaption.style.backgroundColor,
            }}
            className="inline-block px-2 py-1 rounded font-bold"
          >
            {activeCaption.text}
          </p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={togglePlayPause}
          variant="secondary"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
