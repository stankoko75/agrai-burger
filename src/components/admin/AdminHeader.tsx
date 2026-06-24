'use client';

import { Bell, ChevronDown, Calendar } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 z-30 border-b border-white/5 flex items-center justify-between px-8 h-16"
      style={{ left: '256px', backgroundColor: '#111' }}
    >
      <div>
        <h1 className="text-white font-bold text-xl flex items-center gap-3">
          {title}
          {subtitle && (
            <span className="text-xs font-bold px-2 py-1 rounded-lg animate-pulse" style={{ backgroundColor: '#EF4444', color: 'white' }}>
              LIVE
            </span>
          )}
        </h1>
        {subtitle && <p className="text-white/30 text-xs">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Date picker */}
        <button className="flex items-center gap-2 text-white/60 text-sm font-medium bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2 hover:bg-[#222] transition-colors">
          <Calendar size={14} />
          Aujourd'hui
          <ChevronDown size={14} />
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#222] transition-colors">
          <Bell size={18} className="text-white/70" />
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
            style={{ backgroundColor: '#F97316' }}
          >
            8
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 hover:bg-[#222] transition-colors">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ backgroundColor: '#F97316' }}
          >
            AB
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-white text-xs font-bold">Agraï Burger</p>
            <p className="text-white/40 text-xs">Propriétaire</p>
          </div>
          <ChevronDown size={14} className="text-white/40" />
        </button>
      </div>
    </header>
  );
}
