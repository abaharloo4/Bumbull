import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bumbul — Find Your Match in Iran",
  description: "Iran's first pixel-art dating and social web application.",
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

