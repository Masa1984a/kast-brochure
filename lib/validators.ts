import { ValidationResult } from '@/types';

/**
 * Validate referral code
 * @param code Referral code
 * @returns Validation result
 */
export function validateReferralCode(code: string): ValidationResult {
  // Empty check
  if (!code || code.trim() === '') {
    return { isValid: false, error: 'Please enter a referral code' };
  }

  // Length check
  if (code.length < 6 || code.length > 8) {
    return { isValid: false, error: 'Please enter 6-8 characters' };
  }

  // Format check (alphanumeric only)
  if (!/^[A-Za-z0-9]+$/.test(code)) {
    return { isValid: false, error: 'Only alphanumeric characters allowed' };
  }

  return { isValid: true };
}

/**
 * Real-time validation (for displaying errors during input)
 * @param code Referral code
 * @returns Validation result with detailed error messages
 */
export function validateReferralCodeRealtime(code: string): ValidationResult {
  if (!code || code.trim() === '') {
    return { isValid: false, error: '' }; // Don't show error when empty
  }

  if (!/^[A-Za-z0-9]*$/.test(code)) {
    return { isValid: false, error: 'Only alphanumeric characters allowed' };
  }

  if (code.length < 6) {
    return { isValid: false, error: `${6 - code.length} more character${6 - code.length > 1 ? 's' : ''} needed` };
  }

  if (code.length > 8) {
    return { isValid: false, error: 'Maximum 8 characters' };
  }

  return { isValid: true };
}
