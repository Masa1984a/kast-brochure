import { generateQRCodeImage } from './qr-generator';
import { getReferralURL } from './url-generator';

/**
 * Generate brochure image
 * @param baseImageUrl Base image URL
 * @param referralCode Referral code
 * @returns Canvas element
 */
export async function generateBrochure(
  baseImageUrl: string,
  referralCode: string
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get Canvas context');
  }

  // Load base image
  const baseImage = await loadImage(baseImageUrl);
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;

  // Draw base image
  ctx.drawImage(baseImage, 0, 0);

  // Generate referral URL
  const referralURL = getReferralURL(referralCode);

  // Draw URL text (bottom right of image)
  ctx.font = '30px Meiryo, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';

  // Add shadow to text for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Place URL text at bottom right
  ctx.fillText(referralURL, 1155, 1050);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Generate and draw QR code
  try {
    const qrImage = await generateQRCodeImage(referralURL);
    // Draw QR code at bottom right
    ctx.drawImage(qrImage, 1680, 798, 200, 200);
  } catch (error) {
    console.error('QR code drawing error:', error);
    throw error;
  }

  return canvas;
}

/**
 * Load image
 * @param src Image source URL
 * @returns Promise<HTMLImageElement>
 */
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // CORS support
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Download image from Canvas
 * @param canvas Canvas element
 * @param referralCode Referral code (used for filename)
 */
export async function downloadBrochure(
  canvas: HTMLCanvasElement,
  referralCode: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `KAST_Brochure_${referralCode}.png`;
        link.click();

        // Release memory
        setTimeout(() => {
          URL.revokeObjectURL(url);
          resolve();
        }, 100);
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Get image as Blob from Canvas
 * @param canvas Canvas element
 * @returns Promise<Blob>
 */
export async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image'));
          return;
        }
        resolve(blob);
      },
      'image/png',
      1.0
    );
  });
}
