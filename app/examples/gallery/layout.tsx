import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@meridian-ui/meridian/dist/meridian.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gallery | Meridian",
  description: "Meridian examples gallery",
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{
        background: "#ffffff",
        color: "#171717",
        fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
