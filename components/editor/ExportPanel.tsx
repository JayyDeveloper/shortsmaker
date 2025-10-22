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
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold">Export Video</h3>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Captions:</p>
            <p className="font-medium">{captions.length} added</p>
          </div>
          <div>
            <p className="text-gray-600">Sound Effects:</p>
            <p className="font-medium">{soundEffects.length} added</p>
          </div>
        </div>

        {isExporting && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-center text-gray-600">
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

      <div className="text-xs text-gray-500 space-y-1">
        <p>Export settings:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Format: MP4 (H.264)</li>
          <li>Resolution: Original</li>
          <li>Optimized for social media</li>
        </ul>
      </div>
    </div>
  );
}
