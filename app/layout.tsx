import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";

import "./globals.css";

import { Caveat, Cormorant_Garamond, DM_Serif_Display, IBM_Plex_Mono, Manrope } from "next/font/google";

import CustomCursor from "@/components/archive/CustomCursor";
import Nav from "@/components/archive/Nav";
import PageTransition from "@/components/archive/PageTransition";

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
  metadataBase: new URL("https://portfolio-veug.onrender.com"),
  title: "Yomna Alshemy — Live Systems",
  description:
    "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
  applicationName: "Yomna Alshemy — Live Systems",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Yomna Alshemy — Live Systems",
    description:
      "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
    siteName: "Yomna Alshemy — Live Systems",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yomna Alshemy — Live Systems",
    description:
      "FinCrime analyst and full-stack engineer. Six real, running systems, on a desk worth exploring.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      <body className="bg-buttercream font-sans text-espresso">
        <MotionConfig reducedMotion="user">
          <div className="grain" aria-hidden="true" />
          <CustomCursor />
          <Nav />
          <PageTransition>{children}</PageTransition>
        </MotionConfig>
      </body>
    </html>
  );
}
