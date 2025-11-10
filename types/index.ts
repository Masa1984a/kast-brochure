// バリデーション結果の型
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// バリデーションルールの型
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

// 紹介コード入力の型
export interface ReferralInput {
  referralCode: string;
  timestamp?: Date;
}

// リファラルURL設定の型
export interface ReferralURLConfig {
  baseURL: string;
  referralCode: string;
  generatedURL: string;
}

// QRコード設定の型
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

// Canvas オーバーレイの型
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

// ブローシャー出力の型
export interface BrochureOutput {
  imageBlob: Blob;
  referralURL: string;
  qrCodeDataURL: string;
  generatedAt: Date;
}

// シェアデータの型
export interface ShareData {
  title: string;
  text: string;
  url: string;
}
