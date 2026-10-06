import type { Metadata } from "next";
import { Host_Grotesk, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plinth | The AI-native operating system for manufacturers",
  description:
    "Plinth connects inventory, production, purchasing and orders into one source of truth for make-to-order and make-to-stock manufacturers.",
  openGraph: {
    title: "Plinth | The AI-native operating system for manufacturers",
    description:
      "One source of truth across inventory, production, purchasing and orders.",
    type: "website",
  },
};

// Runs before first paint: opt into motion unless the visitor prefers less.
const motionBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
