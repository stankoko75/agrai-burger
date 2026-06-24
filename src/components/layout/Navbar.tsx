'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { AgraiBurgerLogo } from '@/components/ui/Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <AgraiBurgerLogo size={36} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/menu', label: 'Menu' },
              { href: '#zone', label: 'Zone de livraison' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white font-semibold text-sm transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#F97316' }} />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#222] border border-white/10 rounded-xl px-3 py-2 transition-all duration-200 active:scale-95"
            >
              <ShoppingBag size={20} className="text-white" />
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-orange"
                  style={{ backgroundColor: '#F97316' }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Commander CTA desktop */}
            <Link
              href="/menu"
              className="hidden md:flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95"
              style={{ backgroundColor: '#F97316', color: 'white' }}
            >
              Commander
            </Link>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-md flex flex-col pt-20 animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-center gap-6 mt-10">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/menu', label: 'Menu' },
              { href: '#zone', label: 'Zone de livraison' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl font-bold hover:text-orange-500 transition-colors"
                style={{ '--tw-text-opacity': '1' } as React.CSSProperties}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setMenuOpen(false)}
              className="mt-4 font-bold text-lg px-10 py-4 rounded-2xl"
              style={{ backgroundColor: '#F97316', color: 'white' }}
            >
              Commander maintenant
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
