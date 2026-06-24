'use client';

import { useState } from 'react';
import { Plus, Trash2, ToggleRight, ToggleLeft, Tag, Copy } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';

const INITIAL_PROMOS = [
  { id: '1', code: 'AGRAI10', discount: 10, type: 'percent', uses: 48, maxUses: 100, active: true, expires: '31/12/2025' },
  { id: '2', code: 'NUIT15', discount: 15, type: 'percent', uses: 32, maxUses: 50, active: true, expires: '31/01/2026' },
  { id: '3', code: 'BIENVENUE', discount: 20, type: 'percent', uses: 120, maxUses: null, active: false, expires: null },
  { id: '4', code: 'LIVRAISON0', discount: 2.5, type: 'fixed', uses: 67, maxUses: 200, active: true, expires: '15/12/2025' },
];

export default function PromotionsPage() {
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [showModal, setShowModal] = useState(false);

  const togglePromo = (id: string) => {
    setPromos(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deletePromo = (id: string) => {
    setPromos(prev => prev.filter(p => p.id !== id));
    toast.success('Code promo supprimé');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code "${code}" copié !`);
  };

  return (
    <>
      <AdminHeader title="Codes promo" />
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Codes actifs', value: promos.filter(p => p.active).length, color: '#22C55E' },
            { label: 'Total utilisations', value: promos.reduce((a, p) => a + p.uses, 0) },
            { label: 'Réduction moyenne', value: '14%', color: '#F97316' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5">
              <p className="text-white/40 text-xs font-bold mb-1">{label}</p>
              <p className="font-bold text-2xl" style={color ? { color } : { color: 'white' }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-white/40 text-sm">{promos.length} codes promo</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Créer un code
          </button>
        </div>

        <div className="space-y-3">
          {promos.map(promo => (
            <div key={promo.id} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: promo.active ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)' }}
              >
                <Tag size={20} style={{ color: promo.active ? '#F97316' : 'rgba(255,255,255,0.2)' }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-bold font-mono text-lg">{promo.code}</span>
                  <button onClick={() => copyCode(promo.code)} className="text-white/30 hover:text-white/60 transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span>
                    {promo.type === 'percent' ? `-${promo.discount}%` : `-${promo.discount} €`}
                  </span>
                  <span>{promo.uses}{promo.maxUses ? `/${promo.maxUses}` : ''} utilisations</span>
                  {promo.expires && <span>Expire le {promo.expires}</span>}
                </div>
              </div>

              {/* Progress */}
              {promo.maxUses && (
                <div className="w-24">
                  <div className="flex justify-between text-xs text-white/30 mb-1">
                    <span>{promo.uses}</span>
                    <span>{promo.maxUses}</span>
                  </div>
                  <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(promo.uses / promo.maxUses) * 100}%`, backgroundColor: '#F97316' }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button onClick={() => togglePromo(promo.id)}>
                  {promo.active
                    ? <ToggleRight size={28} style={{ color: '#22C55E' }} />
                    : <ToggleLeft size={28} className="text-white/20" />
                  }
                </button>
                <button onClick={() => deletePromo(promo.id)} className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20">
                  <Trash2 size={15} className="text-white/60" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-white font-bold text-xl mb-5">Créer un code promo</h2>
            <div className="space-y-4">
              {['Code promo', 'Réduction (%)', 'Nombre max d\'utilisations', 'Date d\'expiration'].map(f => (
                <div key={f}>
                  <label className="text-white/50 text-xs font-semibold block mb-1">{f}</label>
                  <input type="text" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm">Annuler</button>
              <button onClick={() => { toast.success('Code promo créé !'); setShowModal(false); }} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: '#F97316' }}>
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
