// src/components/layout/header.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/teachers', label: 'Nos Profs' },
  { href: '/become-a-teacher', label: 'Devenir Prof' },
  { href: '/about', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const PRIMARY = '#1A3626';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        
        {/* LOGO GRAND */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/kademya-logo-horizontal.png"
            alt="Logo Kademya"
            width={300}           // image réelle
            height={100}
            className="h-32 w-auto md:h-36"// taille d'affichage (visible)
            priority
          />
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm lg:text-base">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-semibold transition-all px-2 py-1 rounded-md',
                isActive(link.href)
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              )}
              style={{
                color: isActive(link.href) ? PRIMARY : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + MENU MOBILE */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden md:inline-flex font-semibold text-white px-5 py-2 rounded-md shadow-sm hover:shadow-md transition-all"
            style={{ backgroundColor: PRIMARY }}
          >
            <Link href="/teachers">
              <BookOpen className="w-4 h-4 mr-2" />
              Voir les profs
            </Link>
          </Button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md border border-gray-300 p-2 hover:bg-gray-100 transition-all"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-3 rounded-md font-semibold transition-all',
                  isActive(link.href)
                    ? 'bg-green-50 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
                style={{
                  color: isActive(link.href) ? PRIMARY : undefined,
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/teachers"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block px-3 py-3 rounded-md font-semibold text-white text-center transition-all"
              style={{ backgroundColor: PRIMARY }}
            >
              <BookOpen className="inline-block h-4 w-4 mr-2" />
              Voir les profs
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
