# KAST Card Brochure Generator

KASTカードの紹介ブローシャーを動的に生成するWebアプリケーション

## 機能

- 紹介コード入力画面
- 個別化されたブローシャー画像生成
- QRコード自動生成
- 画像ダウンロード機能
- Xシェア機能

## 技術スタック

- **Next.js 14** - App Router
- **TypeScript**
- **Tailwind CSS**
- **Canvas API** - 画像合成
- **qr-code-styling** - QRコード生成

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下を設定：

```bash
NEXT_PUBLIC_BASE_REFERRAL_URL=https://go.kast.xyz/VqVO/
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## Vercelへのデプロイ

### 方法1: GitHub連携（推奨）

1. GitHubリポジトリにコードをプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定：
   - `NEXT_PUBLIC_BASE_REFERRAL_URL`: `https://go.kast.xyz/VqVO/`
4. デプロイ

### 方法2: Vercel CLI

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel

# 本番環境へのデプロイ
vercel --prod
```

## ディレクトリ構造

```
kast-brochure/
├── app/
│   ├── page.tsx                    # ホーム画面
│   ├── brochure/
│   │   └── [code]/
│   │       └── page.tsx            # ブローシャー表示画面
│   ├── layout.tsx                  # 共通レイアウト
│   └── globals.css                 # グローバルスタイル
├── components/
│   ├── ReferralCodeInput.tsx       # 紹介コード入力フォーム
│   ├── BrochureCanvas.tsx          # Canvas描画コンポーネント
│   ├── DownloadButton.tsx          # ダウンロードボタン
│   └── ShareButton.tsx             # シェアボタン
├── lib/
│   ├── validators.ts               # バリデーション関数
│   ├── url-generator.ts            # URL生成ロジック
│   ├── qr-generator.ts             # QRコード生成
│   └── canvas-utils.ts             # Canvas操作ユーティリティ
├── types/
│   └── index.ts                    # TypeScript型定義
└── public/
    └── images/
        ├── PIC_Template.png        # ベースブローシャー画像
        └── PIC_Sample.png          # サンプル画像
```

## 使い方

1. ホーム画面で紹介コード（6-8文字の英数字）を入力
2. "Brochure Create"ボタンをクリック
3. 生成されたブローシャーをダウンロードまたはシェア

## バリデーションルール

- **形式**: 英数字（A-Z, a-z, 0-9）
- **文字数**: 6-8文字
- **必須**: Yes

## ライセンス

© 2025 KAST Card. All rights reserved.
