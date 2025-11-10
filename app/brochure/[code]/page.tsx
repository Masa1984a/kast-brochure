'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BrochureCanvas from '@/components/BrochureCanvas';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import { validateReferralCode } from '@/lib/validators';

export default function BrochurePage() {
  const params = useParams();
  const router = useRouter();
  const referralCode = (params.code as string)?.toUpperCase();

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  // バリデーション
  const validation = validateReferralCode(referralCode || '');

  const handleCanvasReady = useCallback((canvasElement: HTMLCanvasElement) => {
    setCanvas(canvasElement);
  }, []);

  if (!validation.isValid) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-2">
              Invalid Referral Code
            </h2>
            <p className="text-red-600 mb-6">{validation.error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <div className="text-sm text-gray-500">
            Referral Code: <span className="font-semibold text-gray-900">{referralCode}</span>
          </div>
        </div>

        {/* タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Your KAST Card Brochure
          </h1>
          <p className="text-gray-600">
            Download the image or share it on social media
          </p>
        </div>

        {/* ブローシャーCanvas */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-6">
          <BrochureCanvas referralCode={referralCode} onCanvasReady={handleCanvasReady} />
        </div>

        {/* アクションボタン */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:flex-1">
              <DownloadButton canvas={canvas} referralCode={referralCode} />
            </div>
          </div>

          <ShareButton referralCode={referralCode} />
        </div>

        {/* 情報セクション */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Share your referral link
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            Share this brochure with friends and family to earn rewards when they sign up!
          </p>
          <div className="bg-white rounded border border-blue-300 px-4 py-2">
            <code className="text-sm text-blue-800 break-all">
              {`https://go.kast.xyz/VqVO/${referralCode}`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
