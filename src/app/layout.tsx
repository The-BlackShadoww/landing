import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus — Operations Infrastructure for Modern Teams",
  description:
    "Nexus unifies your workflows, automations, and analytics into a single operations layer. Built for teams that move fast and scale further.",
  keywords: ["operations", "workflow automation", "team collaboration", "SaaS", "enterprise"],
  openGraph: {
    title: "Nexus — Operations Infrastructure for Modern Teams",
    description:
      "Unify your workflows, automations, and analytics into a single operations layer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#0a0a0a] text-[#f0ede8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
