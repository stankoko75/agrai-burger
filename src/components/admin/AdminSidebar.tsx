'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, History, CreditCard,
  Package, Tag, Plus, Settings2, Truck, Users,
  Settings, LogOut, Megaphone, TicketPercent,
} from 'lucide-react';
import { AgraiBurgerLogo } from '@/components/ui/Logo';

const NAV_ITEMS = [
  {
    section: 'VENTES',
    items: [
      { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
      { href: '/admin/orders', label: 'Commandes', icon: ShoppingBag, badge: 'LIVE', badgeCount: 12 },
      { href: '/admin/history', label: 'Historique', icon: History },
      { href: '/admin/payments', label: 'Paiements', icon: CreditCard },
    ],
  },
  {
    section: 'PRODUITS',
    items: [
      { href: '/admin/products', label: 'Produits', icon: Package },
      { href: '/admin/categories', label: 'Catégories', icon: Tag },
      { href: '/admin/supplements', label: 'Suppléments', icon: Plus },
      { href: '/admin/options', label: 'Options', icon: Settings2 },
    ],
  },
  {
    section: 'MARKETING',
    items: [
      { href: '/admin/promotions', label: 'Promotions', icon: Megaphone },
      { href: '/admin/promo-codes', label: 'Codes promo', icon: TicketPercent },
    ],
  },
  {
    section: 'PARAMÈTRES',
    items: [
      { href: '/admin/restaurant', label: 'Restaurant', icon: Settings },
      { href: '/admin/delivery', label: 'Livraison', icon: Truck },
      { href: '/admin/users', label: 'Utilisateurs', icon: Users },
      { href: '/admin/settings', label: 'Réglages', icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-64 flex flex-col border-r border-white/5 z-40 overflow-y-auto"
      style={{ backgroundColor: '#111' }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5 flex-shrink-0">
        <AgraiBurgerLogo size={32} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {NAV_ITEMS.map((group) => (
          <div key={group.section}>
            <p className="text-white/20 text-xs font-bold tracking-widest px-3 mb-2">{group.section}</p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon, badge, badgeCount }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                    style={isActive ? { backgroundColor: '#F97316', color: 'white' } : {}}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="text-sm font-semibold flex-1">{label}</span>
                    {badge && (
                      <span
                        className="text-white text-xs font-bold px-1.5 py-0.5 rounded-md animate-pulse"
                        style={{ backgroundColor: '#EF4444' }}
                      >
                        {badge} {badgeCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5 flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-semibold">Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
}
