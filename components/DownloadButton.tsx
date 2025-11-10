'use client';

import { useState } from 'react';
import { downloadBrochure } from '@/lib/canvas-utils';

interface DownloadButtonProps {
  canvas: HTMLCanvasElement | null;
  referralCode: string;
}

export default function DownloadButton({ canvas, referralCode }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!canvas) {
      alert('Image not generated');
      return;
    }

    try {
      setIsDownloading(true);
      await downloadBrochure(canvas, referralCode);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!canvas || isDownloading}
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      {isDownloading ? 'Downloading...' : 'Download'}
    </button>
  );
}
