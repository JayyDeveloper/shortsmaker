'use client';

import { useState } from 'react';
import { useVideoStore } from '@/lib/store/videoStore';
import { Button } from '@/components/ui/Button';
import { Download, Loader2 } from 'lucide-react';

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { videoFile, captions, soundEffects } = useVideoStore();

  const handleExport = async () => {
    if (!videoFile) {
      alert('Please upload a video first');
      return;
    }

    setIsExporting(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('captions', JSON.stringify(captions));
      formData.append('soundEffects', JSON.stringify(soundEffects));

      soundEffects.forEach((effect, index) => {
        if (effect.file) {
          formData.append(`soundEffect_${index}`, effect.file);
        }
      });

      const response = await fetch('/api/export', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-video-${Date.now()}.mp4`;
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      alert('Video exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export video. Make sure FFmpeg is set up correctly.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Export Video</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-1">Captions</p>
            <p className="text-2xl font-semibold text-gray-900">{captions.length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-1">Sound Effects</p>
            <p className="text-2xl font-semibold text-gray-900">{soundEffects.length}</p>
          </div>
        </div>

        {isExporting && (
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-center font-medium text-gray-700">
              Exporting... {progress}%
            </p>
          </div>
        )}

        <Button
          onClick={handleExport}
          disabled={isExporting || !videoFile}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Export Video
            </>
          )}
        </Button>
      </div>

      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-2">Export Settings</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Format: MP4 (H.264)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Resolution: Original
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Optimized for social media
          </li>
        </ul>
      </div>
    </div>
  );
}
