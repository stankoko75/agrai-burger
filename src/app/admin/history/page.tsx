'use client';

import { useState } from 'react';
import { Download, Search, Filter, Star } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MOCK_ORDERS } from '@/data/admin';

const STATUS_COLORS: Record<string, string> = {
  'Livrée': '#22C55E',
  'Annulée': '#EF4444',
  'En livraison': '#3B82F6',
};

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  const orders = MOCK_ORDERS.filter(o => ['Livrée', 'Annulée'].includes(o.status));
  const total = orders.reduce((a, o) => a + o.amount, 0);

  return (
    <>
      <AdminHeader title="Historique des commandes" />
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Commandes livrées', value: orders.filter(o => o.status === 'Livrée').length, color: '#22C55E' },
            { label: 'Commandes annulées', value: orders.filter(o => o.status === 'Annulée').length, color: '#EF4444' },
            { label: 'CA total', value: `${total.toFixed(2)} €`, color: '#F97316' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5">
              <p className="text-white/40 text-xs font-bold mb-1">{label}</p>
              <p className="font-bold text-2xl" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Chercher une commande ou client..."
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none"
            />
          </div>
          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
          >
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
          <button className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white/60 text-sm hover:bg-[#222] transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/5 text-white/30 text-xs font-bold tracking-wider">
            <span>N°</span>
            <span className="col-span-2">CLIENT</span>
            <span>TYPE</span>
            <span>STATUT</span>
            <span>HEURE</span>
            <span>MONTANT</span>
          </div>
          {orders.filter(o => o.customer.toLowerCase().includes(search.toLowerCase())).map(order => (
            <div key={order.id} className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors">
              <span className="text-white font-bold text-sm">{order.number}</span>
              <div className="col-span-2">
                <p className="text-white text-sm font-medium">{order.customer}</p>
                <p className="text-white/30 text-xs">{order.phone}</p>
              </div>
              <span className="text-white/50 text-sm">{order.type}</span>
              <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ color: STATUS_COLORS[order.status] || 'white', backgroundColor: `${STATUS_COLORS[order.status] || '#fff'}20` }}>
                {order.status}
              </span>
              <span className="text-white/60 text-sm">{order.time}</span>
              <span className="text-white font-bold text-sm">{order.amount.toFixed(2)} €</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
