'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, CreditCard, Smartphone, Bike } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { CartModal } from '@/components/cart/CartModal';

type FormData = {
  name: string;
  phone: string;
  address: string;
  addressDetails: string;
  email: string;
  paymentMethod: 'card' | 'apple' | 'google';
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDeliveryFee, getTotal, promoDiscount, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', address: '', addressDetails: '', email: '',
    paymentMethod: 'card',
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <p className="text-white text-xl font-bold mb-4">Votre panier est vide</p>
        <Link href="/menu" className="text-orange-400 font-semibold">← Voir le menu</Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: '#0A0A0A' }}>
      <Navbar />
      <CartModal />

      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/menu" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Retour
          </Link>
          <h1 className="text-white font-bold text-3xl">Finaliser la commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery info */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-bold text-lg mb-5">Informations de livraison</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Jean Dupont"
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="06 12 34 56 78"
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Adresse de livraison *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm({...form, address: e.target.value})}
                    placeholder="15 rue de la République, Paris 75001"
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Complément (optionnel)</label>
                  <input
                    type="text"
                    value={form.addressDetails}
                    onChange={e => setForm({...form, addressDetails: e.target.value})}
                    placeholder="Étage, code, bâtiment..."
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Email (optionnel)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="jean@email.com"
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 placeholder-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-bold text-lg mb-5">Moyen de paiement</h2>
              <div className="space-y-3">
                {[
                  { id: 'card' as const, label: 'Carte bancaire', icon: CreditCard },
                  { id: 'apple' as const, label: 'Apple Pay', icon: Smartphone },
                  { id: 'google' as const, label: 'Google Pay', icon: Smartphone },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setForm({...form, paymentMethod: id})}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border transition-all"
                    style={{
                      backgroundColor: form.paymentMethod === id ? 'rgba(249,115,22,0.1)' : '#222',
                      borderColor: form.paymentMethod === id ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: form.paymentMethod === id ? '#F97316' : '#2A2A2A' }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm">{label}</span>
                    <div className="ml-auto">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: form.paymentMethod === id ? '#F97316' : 'rgba(255,255,255,0.2)' }}
                      >
                        {form.paymentMethod === id && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F97316' }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 sticky top-24">
              <h2 className="text-white font-bold text-lg mb-5">Récapitulatif</h2>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#222] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-white/40 text-xs">x{item.quantity}</p>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-white/50">
                  <span>Sous-total</span>
                  <span>{getSubtotal().toFixed(2)} €</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm" style={{ color: '#22c55e' }}>
                    <span>Réduction</span>
                    <span>-{(getSubtotal() * promoDiscount).toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-white/50">
                  <span>Livraison</span>
                  <span>{getDeliveryFee() === 0 ? 'Gratuit' : `${getDeliveryFee().toFixed(2)} €`}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span style={{ color: '#F97316' }}>{getTotal().toFixed(2)} €</span>
                </div>
              </div>

              {/* Delivery time */}
              <div className="flex items-center gap-3 mt-4 p-3 bg-[#222] rounded-xl">
                <Bike size={16} style={{ color: '#F97316' }} />
                <span className="text-white/60 text-xs">Livraison estimée : 25 – 35 min</span>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-5 flex items-center justify-center gap-3 font-bold text-white py-4 rounded-2xl text-lg transition-all duration-200 active:scale-95 disabled:opacity-60"
                style={{ backgroundColor: '#F97316' }}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock size={18} />
                    Payer {getTotal().toFixed(2)} €
                  </>
                )}
              </button>

              <p className="text-center text-white/30 text-xs mt-3 flex items-center justify-center gap-1">
                <Lock size={11} /> Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
