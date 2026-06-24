'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ToggleRight, ToggleLeft } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SUPPLEMENTS } from '@/data/products';
import toast from 'react-hot-toast';

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState(SUPPLEMENTS.map(s => ({ ...s, available: true })));
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AdminHeader title="Suppléments" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/40 text-sm">{supplements.length} suppléments</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Ajouter un supplément
          </button>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 text-white/30 text-xs font-bold tracking-wider">
            <span className="col-span-2">SUPPLÉMENT</span>
            <span>ICÔNE</span>
            <span>PRIX</span>
            <span>ACTIONS</span>
          </div>
          {supplements.map((sup) => (
            <div key={sup.id} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors">
              <div className="col-span-2">
                <p className="text-white font-bold">{sup.name}</p>
              </div>
              <span className="text-2xl">{sup.image}</span>
              <span className="font-bold text-sm" style={{ color: '#F97316' }}>+{sup.price.toFixed(2)} €</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSupplements(prev => prev.map(s => s.id === sup.id ? { ...s, available: !s.available } : s))}
                >
                  {sup.available
                    ? <ToggleRight size={24} style={{ color: '#22C55E' }} />
                    : <ToggleLeft size={24} className="text-white/20" />
                  }
                </button>
                <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                  <Edit size={15} className="text-white/60" />
                </button>
                <button
                  onClick={() => { setSupplements(prev => prev.filter(s => s.id !== sup.id)); toast.success('Supprimé'); }}
                  className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20"
                >
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
            <h2 className="text-white font-bold text-xl mb-5">Nouveau supplément</h2>
            <div className="space-y-4">
              {['Nom', 'Prix (€)', 'Icône (emoji)'].map(f => (
                <div key={f}>
                  <label className="text-white/50 text-xs font-semibold block mb-1">{f}</label>
                  <input type="text" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm">Annuler</button>
              <button onClick={() => { toast.success('Supplément ajouté !'); setShowModal(false); }} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: '#F97316' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
