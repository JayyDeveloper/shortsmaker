'use client';

import { useState } from 'react';
import { useVideoStore, Caption } from '@/lib/store/videoStore';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Wand2 } from 'lucide-react';

export function CaptionPanel() {
  const { captions, currentTime, addCaption, removeCaption, updateCaption } = useVideoStore();
  const [newCaptionText, setNewCaptionText] = useState('');

  const handleAddCaption = () => {
    if (!newCaptionText.trim()) return;

    const newCaption: Caption = {
      id: Date.now().toString(),
      text: newCaptionText,
      startTime: currentTime,
      endTime: currentTime + 3,
      style: {
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: '#000000',
        position: 'bottom',
      },
    };

    addCaption(newCaption);
    setNewCaptionText('');
  };

  const handleGenerateAutoCaptions = async () => {
    alert('Auto-caption generation will be implemented with Whisper AI integration');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Captions</h3>
        <Button
          onClick={handleGenerateAutoCaptions}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Auto Generate
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCaptionText}
            onChange={(e) => setNewCaptionText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCaption()}
            placeholder="Enter caption text..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleAddCaption} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Caption will start at current time: {currentTime.toFixed(2)}s
        </p>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {captions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No captions added yet
          </p>
        ) : (
          captions.map((caption) => (
            <div
              key={caption.id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <textarea
                  value={caption.text}
                  onChange={(e) =>
                    updateCaption(caption.id, { text: e.target.value })
                  }
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
                <Button
                  onClick={() => removeCaption(caption.id)}
                  size="sm"
                  variant="danger"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">Start (s)</label>
                  <input
                    type="number"
                    value={caption.startTime.toFixed(2)}
                    onChange={(e) =>
                      updateCaption(caption.id, {
                        startTime: parseFloat(e.target.value),
                      })
                    }
                    step="0.1"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">End (s)</label>
                  <input
                    type="number"
                    value={caption.endTime.toFixed(2)}
                    onChange={(e) =>
                      updateCaption(caption.id, {
                        endTime: parseFloat(e.target.value),
                      })
                    }
                    step="0.1"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-600">Position</label>
                  <select
                    value={caption.style.position}
                    onChange={(e) =>
                      updateCaption(caption.id, {
                        style: {
                          ...caption.style,
                          position: e.target.value as 'top' | 'center' | 'bottom',
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Font Size</label>
                  <input
                    type="number"
                    value={caption.style.fontSize}
                    onChange={(e) =>
                      updateCaption(caption.id, {
                        style: {
                          ...caption.style,
                          fontSize: parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Text Color</label>
                  <input
                    type="color"
                    value={caption.style.color}
                    onChange={(e) =>
                      updateCaption(caption.id, {
                        style: { ...caption.style, color: e.target.value },
                      })
                    }
                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
