import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShortsMaker - Video Editor for TikTok & YouTube Shorts",
  description: "Create amazing short videos with auto captions and sound effects. Optimized for TikTok and YouTube Shorts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
