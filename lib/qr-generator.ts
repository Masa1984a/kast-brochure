import QRCodeStyling, { Options } from 'qr-code-styling';

/**
 * QRコードを生成
 * @param url リファラルURL
 * @returns QRコードのData URL
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
      throw new Error('QRコードの生成に失敗しました');
    }
    // Bufferの場合はBlobに変換
    const blobData = blob instanceof Blob ? blob : new Blob([blob as BlobPart], { type: 'image/png' });
    return URL.createObjectURL(blobData);
  } catch (error) {
    console.error('QRコード生成エラー:', error);
    throw error;
  }
}

/**
 * QRコードをCanvas用のImageオブジェクトとして生成
 * @param url リファラルURL
 * @returns HTMLImageElement
 */
export async function generateQRCodeImage(url: string): Promise<HTMLImageElement> {
  const dataURL = await generateQRCode(url);
  return loadImage(dataURL);
}

/**
 * 画像を読み込む
 * @param src 画像のソースURL
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
