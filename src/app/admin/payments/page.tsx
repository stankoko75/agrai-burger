'use client';

import { CreditCard, Smartphone, Euro, TrendingUp } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

const PAYMENTS = [
  { id: 'pay_001', order: '#1552', customer: 'Thomas B.', method: 'Carte', amount: 32.90, status: 'Réussi', time: '23:08' },
  { id: 'pay_002', order: '#1551', customer: 'Sarah L.', method: 'Apple Pay', amount: 18.50, status: 'Réussi', time: '23:07' },
  { id: 'pay_003', order: '#1550', customer: 'Mike D.', method: 'Carte', amount: 27.40, status: 'Réussi', time: '23:06' },
  { id: 'pay_004', order: '#1549', customer: 'Julie R.', method: 'Google Pay', amount: 14.90, status: 'Réussi', time: '23:04' },
  { id: 'pay_005', order: '#1548', customer: 'Nassim K.', method: 'Carte', amount: 43.80, status: 'Réussi', time: '23:02' },
  { id: 'pay_006', order: '#1547', customer: 'Clara M.', method: 'Apple Pay', amount: 13.90, status: 'Réussi', time: '23:01' },
  { id: 'pay_007', order: '#1546', customer: 'Alex P.', method: 'Carte', amount: 21.90, status: 'Remboursé', time: '22:59' },
  { id: 'pay_008', order: '#1545', customer: 'Léa D.', method: 'Carte', amount: 26.50, status: 'Réussi', time: '22:57' },
];

const methodIcon = (method: string) => {
  if (method === 'Apple Pay' || method === 'Google Pay') return <Smartphone size={14} />;
  return <CreditCard size={14} />;
};

export default function PaymentsPage() {
  const total = PAYMENTS.filter(p => p.status === 'Réussi').reduce((a, p) => a + p.amount, 0);
  const refunds = PAYMENTS.filter(p => p.status === 'Remboursé').reduce((a, p) => a + p.amount, 0);

  return (
    <>
      <AdminHeader title="Paiements" />
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Transactions réussies', value: PAYMENTS.filter(p => p.status === 'Réussi').length, icon: TrendingUp, color: '#22C55E' },
            { label: 'CA encaissé', value: `${total.toFixed(2)} €`, icon: Euro, color: '#F97316' },
            { label: 'Remboursements', value: `${refunds.toFixed(2)} €`, icon: CreditCard, color: '#EF4444' },
            { label: 'Taux de succès', value: '96,2%', icon: TrendingUp, color: '#3B82F6' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs font-bold mb-1">{label}</p>
                <p className="font-bold text-xl" style={{ color }}>{value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 text-white/30 text-xs font-bold tracking-wider">
            <span>TRANSACTION</span>
            <span>COMMANDE</span>
            <span className="col-span-2">CLIENT</span>
            <span>MÉTHODE</span>
            <span>MONTANT</span>
          </div>
          {PAYMENTS.map(p => (
            <div key={p.id} className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors">
              <div>
                <p className="text-white font-mono text-xs">{p.id}</p>
                <p className="text-white/30 text-xs">{p.time}</p>
              </div>
              <span className="text-white font-bold text-sm">{p.order}</span>
              <span className="col-span-2 text-white/70 text-sm">{p.customer}</span>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                {methodIcon(p.method)}
                <span>{p.method}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm" style={{ color: p.status === 'Remboursé' ? '#EF4444' : '#22C55E' }}>
                  {p.status === 'Remboursé' ? '-' : '+'}{p.amount.toFixed(2)} €
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                  backgroundColor: p.status === 'Réussi' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  color: p.status === 'Réussi' ? '#22C55E' : '#EF4444',
                }}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
