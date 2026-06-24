'use client';

import { TrendingUp, ShoppingBag, ShoppingCart, UserPlus, Star, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MOCK_ORDERS, MOCK_REVIEWS, SALES_DATA, TOP_PRODUCTS } from '@/data/admin';
import Link from 'next/link';

const KPI_CARDS = [
  {
    label: 'CHIFFRE D\'AFFAIRES', value: '1 890,50 €', change: '+18,6% vs hier',
    icon: TrendingUp, positive: true,
  },
  {
    label: 'COMMANDES', value: '67', change: '+15,2% vs hier',
    icon: ShoppingBag, positive: true,
  },
  {
    label: 'PANIER MOYEN', value: '28,22 €', change: '+7,8% vs hier',
    icon: ShoppingCart, positive: true,
  },
  {
    label: 'NOUVEAUX CLIENTS', value: '23', change: '+21,1% vs hier',
    icon: UserPlus, positive: true,
  },
];

const PIE_DATA = [
  { name: 'Livraison', value: 52, color: '#F97316' },
  { name: 'À emporter', value: 12, color: '#EA580C' },
  { name: 'Sur place', value: 3, color: '#9CA3AF' },
];

const STATUS_COLORS: Record<string, string> = {
  'Nouvelle': '#F97316',
  'En préparation': '#EAB308',
  'Prête': '#22C55E',
  'En livraison': '#3B82F6',
  'Livrée': '#6B7280',
  'Annulée': '#EF4444',
};

export default function DashboardPage() {
  const recentOrders = MOCK_ORDERS.slice(0, 6);
  const liveOrders = MOCK_ORDERS.filter(o => ['Nouvelle', 'En préparation', 'Prête'].includes(o.status)).slice(0, 5);

  return (
    <>
      <AdminHeader title="Tableau de bord" />
      <div className="p-8 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map(({ label, value, change, icon: Icon, positive }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs font-bold tracking-wider mb-2">{label}</p>
                <p className="text-white font-bold text-2xl mb-1">{value}</p>
                <p className="text-xs font-semibold flex items-center gap-1" style={{ color: positive ? '#22C55E' : '#EF4444' }}>
                  ↑ {change}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F97316' }}
              >
                <Icon size={22} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Évolution des ventes</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K €`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                  formatter={(v: number) => [`${v} €`, 'Ventes']}
                />
                <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} fill="url(#orangeGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Répartition des commandes</h3>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={70}
                    dataKey="value"
                    startAngle={90} endAngle={-270}
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24" fontWeight="bold">67</text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.4)" fontSize="11">Total</text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {PIE_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-white/60">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold">{item.value} ({Math.round(item.value/67*100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Top Products */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Top Produits</h3>
              <Link href="/admin/products" className="text-xs font-semibold hover:opacity-80" style={{ color: '#F97316' }}>
                Voir tout
              </Link>
            </div>
            <div className="space-y-4">
              {TOP_PRODUCTS.map((p) => (
                <div key={p.rank} className="flex items-center gap-4">
                  <span className="text-white/30 font-bold text-sm w-4">{p.rank}</span>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#222] flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                  </div>
                  <span className="text-white/50 text-xs font-medium">{p.sold}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Dernières Commandes</h3>
              <Link href="/admin/orders" className="text-xs font-semibold hover:opacity-80" style={{ color: '#F97316' }}>
                Voir toutes
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">{order.number}</p>
                    <p className="text-white/40 text-xs">{order.customer}</p>
                  </div>
                  <div
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: order.type === 'Livraison' ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
                      color: order.type === 'Livraison' ? '#F97316' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {order.type}
                  </div>
                  <p className="text-white font-bold text-sm">{order.amount.toFixed(2)} €</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Orders + Reviews */}
          <div className="space-y-4">
            {/* Live */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Commandes en cours</h3>
                <Link href="/admin/orders" className="text-xs font-semibold hover:opacity-80" style={{ color: '#F97316' }}>
                  Voir toutes
                </Link>
              </div>
              <div className="space-y-2">
                {liveOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-bold">{order.number}</span>
                        {order.isNew && (
                          <span className="text-white text-xs font-bold px-1.5 py-0.5 rounded animate-pulse" style={{ backgroundColor: '#EF4444' }}>LIVE</span>
                        )}
                        <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{
                          backgroundColor: 'rgba(249,115,22,0.2)',
                          color: '#F97316',
                        }}>{order.type}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[order.status] }} />
                        <span className="text-xs font-semibold" style={{ color: STATUS_COLORS[order.status] }}>{order.status}</span>
                      </div>
                    </div>
                    <span className="text-white font-bold text-sm">{order.amount.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <Link
                href="/admin/orders"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all"
                style={{ backgroundColor: '#F97316' }}
              >
                Voir toutes les commandes <ArrowRight size={16} />
              </Link>
            </div>

            {/* Reviews */}
            <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Avis récents</h3>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((review, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#F97316' }}>
                        {review.avatar}
                      </div>
                      <span className="text-white text-xs font-bold">{review.name}</span>
                      <div className="flex gap-0.5 ml-auto">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} size={10} fill="#F97316" color="#F97316" />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed pl-9">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
