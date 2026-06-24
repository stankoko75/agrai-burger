'use client';

import { useState } from 'react';
import { ShoppingBag, Clock, CheckCircle, TrendingUp, X, Phone, MessageSquare, Printer, Bike, Package } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MOCK_ORDERS, Order } from '@/data/admin';
import toast from 'react-hot-toast';

const STATUS_COLORS: Record<string, string> = {
  'Nouvelle': '#F97316',
  'En préparation': '#EAB308',
  'Prête': '#22C55E',
  'En livraison': '#3B82F6',
  'Livrée': '#6B7280',
  'Annulée': '#EF4444',
};

const STATUS_BG: Record<string, string> = {
  'Nouvelle': 'rgba(249,115,22,0.15)',
  'En préparation': 'rgba(234,179,8,0.15)',
  'Prête': 'rgba(34,197,94,0.15)',
  'En livraison': 'rgba(59,130,246,0.15)',
  'Livrée': 'rgba(107,114,128,0.15)',
  'Annulée': 'rgba(239,68,68,0.15)',
};

const STATUS_FLOW = ['Nouvelle', 'En préparation', 'Prête', 'En livraison', 'Livrée'];

const TABS = ['Toutes', 'Nouvelles', 'En préparation', 'Prêtes', 'En livraison'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState('Toutes');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);

  const getTabCount = (tab: string) => {
    if (tab === 'Toutes') return orders.filter(o => !['Livrée', 'Annulée'].includes(o.status)).length;
    if (tab === 'Nouvelles') return orders.filter(o => o.status === 'Nouvelle').length;
    if (tab === 'En préparation') return orders.filter(o => o.status === 'En préparation').length;
    if (tab === 'Prêtes') return orders.filter(o => o.status === 'Prête').length;
    if (tab === 'En livraison') return orders.filter(o => o.status === 'En livraison').length;
    return 0;
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'Toutes') return true;
    if (activeTab === 'Nouvelles') return o.status === 'Nouvelle';
    if (activeTab === 'En préparation') return o.status === 'En préparation';
    if (activeTab === 'Prêtes') return o.status === 'Prête';
    if (activeTab === 'En livraison') return o.status === 'En livraison';
    return true;
  });

  const updateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, isNew: false } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus, isNew: false } : null);
    }
    toast.success(`Statut mis à jour : ${newStatus}`);
  };

  const acceptOrder = (order: Order) => updateStatus(order.id, 'En préparation');
  const refuseOrder = (orderId: string) => {
    updateStatus(orderId, 'Annulée');
    if (selectedOrder?.id === orderId) setSelectedOrder(null);
  };

  const nextStatus = (order: Order) => {
    const idx = STATUS_FLOW.indexOf(order.status);
    if (idx >= 0 && idx < STATUS_FLOW.length - 1) {
      updateStatus(order.id, STATUS_FLOW[idx + 1] as Order['status']);
    }
  };

  const kpis = [
    { label: 'COMMANDES EN COURS', value: orders.filter(o => !['Livrée', 'Annulée'].includes(o.status)).length, sub: 'dont 5 nouvelles', icon: ShoppingBag, color: '#F97316' },
    { label: 'EN PRÉPARATION', value: orders.filter(o => o.status === 'En préparation').length, sub: '+2 depuis 10 min', icon: Clock, color: '#EAB308' },
    { label: 'PRÊTES', value: orders.filter(o => o.status === 'Prête').length, sub: 'À récupérer / livrer', icon: CheckCircle, color: '#22C55E' },
    { label: 'CHIFFRE D\'AFFAIRES LIVE', value: '358,50 €', sub: "aujourd'hui", icon: TrendingUp, color: '#F97316', large: true },
  ];

  return (
    <>
      <AdminHeader title="Commandes live" subtitle="Suivez et gérez les commandes en temps réel" />
      <div className="p-6 space-y-4">
        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, sub, icon: Icon, color, large }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs font-bold tracking-wider mb-1">{label}</p>
                <p className="text-white font-bold mb-1" style={{ fontSize: large ? '1.6rem' : '2rem', color: large ? color : 'white' }}>{value}</p>
                <p className="text-white/30 text-xs">{sub}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
                <Icon size={22} style={{ color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex gap-4" style={{ height: 'calc(100vh - 280px)' }}>
          {/* Orders list */}
          <div className="flex-1 bg-[#1A1A1A] rounded-2xl border border-white/5 flex flex-col min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-4 border-b border-white/5 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
                  style={activeTab === tab ? { backgroundColor: '#F97316', color: 'white' } : { color: 'rgba(255,255,255,0.4)' }}
                >
                  {tab}
                  <span
                    className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={activeTab === tab ? { backgroundColor: 'rgba(255,255,255,0.2)' } : { backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {getTabCount(tab)}
                  </span>
                </button>
              ))}
            </div>

            {/* Table header */}
            <div className="grid grid-cols-7 gap-2 px-5 py-3 text-white/30 text-xs font-bold tracking-wider border-b border-white/5">
              <span className="col-span-2">N° COMMANDE</span>
              <span>CLIENT</span>
              <span>TYPE</span>
              <span>STATUT</span>
              <span>HEURE</span>
              <span>MONTANT</span>
            </div>

            {/* Orders */}
            <div className="flex-1 overflow-y-auto">
              {filteredOrders.map(order => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full grid grid-cols-7 gap-2 px-5 py-4 text-left border-b border-white/5 hover:bg-white/3 transition-colors items-center"
                  style={selectedOrder?.id === order.id ? { backgroundColor: 'rgba(249,115,22,0.08)', borderLeft: '3px solid #F97316' } : {}}
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm">{order.number}</span>
                        {order.isNew && (
                          <span className="text-white text-xs font-bold px-1.5 py-0.5 rounded animate-pulse" style={{ backgroundColor: '#EF4444' }}>NOUVELLE</span>
                        )}
                      </div>
                      <span className="text-white/40 text-xs">{order.items.length} article{order.items.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{order.customer}</p>
                    <p className="text-white/40 text-xs">{order.phone}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {order.type === 'Livraison' ? <Bike size={14} style={{ color: '#F97316' }} /> : <Package size={14} className="text-white/50" />}
                    <span className="text-white/70 text-xs">{order.type}</span>
                  </div>
                  <div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: STATUS_BG[order.status], color: STATUS_COLORS[order.status] }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{order.time}</p>
                    <p className="text-white/30 text-xs">{order.timeAgo}</p>
                  </div>
                  <p className="text-white font-bold">{order.amount.toFixed(2)} €</p>
                </button>
              ))}
            </div>
          </div>

          {/* Order detail panel */}
          {selectedOrder && (
            <div className="w-80 bg-[#1A1A1A] rounded-2xl border border-white/5 flex flex-col flex-shrink-0 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold">DÉTAILS {selectedOrder.number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor: STATUS_BG[selectedOrder.status], color: STATUS_COLORS[selectedOrder.status] }}
                    >
                      {selectedOrder.status}
                    </span>
                    <span className="text-white/30 text-xs">Reçue {selectedOrder.timeAgo}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <X size={14} className="text-white/50" />
                </button>
              </div>

              {/* Customer & Delivery */}
              <div className="p-5 border-b border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  {selectedOrder.type === 'Livraison' ? <Bike size={16} style={{ color: '#F97316' }} /> : <Package size={16} style={{ color: '#F97316' }} />}
                  <span className="text-white text-sm font-semibold">{selectedOrder.type}</span>
                  {selectedOrder.type === 'Livraison' && <span className="text-white/40 text-xs">25 – 35 min</span>}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-bold text-sm">{selectedOrder.customer}</p>
                    <p className="text-white/50 text-xs mt-0.5">{selectedOrder.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                      <Phone size={14} className="text-white/60" />
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                      <MessageSquare size={14} className="text-white/60" />
                    </button>
                  </div>
                </div>
                {selectedOrder.type === 'Livraison' && (
                  <p className="text-white/40 text-xs leading-relaxed bg-[#222] rounded-xl p-3 whitespace-pre-line">
                    {selectedOrder.address}
                  </p>
                )}
              </div>

              {/* Articles */}
              <div className="p-5 border-b border-white/5">
                <p className="text-white/30 text-xs font-bold tracking-wider mb-3">ARTICLES ({selectedOrder.items.length})</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center text-base">🍔</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        {item.options && <p className="text-white/40 text-xs">{item.options}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white/50 text-xs">x{item.qty}</p>
                        <p className="text-white font-bold text-sm">{item.price.toFixed(2)} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="p-5 border-b border-white/5">
                <div className="flex justify-between text-sm text-white/40 mb-1">
                  <span>Sous-total</span>
                  <span>{(selectedOrder.amount - 2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-white/40 mb-2">
                  <span>Frais de livraison</span>
                  <span>2,00 €</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">TOTAL</span>
                  <span style={{ color: '#F97316' }}>{selectedOrder.amount.toFixed(2)} €</span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 space-y-2 mt-auto">
                {selectedOrder.status === 'Nouvelle' ? (
                  <>
                    <button
                      onClick={() => acceptOrder(selectedOrder)}
                      className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      Accepter la commande
                    </button>
                    <button
                      onClick={() => refuseOrder(selectedOrder.id)}
                      className="w-full py-3 rounded-xl font-bold text-sm border border-white/10 text-white/60 hover:border-red-500/50 hover:text-red-400 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Refuser la commande
                    </button>
                  </>
                ) : !['Livrée', 'Annulée'].includes(selectedOrder.status) ? (
                  <>
                    <button
                      onClick={() => nextStatus(selectedOrder)}
                      className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      → {STATUS_FLOW[STATUS_FLOW.indexOf(selectedOrder.status) + 1]}
                    </button>
                    <button
                      onClick={() => toast.success('Ticket imprimé !')}
                      className="w-full py-2 rounded-xl font-semibold text-xs border border-white/10 text-white/50 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    >
                      <Printer size={14} /> Imprimer le ticket
                    </button>
                  </>
                ) : (
                  <div className="text-center text-white/30 text-sm py-2">
                    {selectedOrder.status === 'Livrée' ? '✅ Commande livrée' : '❌ Commande annulée'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
