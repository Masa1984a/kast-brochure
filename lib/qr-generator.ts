import QRCodeStyling, { Options } from 'qr-code-styling';

/**
 * Generate QR code
 * @param url Referral URL
 * @returns QR code Data URL
 */
export async function generateQRCode(url: string): Promise<string> {
  const config: Options = {
    width: 200,
    height: 200,
    data: url,
    dotsOptions: {
      color: '#000000',
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
    },
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
  };

  const qrCode = new QRCodeStyling(config);

  try {
    const blob = await qrCode.getRawData('png');
    if (!blob) {
      throw new Error('Failed to generate QR code');
    }
    // Convert Buffer to Blob if needed
    const blobData = blob instanceof Blob ? blob : new Blob([blob as BlobPart], { type: 'image/png' });
    return URL.createObjectURL(blobData);
  } catch (error) {
    console.error('QR code generation error:', error);
    throw error;
  }
}

/**
 * Generate QR code as Image object for Canvas
 * @param url Referral URL
 * @returns HTMLImageElement
 */
export async function generateQRCodeImage(url: string): Promise<HTMLImageElement> {
  const dataURL = await generateQRCode(url);
  return loadImage(dataURL);
}

/**
 * Load image
 * @param src Image source URL
 * @returns Promise<HTMLImageElement>
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
