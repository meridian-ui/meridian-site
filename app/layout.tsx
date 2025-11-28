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
  description: 'Malleable user interfaces for the real world.',
  metadataBase: new URL('https://www.meridian-ui.com'),

  // Open Graph - used by Facebook, LinkedIn, Discord, Slack, iMessage, etc.
  openGraph: {
    title: 'Meridian',
    description: 'Malleable user interfaces for the real world.',
    url: 'https://www.meridian-ui.com',
    siteName: 'Meridian',
    locale: 'en_US',
    type: 'website',
    // Images are auto-generated from opengraph-image.tsx
  },

  // Twitter Card - used by Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'Meridian',
    description: 'Malleable user interfaces for the real world.',
    // Images are auto-generated from twitter-image.tsx
  },
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
