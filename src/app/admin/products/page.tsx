'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, ToggleLeft, ToggleRight, Package, AlertCircle } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import toast from 'react-hot-toast';

type Product = typeof PRODUCTS[0] & { stock?: number };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(
    PRODUCTS.map(p => ({ ...p, stock: Math.floor(Math.random() * 30) + 5 }))
  );
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const toggleAvailable = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
    const p = products.find(pp => pp.id === id);
    toast.success(`${p?.name} ${p?.available ? 'désactivé' : 'activé'}`);
  };

  const deleteProduct = (id: string) => {
    const p = products.find(pp => pp.id === id);
    setProducts(prev => prev.filter(pp => pp.id !== id));
    toast.success(`${p?.name} supprimé`);
  };

  return (
    <>
      <AdminHeader title="Produits" />
      <div className="p-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
          >
            <option value="all">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button
            onClick={() => { setEditingProduct(null); setShowModal(true); }}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl transition-all"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Ajouter un produit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total produits', value: products.length },
            { label: 'Disponibles', value: products.filter(p => p.available).length, color: '#22C55E' },
            { label: 'Indisponibles', value: products.filter(p => !p.available).length, color: '#EF4444' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5">
              <p className="text-white/40 text-xs font-bold mb-1">{label}</p>
              <p className="text-white font-bold text-3xl" style={color ? { color } : {}}>{value}</p>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-white/30 text-xs font-bold tracking-wider">
            <span className="col-span-4">PRODUIT</span>
            <span className="col-span-2">CATÉGORIE</span>
            <span className="col-span-1">PRIX</span>
            <span className="col-span-1">STOCK</span>
            <span className="col-span-2">STATUT</span>
            <span className="col-span-2">ACTIONS</span>
          </div>

          {/* Rows */}
          {filtered.map(product => (
            <div
              key={product.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors"
            >
              {/* Product */}
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#222] flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{product.name}</p>
                  {product.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#F97316' }}>
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="text-white/50 text-sm capitalize">
                  {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                </span>
              </div>

              {/* Price */}
              <div className="col-span-1">
                <span className="font-bold text-sm" style={{ color: '#F97316' }}>{product.price.toFixed(2)} €</span>
              </div>

              {/* Stock */}
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  {(product.stock || 0) <= 5 && <AlertCircle size={12} className="text-red-400" />}
                  <span className={`text-sm font-semibold ${(product.stock || 0) <= 5 ? 'text-red-400' : 'text-white'}`}>
                    {product.stock}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <button
                  onClick={() => toggleAvailable(product.id)}
                  className="flex items-center gap-2"
                >
                  {product.available ? (
                    <>
                      <ToggleRight size={24} style={{ color: '#22C55E' }} />
                      <span className="text-xs font-semibold text-green-400">Disponible</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={24} className="text-white/30" />
                      <span className="text-xs font-semibold text-white/30">Indisponible</span>
                    </>
                  )}
                </button>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2">
                <button
                  onClick={() => { setEditingProduct(product); setShowModal(true); }}
                  className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A] transition-colors"
                >
                  <Edit size={15} className="text-white/60" />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={15} className="text-white/60 hover:text-red-400" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/20">
              <Package size={48} strokeWidth={1} />
              <p className="mt-3 font-semibold">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-white font-bold text-xl mb-5">
              {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <div className="space-y-4">
              {['Nom du produit', 'Prix (€)', 'Description', 'Catégorie'].map(field => (
                <div key={field}>
                  <label className="text-white/50 text-xs font-semibold block mb-1">{field}</label>
                  <input
                    type="text"
                    defaultValue={
                      editingProduct && field === 'Nom du produit' ? editingProduct.name :
                      editingProduct && field === 'Prix (€)' ? String(editingProduct.price) :
                      editingProduct && field === 'Description' ? editingProduct.description : ''
                    }
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm">
                Annuler
              </button>
              <button
                onClick={() => { toast.success(editingProduct ? 'Produit mis à jour !' : 'Produit ajouté !'); setShowModal(false); }}
                className="flex-1 py-3 rounded-xl font-bold text-white text-sm"
                style={{ backgroundColor: '#F97316' }}
              >
                {editingProduct ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
