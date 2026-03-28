import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/components/TimerContext";
import CookingTimer from "@/components/CookingTimer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TasteBud — See Flavor. Balance Taste. Create Magic.",
  description:
    "A gamified culinary education platform that makes flavor theory visible, interactive, and playful. Transform cooking from recipe-following into intuitive creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TimerProvider>
          {children}
          <CookingTimer />
        </TimerProvider>
      </body>
    </html>
  );
}
