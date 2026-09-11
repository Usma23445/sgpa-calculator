import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://sgpacalculator.vercel.app";
const SITE_TITLE = "SGPA Calculator — Free All-in-One SGPA, CGPA & Percentage Calculator";
const SITE_DESCRIPTION =
  "Free SGPA calculator for students. Calculate Semester GPA instantly, convert SGPA to CGPA and percentage with official university formulas (SPPU, VTU, AKTU, GTU, CBSE), check the 10-point grading scale, and compute grades from marks — all in one fast, private, mobile-friendly tool.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | SGPACalculator",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SGPA calculator",
    "SGPA to percentage",
    "CGPA calculator",
    "GPA calculator 4.0 scale",
    "semester grade point average",
    "SGPA formula",
    "grade calculator",
    "marks to grade point",
    "10 point grading system",
    "CGPA to percentage",
    "SPPU SGPA calculator",
    "VTU CGPA calculator",
    "AKTU percentage calculator",
    "engineering SGPA calculator",
    "college GPA calculator",
  ],
  authors: [{ name: "SGPACalculator Team" }],
  creator: "SGPACalculator",
  applicationName: "SGPACalculator",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "SGPACalculator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
