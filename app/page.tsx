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
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">ShortsMaker</h1>
              <p className="text-sm text-gray-700">
                Create amazing short videos with auto captions and sound effects
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!videoFile ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
                Get Started
              </h2>
              <p className="text-lg text-gray-700">
                Upload a video to start editing. Add captions, sound effects, and export your masterpiece.
              </p>
            </div>

            <VideoUpload />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">✍️</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Auto Captions</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Generate captions automatically with AI
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">🔊</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Sound Effects</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Add engaging audio to your videos
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Quick Export</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Optimized for TikTok & YouTube Shorts
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Video Player */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 sticky top-24">
                <VideoPlayer />
              </div>
            </div>

            {/* Middle Column - Timeline and Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Timeline</h2>
                <Timeline />
              </div>

              {/* Editing Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Captions */}
                <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
                  <CaptionPanel />
                </div>

                {/* Sound Effects */}
                <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
                  <SoundEffectsPanel />
                </div>
              </div>

              {/* Export Panel */}
              <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
                <ExportPanel />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-700">
          <p>
            Built for creators who want to make engaging short-form content quickly
          </p>
        </div>
      </footer>
    </div>
  );
}
