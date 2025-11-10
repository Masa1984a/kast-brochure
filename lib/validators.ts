import { ValidationResult } from '@/types';

/**
 * Extract referral code from URL if input is a URL
 * @param input Input string (code or URL)
 * @returns Extracted referral code or original input
 */
export function extractReferralCode(input: string): string {
  if (!input) return input;

  const trimmedInput = input.trim();

  // Check if input is a URL
  try {
    // Try to parse as URL
    const url = new URL(trimmedInput);

    // Check if it's a KAST referral URL
    if (url.hostname === 'go.kast.xyz' && url.pathname.startsWith('/VqVO/')) {
      // Extract code from path (e.g., /VqVO/SAPPORO -> SAPPORO)
      const code = url.pathname.replace('/VqVO/', '').split('/')[0];
      return code.toUpperCase();
    }
  } catch (e) {
    // Not a valid URL, treat as referral code
  }

  // Check if input looks like a URL without protocol
  if (trimmedInput.startsWith('go.kast.xyz/VqVO/')) {
    const code = trimmedInput.replace('go.kast.xyz/VqVO/', '').split('/')[0];
    return code.toUpperCase();
  }

  // Return original input (likely already a code)
  return trimmedInput.toUpperCase();
}

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
