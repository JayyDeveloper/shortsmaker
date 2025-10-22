'use client';

import { useRef } from 'react';
import { useVideoStore, SoundEffect } from '@/lib/store/videoStore';
import { Button } from '@/components/ui/Button';
import { Upload, Trash2, Volume2 } from 'lucide-react';

const PRESET_SOUNDS = [
  { name: 'Whoosh', file: 'whoosh.mp3' },
  { name: 'Pop', file: 'pop.mp3' },
  { name: 'Click', file: 'click.mp3' },
  { name: 'Ding', file: 'ding.mp3' },
];

export function SoundEffectsPanel() {
  const { soundEffects, currentTime, addSoundEffect, removeSoundEffect, updateSoundEffect } =
    useVideoStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const audio = new Audio();
    audio.src = URL.createObjectURL(file);

    audio.addEventListener('loadedmetadata', () => {
      const newEffect: SoundEffect = {
        id: Date.now().toString(),
        name: file.name,
        file: file,
        startTime: currentTime,
        duration: audio.duration,
        volume: 1,
      };

      addSoundEffect(newEffect);
    });
  };

  const handlePresetSound = (presetName: string) => {
    const newEffect: SoundEffect = {
      id: Date.now().toString(),
      name: presetName,
      file: null,
      startTime: currentTime,
      duration: 1,
      volume: 1,
    };

    addSoundEffect(newEffect);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sound Effects</h3>
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Audio
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">Preset Sounds</p>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_SOUNDS.map((preset) => (
            <Button
              key={preset.name}
              onClick={() => handlePresetSound(preset.name)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 justify-start"
            >
              <Volume2 className="w-4 h-4" />
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {soundEffects.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-8">
            No sound effects added yet
          </p>
        ) : (
          soundEffects.map((effect) => (
            <div
              key={effect.id}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-900">{effect.name}</span>
                </div>
                <Button
                  onClick={() => removeSoundEffect(effect.id)}
                  size="sm"
                  variant="danger"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Start (s)</label>
                  <input
                    type="number"
                    value={effect.startTime.toFixed(2)}
                    onChange={(e) =>
                      updateSoundEffect(effect.id, {
                        startTime: parseFloat(e.target.value),
                      })
                    }
                    step="0.1"
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Duration (s)</label>
                  <input
                    type="number"
                    value={effect.duration.toFixed(2)}
                    onChange={(e) =>
                      updateSoundEffect(effect.id, {
                        duration: parseFloat(e.target.value),
                      })
                    }
                    step="0.1"
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={effect.volume}
                    onChange={(e) =>
                      updateSoundEffect(effect.id, {
                        volume: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1.5"
                  />
                  <p className="text-xs text-center text-gray-700 mt-1">
                    {Math.round(effect.volume * 100)}%
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
