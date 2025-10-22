# ShortsMaker - Video Editing Platform

A modern web-based video editing platform built with Next.js, designed for creating TikTok and YouTube Shorts with features like auto-captions and sound effects.

## Features

- **Video Upload & Preview**: Drag-and-drop interface for easy video uploads
- **Interactive Timeline**: Visual timeline showing captions and sound effects
- **Auto Captions**: AI-powered caption generation (Whisper AI ready)
- **Manual Caption Editor**: Add, edit, and style captions with custom timing
- **Sound Effects**: Add preset or custom sound effects to your videos
- **Video Export**: Export processed videos optimized for social media

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Video Processing**: FFmpeg (server-side)
- **UI Components**: Custom components with Lucide icons

## Prerequisites

Before running this project, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- FFmpeg installed on your system

### Installing FFmpeg

**macOS (using Homebrew):**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH

Verify installation:
```bash
ffmpeg -version
```

## Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Run the development server**
```bash
npm run dev
```

3. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
shortsmaker/
├── app/
│   ├── api/
│   │   └── export/          # Video export API endpoint
│   │       └── route.ts
│   ├── page.tsx             # Main editor page
│   └── layout.tsx
├── components/
│   ├── editor/              # Editor components
│   │   ├── VideoUpload.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── Timeline.tsx
│   │   ├── CaptionPanel.tsx
│   │   ├── SoundEffectsPanel.tsx
│   │   └── ExportPanel.tsx
│   └── ui/                  # Reusable UI components
│       └── Button.tsx
├── lib/
│   ├── store/               # State management
│   │   └── videoStore.ts
│   └── utils/               # Utility functions
│       └── cn.ts
└── public/
    └── sounds/              # Preset sound effects (add your own)
```

## Usage

### 1. Upload a Video
- Drag and drop a video file (MP4, MOV, AVI, WebM) or click to browse
- The video will appear in the player

### 2. Add Captions
- Type caption text in the input field
- Click the + button to add at current time
- Edit timing, position, size, and colors
- Use "Auto Generate" for AI-powered captions (requires Whisper AI setup)

### 3. Add Sound Effects
- Choose from preset sounds or upload custom audio
- Adjust timing and volume
- Sound effects appear on the timeline

### 4. Export Video
- Review your edits on the timeline
- Click "Export Video" to process
- Download the final video optimized for social media

## Customization

### Adding Preset Sound Effects

1. Add audio files to `public/sounds/`
2. Update the preset list in `components/editor/SoundEffectsPanel.tsx`:

```typescript
const PRESET_SOUNDS = [
  { name: 'Whoosh', file: 'whoosh.mp3' },
  { name: 'Pop', file: 'pop.mp3' },
  // Add more...
];
```

### Caption Styling

Captions support:
- Font size adjustment
- Text and background colors
- Position (top, center, bottom)
- Custom timing (start/end)

## Future Enhancements

- [ ] Whisper AI integration for auto-caption generation
- [ ] More video filters and effects
- [ ] Trim and cut video clips
- [ ] Multiple video layers
- [ ] Music library integration
- [ ] Video templates
- [ ] Batch processing
- [ ] Cloud storage integration

## Development

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## API Routes

### POST `/api/export`

Processes video with captions and sound effects.

**Request Body (FormData):**
- `video`: Video file
- `captions`: JSON string of caption array
- `soundEffects`: JSON string of sound effects array
- `soundEffect_X`: Individual sound effect files

**Response:**
- Processed video file (MP4)

## Troubleshooting

### FFmpeg not found
- Ensure FFmpeg is installed and in your system PATH
- Restart your terminal after installation

### Video export fails
- Check FFmpeg installation: `ffmpeg -version`
- Check browser console for errors
- Verify temp directory has write permissions

### Captions not appearing
- Verify caption timing (start < end)
- Check that time is within video duration
- Ensure text is not empty

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Tips

- Keep videos under 100MB for best performance
- Use MP4 format for faster processing
- Limit captions to essential text
- Compress audio files before uploading

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ for content creators
