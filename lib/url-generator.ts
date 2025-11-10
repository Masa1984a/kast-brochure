import { ReferralURLConfig } from '@/types';

/**
 * Generate referral URL
 * @param referralCode Referral code
 * @returns Referral URL configuration object
 */
export function generateReferralURL(referralCode: string): ReferralURLConfig {
  const baseURL = process.env.NEXT_PUBLIC_BASE_REFERRAL_URL || 'https://go.kast.xyz/VqVO/';
  const generatedURL = `${baseURL}${referralCode}`;

  return {
    baseURL,
    referralCode,
    generatedURL,
  };
}

/**
 * Get referral URL only
 * @param referralCode Referral code
 * @returns Complete referral URL
 */
export function getReferralURL(referralCode: string): string {
  const baseURL = process.env.NEXT_PUBLIC_BASE_REFERRAL_URL || 'https://go.kast.xyz/VqVO/';
  return `${baseURL}${referralCode}`;
}
