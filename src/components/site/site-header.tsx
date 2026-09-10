"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Mail } from "lucide-react";

const NAV_LINKS = [
  { href: "#calculators", label: "Calculators" },
  { href: "#guide", label: "Guides" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-bold text-lg text-emerald-700"
          aria-label="SGPA Calculator home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            SGPA<span className="text-foreground">Calculator</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-sm">
          <a href="#contact" className="gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Get in Touch</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </Button>
      </div>

      {/* Mobile nav */}
      <nav aria-label="Mobile navigation" className="md:hidden border-t bg-background/95">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-2 py-2 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap rounded-lg px-3 py-1.5 font-medium text-muted-foreground hover:text-emerald-700 hover:bg-emerald-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
