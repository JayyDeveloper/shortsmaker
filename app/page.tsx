'use client';

import { useVideoStore } from '@/lib/store/videoStore';
import { VideoUpload } from '@/components/editor/VideoUpload';
import { VideoPlayer } from '@/components/editor/VideoPlayer';
import { Timeline } from '@/components/editor/Timeline';
import { CaptionPanel } from '@/components/editor/CaptionPanel';
import { SoundEffectsPanel } from '@/components/editor/SoundEffectsPanel';
import { ExportPanel } from '@/components/editor/ExportPanel';
import { Film } from 'lucide-react';

export default function Home() {
  const videoFile = useVideoStore((state) => state.videoFile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ShortsMaker</h1>
              <p className="text-sm text-gray-600">
                Create amazing short videos with auto captions and sound effects
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!videoFile ? (
          <div className="max-w-2xl mx-auto">
            <VideoUpload />
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Get Started
              </h2>
              <p className="text-gray-600">
                Upload a video to start editing. Add captions, sound effects, and export
                your masterpiece!
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl mb-2">✍️</div>
                  <h3 className="font-semibold text-gray-800">Auto Captions</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Generate captions automatically with AI
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl mb-2">🔊</div>
                  <h3 className="font-semibold text-gray-800">Sound Effects</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Add engaging audio to your videos
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-800">Quick Export</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Optimized for TikTok & YouTube Shorts
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Video Player */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <VideoPlayer />
              </div>
            </div>

            {/* Middle Column - Timeline and Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Timeline</h2>
                <Timeline />
              </div>

              {/* Editing Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Captions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <CaptionPanel />
                </div>

                {/* Sound Effects */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <SoundEffectsPanel />
                </div>
              </div>

              {/* Export Panel */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ExportPanel />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Built for creators who want to make engaging short-form content quickly
          </p>
        </div>
      </footer>
    </div>
  );
}
