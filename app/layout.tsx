import type { Metadata } from "next";

import "./globals.css";

import { Cormorant_Garamond, DM_Serif_Display, IBM_Plex_Mono, Manrope } from "next/font/google";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});
const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const italic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-italic",
});

export const metadata: Metadata = {
  title: "Yomna Alshemy — Archive",
  description:
    "FinCrime analyst and full-stack engineer. Six real, running systems, catalogued as an archive of what was actually built.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable} ${italic.variable}`}>
      <head>
        <link rel="icon" href="/girl-icon.png" sizes="any" />
      </head>
      <body className="bg-obsidian font-sans">{children}</body>
    </html>
  );
}