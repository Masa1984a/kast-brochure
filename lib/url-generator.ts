import { ReferralURLConfig } from '@/types';

/**
 * リファラルURLを生成
 * @param referralCode 紹介コード
 * @returns リファラルURL設定オブジェクト
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
 * リファラルURLのみを取得
 * @param referralCode 紹介コード
 * @returns 完全なリファラルURL
 */
export function getReferralURL(referralCode: string): string {
  const baseURL = process.env.NEXT_PUBLIC_BASE_REFERRAL_URL || 'https://go.kast.xyz/VqVO/';
  return `${baseURL}${referralCode}`;
}
