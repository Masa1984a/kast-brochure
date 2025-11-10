'use client';

import { useEffect, useRef, useState } from 'react';
import { generateBrochure } from '@/lib/canvas-utils';

interface BrochureCanvasProps {
  referralCode: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export default function BrochureCanvas({ referralCode, onCanvasReady }: BrochureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const canvas = await generateBrochure('/images/PIC_Template.png', referralCode);

        if (canvasRef.current && containerRef.current) {
          // 既存のCanvasをクリア
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            canvasRef.current.width = canvas.width;
            canvasRef.current.height = canvas.height;
            ctx.drawImage(canvas, 0, 0);

            // 親コンポーネントにCanvas要素を渡す
            if (onCanvasReady) {
              onCanvasReady(canvasRef.current);
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('ブローシャー生成エラー:', err);
        setError('ブローシャーの生成に失敗しました');
        setIsLoading(false);
      }
    };

    generateImage();
  }, [referralCode, onCanvasReady]);

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">ブローシャーを生成中...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-auto rounded-lg shadow-lg ${isLoading ? 'invisible' : 'visible'}`}
      />
    </div>
  );
}
