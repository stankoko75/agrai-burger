'use client';

import { useState } from 'react';
import { X, ShoppingBag, Minus, Plus, Trash2, ChevronRight, Tag, Lock, Bike } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export function CartModal() {
  const {
    items, isOpen, closeCart, removeItem, updateQuantity,
    getSubtotal, getDeliveryFee, getTotal, promoCode,
    promoDiscount, applyPromo,
  } = useCartStore();

  const [showPromo, setShowPromo] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  const handlePromo = () => {
    if (applyPromo(promoInput)) {
      toast.success(`Code promo "${promoInput.toUpperCase()}" appliqué ! 🎉`);
      setShowPromo(false);
    } else {
      toast.error('Code promo invalide');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-[#111] flex flex-col animate-slide-up sm:animate-none sm:translate-x-0 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F97316' }}>
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">VOTRE PANIER</h2>
              <p className="text-white/50 text-sm">{items.reduce((a, i) => a + i.quantity, 0)} article{items.reduce((a, i) => a + i.quantity, 0) > 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-white/40">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="text-lg font-semibold">Votre panier est vide</p>
              <button
                onClick={closeCart}
                className="px-6 py-3 rounded-xl font-bold text-white"
                style={{ backgroundColor: '#F97316' }}
              >
                Voir le menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#222]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-white text-sm leading-tight">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} className="text-white/50" />
                      </button>
                    </div>
                    {item.supplements.length > 0 && (
                      <p className="text-white/40 text-xs mt-1 truncate">
                        {item.supplements.map(s => s.name).join(', ')}
                      </p>
                    )}
                    {item.drink && (
                      <p className="text-white/40 text-xs">{item.drink.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 bg-[#222] rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333] transition-colors font-bold"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-bold"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      <Plus size={14} className="text-white" />
                    </button>
                  </div>
                  <span className="font-bold text-lg" style={{ color: '#F97316' }}>
                    {((item.price + item.supplements.reduce((a, s) => a + s.price, 0) + (item.drink?.price || 0) + (item.dessert?.price || 0)) * item.quantity).toFixed(2)} €
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-4 space-y-3">
            {/* Promo */}
            <div>
              {!showPromo ? (
                <button
                  onClick={() => setShowPromo(true)}
                  className="w-full flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl hover:bg-[#222] transition-colors"
                >
                  <div className="flex items-center gap-2 text-white/70">
                    <Tag size={16} style={{ color: '#F97316' }} />
                    <span className="text-sm font-medium">
                      {promoCode ? `Code "${promoCode}" appliqué ✓` : 'Vous avez un code promo ?'}
                    </span>
                  </div>
                  {!promoCode && <ChevronRight size={16} className="text-white/40" />}
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Entrez votre code..."
                    className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-orange-500"
                    style={{ '--tw-ring-color': '#F97316' } as React.CSSProperties}
                    onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                  />
                  <button
                    onClick={handlePromo}
                    className="px-4 py-3 rounded-xl font-bold text-sm text-white"
                    style={{ backgroundColor: '#F97316' }}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-[#1A1A1A] rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Sous-total</span>
                <span>{getSubtotal().toFixed(2)} €</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm" style={{ color: '#22c55e' }}>
                  <span>Réduction ({Math.round(promoDiscount * 100)}%)</span>
                  <span>-{(getSubtotal() * promoDiscount).toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-white/70">
                <span>Frais de livraison</span>
                <span>{getDeliveryFee() === 0 ? 'Gratuit 🎉' : `${getDeliveryFee().toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                <span>Total</span>
                <span style={{ color: '#F97316' }}>{getTotal().toFixed(2)} €</span>
              </div>
            </div>

            {/* Delivery time */}
            <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
              <Bike size={18} style={{ color: '#F97316' }} />
              <div>
                <p className="text-sm font-semibold text-white">Livraison estimée</p>
                <p className="text-xs text-white/50">25 – 35 min</p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center font-bold text-white py-4 rounded-2xl text-lg transition-all duration-200 active:scale-95"
              style={{ backgroundColor: '#F97316' }}
            >
              VALIDER MON PANIER &nbsp; {getTotal().toFixed(2)} € →
            </Link>

            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
              <Lock size={12} />
              <span>Paiement sécurisé</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
