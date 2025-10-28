"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/programmes", label: "Programmes" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/process", label: "Étapes" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight 
                     bg-gradient-to-r from-[#0FB5AE] to-cyan-500 
                     bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Exatlantik
        </Link>

        {/* Bouton burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900"
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#0FB5AE]"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 transition ${
                  pathname === l.href
                    ? "text-[#0FB5AE]"
                    : "text-slate-700 hover:text-[#0FB5AE]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
