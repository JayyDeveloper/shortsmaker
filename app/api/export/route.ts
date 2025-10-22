import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface Caption {
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

interface SoundEffect {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  volume: number;
}

export async function POST(request: NextRequest) {
  const tempDir = path.join(process.cwd(), 'temp');

  try {
    // Create temp directory if it doesn't exist
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const captionsData = formData.get('captions') as string;
    const soundEffectsData = formData.get('soundEffects') as string;

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    const captions: Caption[] = JSON.parse(captionsData || '[]');
    const soundEffects: SoundEffect[] = JSON.parse(soundEffectsData || '[]');

    // Save video file
    const videoBytes = await videoFile.arrayBuffer();
    const videoBuffer = Buffer.from(videoBytes);
    const inputVideoPath = path.join(tempDir, `input-${Date.now()}.mp4`);
    await writeFile(inputVideoPath, videoBuffer);

    // Process with FFmpeg
    const outputVideoPath = path.join(tempDir, `output-${Date.now()}.mp4`);

    // Build FFmpeg command
    let ffmpegCommand = `ffmpeg -i "${inputVideoPath}"`;

    // Add captions using drawtext filter
    if (captions.length > 0) {
      const filterComplexParts: string[] = [];

      captions.forEach((caption, index) => {
        const escapedText = caption.text.replace(/'/g, "\\'").replace(/:/g, '\\:');
        const yPosition =
          caption.style.position === 'top' ? '50' :
          caption.style.position === 'center' ? '(h-text_h)/2' :
          'h-150';

        const hexColor = caption.style.color.replace('#', '0x');
        const hexBgColor = caption.style.backgroundColor.replace('#', '0x');

        filterComplexParts.push(
          `drawtext=text='${escapedText}':` +
          `fontsize=${caption.style.fontSize}:` +
          `fontcolor=${hexColor}:` +
          `box=1:boxcolor=${hexBgColor}@0.5:boxborderw=5:` +
          `x=(w-text_w)/2:y=${yPosition}:` +
          `enable='between(t,${caption.startTime},${caption.endTime})'`
        );
      });

      if (filterComplexParts.length > 0) {
        ffmpegCommand += ` -vf "${filterComplexParts.join(',')}"`;
      }
    }

    // Add output options
    ffmpegCommand += ` -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k "${outputVideoPath}"`;

    console.log('Executing FFmpeg command:', ffmpegCommand);

    // Execute FFmpeg
    await execAsync(ffmpegCommand);

    // Read the output file
    const outputBuffer = await require('fs/promises').readFile(outputVideoPath);

    // Clean up temp files
    await unlink(inputVideoPath);
    await unlink(outputVideoPath);

    // Return the processed video
    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="edited-video.mp4"',
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to process video', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
