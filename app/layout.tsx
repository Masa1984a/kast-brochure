import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KAST Card Brochure Generator',
  description: 'Generate personalized KAST Card referral brochures with your unique referral code',
  openGraph: {
    title: 'KAST Card Brochure Generator',
    description: 'Generate personalized KAST Card referral brochures',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                KAST Card Brochure Generator
              </h1>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-center text-sm text-gray-500">
                &copy; 2025 mStarJP (https://x.com/mStarJP)  All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
