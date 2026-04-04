import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/components/TimerContext";
import CookingTimer from "@/components/CookingTimer";
import Nav from "@/components/Nav";

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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TimerProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border py-12 px-6 mt-auto">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <span className="font-bold text-copper">TasteBud</span>
                <span className="text-foreground/30 text-sm ml-2">
                  Brain Mastery Series
                </span>
              </div>
              <a
                href="https://humanityandai.com/brain-mastery/"
                className="text-sm text-foreground/50 hover:text-copper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                humanityandai.com
              </a>
              <p className="text-sm text-foreground/30">
                &copy; 2026 Fawkes. All rights reserved.
              </p>
            </div>
          </footer>
          <CookingTimer />
        </TimerProvider>
      </body>
    </html>
  );
}
