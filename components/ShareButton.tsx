'use client';

import { getReferralURL } from '@/lib/url-generator';

interface ShareButtonProps {
  referralCode: string;
}

export default function ShareButton({ referralCode }: ShareButtonProps) {
  const referralURL = getReferralURL(referralCode);

  const handleShare = async () => {
    const shareText = `Join KAST with my referral code: ${referralCode}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(referralURL)}`;

    // 新しいウィンドウでXを開く
    window.open(twitterURL, '_blank', 'width=550,height=420');
  };

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Xにポストする
    </button>
  );
}
