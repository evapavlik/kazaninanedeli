"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks: { href: string; label: string; badge?: string }[] = [
  { href: "/pruvodce/priprava", label: "Průvodce" },
  { href: "/kazani", label: "Kázání" },
  { href: "/metodika", label: "Metodika" },
  { href: "/slovnik", label: "Slovník" },
  { href: "/zdroje", label: "Zdroje" },
  { href: "/o-projektu", label: "O projektu", badge: "zkušební provoz" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] border-b border-border bg-white/93 backdrop-blur-[12px]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="font-lora text-[15px] font-semibold text-brick no-underline"
        >
          {`K\u00E1z\u00E1n\u00ED na ned\u011Bli`}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center text-[13px] font-medium text-text-muted no-underline leading-tight transition-colors duration-200 hover:text-brick"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="mt-0.5 text-[9px] font-normal uppercase tracking-[0.12em] text-text-light/70 group-hover:text-brick/70">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-cream md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-border bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium text-text-muted no-underline transition-colors hover:bg-cream hover:text-brick"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-normal uppercase tracking-[0.12em] text-text-light/70">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
