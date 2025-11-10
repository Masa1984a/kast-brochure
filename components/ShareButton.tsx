'use client';

import { useState } from 'react';
import { getReferralURL } from '@/lib/url-generator';

interface ShareButtonProps {
  referralCode: string;
}

export default function ShareButton({ referralCode }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const referralURL = getReferralURL(referralCode);

  const handleShare = async () => {
    const shareText = `Join KAST with my referral code: ${referralCode}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(referralURL)}`;

    // 新しいウィンドウでXを開く
    window.open(twitterURL, '_blank', 'width=550,height=420');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('コピーエラー:', error);
      alert('URLのコピーに失敗しました');
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Xにポストする
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isCopied ? (
          <>
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy URL
          </>
        )}
      </button>
    </div>
  );
}
