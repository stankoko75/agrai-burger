'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, SUPPLEMENTS, DESSERT_OPTIONS, DRINK_OPTIONS } from '@/data/products';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { CartModal } from '@/components/cart/CartModal';

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem, openCart } = useCartStore();

  const product = PRODUCTS.find(p => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [selectedDessert, setSelectedDessert] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [instructions, setInstructions] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="text-center">
          <p className="text-white text-xl font-bold mb-4">Produit introuvable</p>
          <button onClick={() => router.push('/menu')} className="text-orange-400">← Retour au menu</button>
        </div>
      </div>
    );
  }

  const toggleSupplement = (id: string) => {
    setSelectedSupplements(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getSupplementData = (id: string) => SUPPLEMENTS.find(s => s.id === id);

  const totalPrice = () => {
    const supTotal = selectedSupplements.reduce((acc, id) => {
      const sup = getSupplementData(id);
      return acc + (sup?.price || 0);
    }, 0);
    const dessertPrice = selectedDessert
      ? DESSERT_OPTIONS.find(d => d.id === selectedDessert)?.price || 0
      : 0;
    const drinkPrice = selectedDrink
      ? DRINK_OPTIONS.find(d => d.id === selectedDrink)?.price || 0
      : 0;
    return (product.price + supTotal + dessertPrice + drinkPrice) * quantity;
  };

  const handleAddToCart = () => {
    const supplements = selectedSupplements.map(id => {
      const sup = getSupplementData(id)!;
      return { name: sup.name, price: sup.price };
    });
    const dessertData = selectedDessert ? DESSERT_OPTIONS.find(d => d.id === selectedDessert) : null;
    const drinkData = selectedDrink ? DRINK_OPTIONS.find(d => d.id === selectedDrink) : null;

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      supplements,
      dessert: dessertData ? { name: dessertData.name, price: dessertData.price } : undefined,
      drink: drinkData ? { name: drinkData.name, price: drinkData.price } : undefined,
      instructions,
    });

    toast.success(`${product.name} ajouté au panier !`);
    openCart();
  };

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#0A0A0A' }}>
      <Navbar />
      <CartModal />

      <div className="pt-16">
        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[50vh] overflow-hidden bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>

          {/* Cart icon top right */}
          <button
            onClick={openCart}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10"
          >
            <ShoppingBag size={20} className="text-white" />
          </button>

          {/* Product name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-white font-bold text-3xl sm:text-4xl leading-tight">{product.name}</h1>
            <p className="font-bold text-2xl mt-1" style={{ color: '#F97316' }}>{product.price.toFixed(2)} €</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Info */}
          <div className="py-5 border-b border-white/10">
            <p className="text-white/60 text-sm leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <Star size={16} fill="#F97316" color="#F97316" />
              <span className="text-white font-semibold text-sm">{product.rating}</span>
              <span className="text-white/40 text-sm">({product.reviews} avis)</span>
            </div>
          </div>

          {/* SUPPLÉMENTS */}
          <div className="py-5 border-b border-white/10">
            <h2 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Suppléments</h2>
            <div className="space-y-2">
              {SUPPLEMENTS.map((sup) => {
                const isSelected = selectedSupplements.includes(sup.id);
                return (
                  <button
                    key={sup.id}
                    onClick={() => toggleSupplement(sup.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200"
                    style={{
                      backgroundColor: isSelected ? 'rgba(249,115,22,0.1)' : '#1A1A1A',
                      borderColor: isSelected ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        backgroundColor: isSelected ? '#F97316' : 'transparent',
                        borderColor: isSelected ? '#F97316' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-white text-sm font-medium flex-1 text-left">{sup.name}</span>
                    <span className="text-white/50 text-sm">+ {sup.price.toFixed(2)} €</span>
                    <span className="text-lg">{sup.image}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESSERTS */}
          <div className="py-5 border-b border-white/10">
            <h2 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Un dessert ?</h2>
            <div className="space-y-2">
              {DESSERT_OPTIONS.map((dessert) => {
                const isSelected = selectedDessert === dessert.id;
                return (
                  <button
                    key={dessert.id}
                    onClick={() => setSelectedDessert(isSelected ? null : dessert.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200"
                    style={{
                      backgroundColor: isSelected ? 'rgba(249,115,22,0.1)' : '#1A1A1A',
                      borderColor: isSelected ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: isSelected ? '#F97316' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {isSelected && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }} />}
                    </div>
                    <span className="text-white text-sm font-medium flex-1 text-left">{dessert.name}</span>
                    <span className="text-white/50 text-sm">+ {dessert.price.toFixed(2)} €</span>
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#222]">
                      <img src={dessert.image} alt={dessert.name} className="w-full h-full object-cover" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOISSONS */}
          <div className="py-5 border-b border-white/10">
            <h2 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Une boisson ?</h2>
            <div className="space-y-2">
              {DRINK_OPTIONS.map((drink) => {
                const isSelected = selectedDrink === drink.id;
                return (
                  <button
                    key={drink.id}
                    onClick={() => setSelectedDrink(isSelected ? null : drink.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200"
                    style={{
                      backgroundColor: isSelected ? 'rgba(249,115,22,0.1)' : '#1A1A1A',
                      borderColor: isSelected ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: isSelected ? '#F97316' : 'rgba(255,255,255,0.2)' }}
                    >
                      {isSelected && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }} />}
                    </div>
                    <span className="text-white text-sm font-medium flex-1 text-left">{drink.name}</span>
                    <span className="text-white/50 text-sm">+ {drink.price.toFixed(2)} €</span>
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#222]">
                      <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="py-5">
            <h2 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">
              Instructions spécifiques <span className="text-white/30 normal-case text-xs">(Optionnel)</span>
            </h2>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ajoutez vos allergies ou vos commentaires (plus de sauce, pas d'oignon...)"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 text-white/70 text-sm resize-none focus:outline-none focus:border-orange-500/50 placeholder-white/30"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 p-4 pb-safe"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-[#1A1A1A] border border-white/10 rounded-2xl p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center text-white font-bold hover:bg-[#2A2A2A] transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-white font-bold text-lg w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold transition-colors"
              style={{ backgroundColor: '#F97316' }}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between font-bold text-white py-4 px-6 rounded-2xl text-lg transition-all duration-200 active:scale-95"
            style={{ backgroundColor: '#F97316' }}
          >
            <span>Ajouter au panier</span>
            <span>{totalPrice().toFixed(2)} €</span>
          </button>
        </div>
      </div>
    </div>
  );
}
