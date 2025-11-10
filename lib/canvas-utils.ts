import { generateQRCodeImage } from './qr-generator';
import { getReferralURL } from './url-generator';

/**
 * ブローシャー画像を生成
 * @param baseImageUrl ベース画像のURL
 * @param referralCode 紹介コード
 * @returns Canvas要素
 */
export async function generateBrochure(
  baseImageUrl: string,
  referralCode: string
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context を取得できませんでした');
  }

  // ベース画像読み込み
  const baseImage = await loadImage(baseImageUrl);
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;

  // ベース画像描画
  ctx.drawImage(baseImage, 0, 0);

  // リファラルURL生成
  const referralURL = getReferralURL(referralCode);

  // URLテキストを描画（画像の下部右側）
  ctx.font = '30px Meiryo, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';

  // テキストに影を追加して視認性を向上
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // URLテキストを右下に配置
  ctx.fillText(referralURL, 1155, 1050);

  // 影をリセット
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // QRコード生成と描画
  try {
    const qrImage = await generateQRCodeImage(referralURL);
    // QRコードを画像右下に描画
    ctx.drawImage(qrImage, 1680, 798, 200, 200);
  } catch (error) {
    console.error('QRコード描画エラー:', error);
    throw error;
  }

  return canvas;
}

/**
 * 画像を読み込む
 * @param src 画像のソースURL
 * @returns Promise<HTMLImageElement>
 */
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // CORS対応
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`画像の読み込みに失敗しました: ${src}`));
    img.src = src;
  });
}

/**
 * Canvasから画像をダウンロード
 * @param canvas Canvas要素
 * @param referralCode 紹介コード（ファイル名に使用）
 */
export async function downloadBrochure(
  canvas: HTMLCanvasElement,
  referralCode: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('画像の生成に失敗しました'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `KAST_Brochure_${referralCode}.png`;
        link.click();

        // メモリ解放
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
 * Canvasから画像をBlobとして取得
 * @param canvas Canvas要素
 * @returns Promise<Blob>
 */
export async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('画像の生成に失敗しました'));
          return;
        }
        resolve(blob);
      },
      'image/png',
      1.0
    );
  });
}
