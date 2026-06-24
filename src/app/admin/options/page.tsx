'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';

const OPTIONS = [
  { id: '1', group: 'Sauce au choix', options: ['Ketchup', 'Mayonnaise', 'BBQ', 'Ranch', 'Spicy', 'Moutarde miel'], required: false },
  { id: '2', group: 'Cuisson viande', options: ['Saignant', 'À point', 'Bien cuit'], required: true },
  { id: '3', group: 'Pain au choix', options: ['Brioche', 'Viennois', 'Noir charbon', 'Sans gluten'], required: false },
];

export default function OptionsPage() {
  return (
    <>
      <AdminHeader title="Options" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/40 text-sm">{OPTIONS.length} groupes d'options</p>
          <button
            onClick={() => toast.success('Bientôt disponible')}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Nouveau groupe
          </button>
        </div>

        <div className="space-y-4">
          {OPTIONS.map(group => (
            <div key={group.id} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{group.group}</h3>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block"
                    style={{
                      backgroundColor: group.required ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
                      color: group.required ? '#F97316' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {group.required ? 'Obligatoire' : 'Optionnel'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                    <Edit size={15} className="text-white/60" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20">
                    <Trash2 size={15} className="text-white/60" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.options.map(opt => (
                  <span
                    key={opt}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 border border-white/10 bg-[#222]"
                  >
                    {opt}
                  </span>
                ))}
                <button
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-dashed border-white/20 text-white/30 hover:border-orange-500/40 hover:text-orange-400 transition-colors"
                >
                  + Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
