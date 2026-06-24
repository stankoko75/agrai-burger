'use client';

import Link from 'next/link';
import { AgraiBurgerLogo } from '@/components/ui/Logo';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D0D0D' }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <AgraiBurgerLogo size={40} />
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              Agraï Burger, c'est le goût authentique du burger, livré chez vous, de nuit.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors"
                >
                  <Icon size={16} className="text-white/60" />
                </Link>
              ))}
              {/* Snapchat */}
              <Link href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <span className="text-xs text-white/60 font-bold">SC</span>
              </Link>
              {/* TikTok */}
              <Link href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <span className="text-xs text-white/60 font-bold">TK</span>
              </Link>
              {/* Twitter */}
              <Link href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <span className="text-xs text-white/60 font-bold">𝕏</span>
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Liens Rapides</h3>
            <ul className="space-y-3">
              {['Menu', 'Zone de livraison', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Informations</h3>
            <ul className="space-y-3">
              {["Qui sommes-nous ?", "CGV", "Mentions légales", "Politique de confidentialité"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone size={14} style={{ color: '#F97316' }} />
                06 21 62 50 50
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail size={14} style={{ color: '#F97316' }} />
                agrai.burger@gmail.com
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin size={14} style={{ color: '#F97316' }} />
                Île-de-France
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© Agraï Burger 2025 – Tous droits réservés.</p>
          <Link href="/admin" className="text-white/10 hover:text-white/30 text-xs transition-colors">
            Back Office
          </Link>
        </div>
      </div>
    </footer>
  );
}
