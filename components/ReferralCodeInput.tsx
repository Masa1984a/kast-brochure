'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { validateReferralCode, validateReferralCodeRealtime } from '@/lib/validators';

export default function ReferralCodeInput() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setReferralCode(value);

    // リアルタイムバリデーション
    const validation = validateReferralCodeRealtime(value);
    setError(validation.error || '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 送信時の最終バリデーション
    const validation = validateReferralCode(referralCode);

    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // ブローシャー表示画面へ遷移
    router.push(`/brochure/${referralCode}`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="referralCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Referral Code
          </label>
          <input
            type="text"
            id="referralCode"
            name="referralCode"
            value={referralCode}
            onChange={handleChange}
            placeholder="例: SAPPORO"
            maxLength={8}
            className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            disabled={isSubmitting}
            autoComplete="off"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            6-8文字の英数字を入力してください
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!error || !referralCode}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Creating...' : 'Brochure Create'}
        </button>
      </form>
    </div>
  );
}
