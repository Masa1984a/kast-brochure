'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { validateReferralCode, validateReferralCodeRealtime, extractReferralCode } from '@/lib/validators';

export default function ReferralCodeInput() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReferralCode(value);

    // Don't validate while typing if it looks like a URL
    if (value.includes('http') || value.includes('go.kast.xyz')) {
      setError('');
      return;
    }

    // Real-time validation for codes
    const validation = validateReferralCodeRealtime(value.toUpperCase());
    setError(validation.error || '');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const extractedCode = extractReferralCode(pastedText);

    setReferralCode(extractedCode);

    // Validate extracted code
    const validation = validateReferralCodeRealtime(extractedCode);
    setError(validation.error || '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Extract code if URL was entered
    const extractedCode = extractReferralCode(referralCode);

    // Final validation on submit
    const validation = validateReferralCode(extractedCode);

    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Navigate to brochure display screen
    router.push(`/brochure/${extractedCode}`);
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
            onPaste={handlePaste}
            placeholder="e.g., SAPPORO or https://go.kast.xyz/VqVO/SAPPORO"
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
            Enter 6-8 alphanumeric characters or paste a referral URL
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
