"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/flavor-map", label: "Flavor Map" },
  { href: "/recipes", label: "Recipes" },
  { href: "/learn", label: "Learn" },
  { href: "/mentors", label: "Mentors" },
  { href: "/pantry", label: "Pantry" },
  { href: "/seasonal", label: "Seasonal" },
  { href: "/planner", label: "Planner" },
  { href: "/shopping", label: "Shopping" },
];

export default function Nav({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (link: { href: string; label: string }) =>
    active === link.label || pathname === link.href;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold tracking-tight text-copper">
            TasteBud
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-foreground/70">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                isActive(link)
                  ? "text-copper font-medium"
                  : "hover:text-copper transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/progress"
            className={`hidden sm:inline-flex rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              pathname === "/progress" || pathname === "/profile"
                ? "bg-copper text-background"
                : "border border-copper/40 text-copper hover:bg-copper hover:text-background"
            }`}
          >
            My Progress
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm py-1 ${
                isActive(link)
                  ? "text-copper font-medium"
                  : "text-foreground/70 hover:text-copper transition-colors"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/progress"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 text-center rounded-full bg-copper px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-copper-light"
          >
            My Progress
          </Link>
        </div>
      )}
    </nav>
  );
}
