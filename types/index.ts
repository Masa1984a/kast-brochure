// Validation result type
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validation rules type
export interface ValidationRules {
  minLength: 6;
  maxLength: 8;
  pattern: RegExp;
  errorMessages: {
    empty: string;
    invalidFormat: string;
    invalidLength: string;
  };
}

// Referral code input type
export interface ReferralInput {
  referralCode: string;
  timestamp?: Date;
}

// Referral URL configuration type
export interface ReferralURLConfig {
  baseURL: string;
  referralCode: string;
  generatedURL: string;
}

// QR code configuration type
export interface QRCodeConfig {
  width: number;
  height: number;
  data: string;
  dotsOptions: {
    color: string;
    type: string;
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions: {
    type: string;
  };
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

// Canvas overlay type
export interface CanvasOverlay {
  urlText: {
    position: { x: number; y: number };
    fontSize: string;
    fontFamily: string;
    color: string;
    text: string;
  };
  qrCode: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    image: HTMLImageElement | string;
  };
}

// Brochure output type
export interface BrochureOutput {
  imageBlob: Blob;
  referralURL: string;
  qrCodeDataURL: string;
  generatedAt: Date;
}

// Share data type
export interface ShareData {
  title: string;
  text: string;
  url: string;
}
