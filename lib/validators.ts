import { ValidationResult } from '@/types';

/**
 * 紹介コードのバリデーション
 * @param code 紹介コード
 * @returns バリデーション結果
 */
export function validateReferralCode(code: string): ValidationResult {
  // 空チェック
  if (!code || code.trim() === '') {
    return { isValid: false, error: '紹介コードを入力してください' };
  }

  // 長さチェック
  if (code.length < 6 || code.length > 8) {
    return { isValid: false, error: '6-8文字で入力してください' };
  }

  // 形式チェック（英数字のみ）
  if (!/^[A-Za-z0-9]+$/.test(code)) {
    return { isValid: false, error: '英数字のみ使用できます' };
  }

  return { isValid: true };
}

/**
 * リアルタイムバリデーション用（入力中のエラー表示用）
 * @param code 紹介コード
 * @returns バリデーション結果（より詳細なエラーメッセージ）
 */
export function validateReferralCodeRealtime(code: string): ValidationResult {
  if (!code || code.trim() === '') {
    return { isValid: false, error: '' }; // 空の場合はエラーを表示しない
  }

  if (!/^[A-Za-z0-9]*$/.test(code)) {
    return { isValid: false, error: '英数字のみ使用できます' };
  }

  if (code.length < 6) {
    return { isValid: false, error: `あと${6 - code.length}文字必要です` };
  }

  if (code.length > 8) {
    return { isValid: false, error: '8文字以内で入力してください' };
  }

  return { isValid: true };
}
