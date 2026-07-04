import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bumbull — Find Your Match in Iran | Pixel-Art Dating & Social App",
  description: "Iran's first 16-bit pixel-art dating and social application. Swipe, match, attend local retro events, and chat in real-time.",
  keywords: ["Bumbull", "dating app Iran", "pixel-art dating", "retro dating app", "Iranian dating", "dating bot telegram", "بامبل", "دوستیابی ایران"],
  openGraph: {
    title: "Bumbull — Find Your Match in Iran",
    description: "Iran's first 16-bit pixel-art dating and social application.",
    url: "https://bumbull.com",
    siteName: "Bumbull",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

