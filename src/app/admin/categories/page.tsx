'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CATEGORIES } from '@/data/products';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES.map((c, i) => ({ ...c, order: i + 1, productCount: [12, 4, 5, 5, 5][i] || 3 })));
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🍔');

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success('Catégorie supprimée');
  };

  const addCategory = () => {
    if (!newName) return;
    setCategories(prev => [...prev, { id: newName.toLowerCase(), name: newName, icon: newIcon, slug: newName.toLowerCase(), order: prev.length + 1, productCount: 0 }]);
    toast.success('Catégorie ajoutée !');
    setShowModal(false);
    setNewName('');
  };

  return (
    <>
      <AdminHeader title="Catégories" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/40 text-sm">{categories.length} catégories au total</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Ajouter une catégorie
          </button>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="flex items-center gap-5 px-6 py-4 border-b border-white/5 hover:bg-white/2 transition-colors"
            >
              <GripVertical size={18} className="text-white/20 cursor-grab" />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: '#222' }}
              >
                {cat.icon}
              </div>
              <div className="flex-1">
                <p className="text-white font-bold">{cat.name}</p>
                <p className="text-white/30 text-xs">{cat.productCount} produits</p>
              </div>
              <div className="text-white/30 text-sm">Ordre: {cat.order}</div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                  <Edit size={15} className="text-white/60" />
                </button>
                <button onClick={() => deleteCategory(cat.id)} className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20">
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
            <h2 className="text-white font-bold text-xl mb-5">Nouvelle catégorie</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs font-semibold block mb-1">Nom</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-semibold block mb-1">Icône (emoji)</label>
                <input type="text" value={newIcon} onChange={e => setNewIcon(e.target.value)} className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm">Annuler</button>
              <button onClick={addCategory} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: '#F97316' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
