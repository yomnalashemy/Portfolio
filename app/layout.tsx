import type { Metadata } from "next";

import "./globals.css";

import { Caveat, Cormorant_Garamond, DM_Serif_Display, IBM_Plex_Mono, Manrope } from "next/font/google";

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
const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Yomna Alshemy — Live Systems",
  description:
    "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Yomna Alshemy — Live Systems",
    description:
      "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yomna Alshemy — Live Systems",
    description:
      "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} ${italic.variable} ${script.variable}`}
    >
      <body className="bg-buttercream font-sans text-espresso">{children}</body>
    </html>
  );
}
