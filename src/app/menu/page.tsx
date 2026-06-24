'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Star, ArrowLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { CartModal } from '@/components/cart/CartModal';
import { Footer } from '@/components/layout/Footer';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const { addItem, openCart } = useCartStore();

  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      supplements: [],
    });
    toast.success(`${product.name} ajouté !`);
    openCart();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <Navbar />
      <CartModal />

      <div className="pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Accueil
          </Link>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2">Notre Menu</h1>
          <p className="text-white/40">Choisissez parmi nos créations exclusives</p>
        </div>

        {/* Category Tabs */}
        <div className="sticky top-16 z-30 border-b border-white/5" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-4 font-semibold text-sm transition-all duration-200 whitespace-nowrap border-b-2 ${
                    activeCategory === cat.id
                      ? 'text-white border-orange-500'
                      : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
                  style={activeCategory === cat.id ? { borderBottomColor: '#F97316', color: 'white' } : {}}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/20 transition-all duration-300 group flex flex-col"
              >
                {/* Image */}
                <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-[#222] relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg">Indisponible</span>
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm text-white" style={{ backgroundColor: 'rgba(249,115,22,0.9)' }}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} fill="#F97316" color="#F97316" />
                    <span className="text-xs text-white/50">{product.rating} ({product.reviews})</span>
                  </div>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-white font-bold text-base mb-1 hover:text-orange-400 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-white/40 text-xs leading-relaxed flex-1 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl" style={{ color: '#F97316' }}>
                      {product.price.toFixed(2)} €
                    </span>
                    {product.available ? (
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white transition-all duration-200 active:scale-90 hover:opacity-90"
                        style={{ backgroundColor: '#F97316' }}
                      >
                        <Plus size={18} />
                      </button>
                    ) : (
                      <span className="text-xs text-white/30 font-medium">Indisponible</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-white/30">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="mt-4 text-lg font-semibold">Aucun produit dans cette catégorie</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
