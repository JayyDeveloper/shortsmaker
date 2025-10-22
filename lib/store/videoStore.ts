import { create } from 'zustand';

export interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  style: {
    fontSize: number;
    color: string;
    backgroundColor: string;
    position: 'top' | 'center' | 'bottom';
  };
}

export interface SoundEffect {
  id: string;
  name: string;
  file: File | null;
  startTime: number;
  duration: number;
  volume: number;
}

interface VideoState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  captions: Caption[];
  soundEffects: SoundEffect[];

  // Actions
  setVideoFile: (file: File) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  addCaption: (caption: Caption) => void;
  updateCaption: (id: string, caption: Partial<Caption>) => void;
  removeCaption: (id: string) => void;
  addSoundEffect: (effect: SoundEffect) => void;
  removeSoundEffect: (id: string) => void;
  updateSoundEffect: (id: string, effect: Partial<SoundEffect>) => void;
  setDuration: (duration: number) => void;
  reset: () => void;
}

const initialState = {
  videoFile: null,
  videoUrl: null,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  captions: [],
  soundEffects: [],
};

export const useVideoStore = create<VideoState>((set) => ({
  ...initialState,

  setVideoFile: (file) => set({
    videoFile: file,
    videoUrl: URL.createObjectURL(file)
  }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  addCaption: (caption) => set((state) => ({
    captions: [...state.captions, caption],
  })),

  updateCaption: (id, caption) => set((state) => ({
    captions: state.captions.map((c) =>
      c.id === id ? { ...c, ...caption } : c
    ),
  })),

  removeCaption: (id) => set((state) => ({
    captions: state.captions.filter((c) => c.id !== id),
  })),

  addSoundEffect: (effect) => set((state) => ({
    soundEffects: [...state.soundEffects, effect],
  })),

  removeSoundEffect: (id) => set((state) => ({
    soundEffects: state.soundEffects.filter((e) => e.id !== id),
  })),

  updateSoundEffect: (id, effect) => set((state) => ({
    soundEffects: state.soundEffects.map((e) =>
      e.id === id ? { ...e, ...effect } : e
    ),
  })),

  setDuration: (duration) => set({ duration }),

  reset: () => set(initialState),
}));
