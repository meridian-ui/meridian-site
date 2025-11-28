import type { Metadata } from 'next';

import { Hanken_Grotesk } from 'next/font/google';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

import './globals.css';

export const metadata: Metadata = {
  title: 'Meridian',
  description: 'Make any overview-detail interface malleable.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
