'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, ChevronRight, Star, CheckCircle, Bike, ShoppingBag, Shield, Moon } from 'lucide-react';
import { POPULAR_PRODUCTS } from '@/data/products';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { CartModal } from '@/components/cart/CartModal';
import { Footer } from '@/components/layout/Footer';

const REVIEWS = [
  { name: 'Yanis B.', rating: 5, text: 'Meilleurs burgers de nuit ! Livraison rapide et toujours chaud 🔥', time: 'Il y a 2h' },
  { name: 'Sarah L.', rating: 5, text: 'Top comme toujours ! Burgers incroyables 🙌', time: 'Il y a 4h' },
  { name: 'Mike D.', rating: 5, text: 'Livraison rapide et livreur sympa 👍', time: 'Il y a 5h' },
  { name: 'Nassim K.', rating: 4, text: 'Très bon, juste les frites pourraient être plus chaudes.', time: 'Il y a 6h' },
];

export default function HomePage() {
  const { addItem, openCart } = useCartStore();

  const handleQuickAdd = (product: typeof POPULAR_PRODUCTS[0]) => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      supplements: [],
    });
    toast.success(`${product.name} ajouté au panier !`);
    openCart();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <Navbar />
      <CartModal />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background image */}
        <img
          src="/images/hero.jpg"
          alt="Agraï Burger Premium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: 'rgba(249,115,22,0.3)', backgroundColor: 'rgba(249,115,22,0.1)' }}>
              <Moon size={14} style={{ color: '#F97316' }} />
              <span className="text-sm font-semibold" style={{ color: '#F97316' }}>Livraison de nuit 22H – 6H</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-white leading-none mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
              <span className="block" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1 }}>LIVRAISON</span>
              <span className="block" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1, color: '#F97316' }}>DE NUIT</span>
            </h1>

            <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed">
              Vos burgers préférés, livrés chauds chez vous.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 font-bold text-white px-8 py-4 rounded-2xl text-lg transition-all duration-200 active:scale-95 shadow-lg"
                style={{ backgroundColor: '#F97316', boxShadow: '0 0 30px rgba(249,115,22,0.3)' }}
              >
                COMMANDER MAINTENANT
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#menu-section"
                className="inline-flex items-center justify-center gap-2 font-semibold text-white px-8 py-4 rounded-2xl text-lg border border-white/20 hover:border-white/40 transition-all duration-200"
              >
                Voir le menu
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Bike, label: 'Livraison\nRapide' },
                { icon: ShoppingBag, label: 'Produits\nFrais' },
                { icon: Shield, label: 'Paiement\nSécurisé' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={20} style={{ color: '#F97316' }} />
                  <span className="text-white/60 text-xs font-semibold leading-tight whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADDRESS BAR */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-6 mb-16">
        <div className="flex items-center gap-4 bg-[#1A1A1A] border border-white/10 rounded-2xl p-4">
          <MapPin size={20} style={{ color: '#F97316' }} className="flex-shrink-0" />
          <input
            type="text"
            placeholder="Entrez votre adresse de livraison"
            className="flex-1 bg-transparent text-white/70 text-sm focus:outline-none focus:text-white placeholder-white/30"
          />
          <button
            className="flex-shrink-0 flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: '#F97316' }}
          >
            VOIR LA ZONE <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* NOS INCONTOURNABLES */}
      <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-bold text-2xl sm:text-3xl">NOS INCONTOURNABLES</h2>
          <Link href="/menu" className="flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: '#F97316' }}>
            Voir tout le menu <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {POPULAR_PRODUCTS.filter(p => p.category === 'burgers').slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden bg-[#222]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-black/60 text-white backdrop-blur-sm">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-white font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-white/40 text-xs leading-tight mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: '#F97316' }}>
                    {product.price.toFixed(2)} €
                  </span>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-200 active:scale-90"
                    style={{ backgroundColor: '#F97316' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[280px] sm:min-h-[340px] flex items-center">
          <img
            src="/images/formules-banner.jpg"
            alt="Formules Agraï Burger"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-8 sm:p-12">
            <h2 className="text-white font-bold text-3xl sm:text-5xl leading-none mb-2">
              FORMULES{' '}
              <span style={{ color: '#F97316' }}>AU CHOIX</span>
            </h2>
            <p className="text-white/60 text-lg">Burger + Boisson + Dessert</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 mt-6 font-bold px-6 py-3 rounded-xl border-2 text-white transition-all hover:bg-orange-500 hover:border-orange-500"
              style={{ borderColor: '#F97316' }}
            >
              DÉCOUVRIR LES MENUS <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-12">COMMENT ÇA MARCHE ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Line connector */}
          <div className="hidden sm:block absolute top-12 left-1/6 right-1/6 h-px border-t border-dashed border-white/20" />
          {[
            { step: 1, icon: ShoppingBag, title: 'CHOISISSEZ', desc: 'Parcourez notre menu et faites votre choix.' },
            { step: 2, icon: Bike, title: 'NOUS LIVRONS', desc: 'On prépare votre commande et on vous livre rapidement.' },
            { step: 3, icon: '🍔', title: 'RÉGALEZ-VOUS', desc: 'Dégustez vos burgers chauds et savoureux.' },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-white/5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 border-2"
                style={{ borderColor: '#F97316', color: '#F97316' }}
              >
                {step}
              </div>
              <div className="text-3xl mb-4">
                {typeof Icon === 'string' ? Icon : <Icon size={28} style={{ color: '#F97316' }} />}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-white/50 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 border border-white/5">
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
            <div className="text-center sm:text-left flex-shrink-0">
              <h2 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                ILS NOUS FONT<br />
                <span style={{ color: '#F97316' }}>CONFIANCE</span>
              </h2>
              <div className="flex items-center gap-2 mt-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={22} fill="#F97316" color="#F97316" />
                ))}
              </div>
              <p className="text-white font-bold text-3xl mt-2">4,8/5</p>
              <p className="text-white/40 text-sm">+1200 avis clients</p>
            </div>
            <div className="w-px h-24 bg-white/10 hidden sm:block" />
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REVIEWS.slice(0, 2).map((review, i) => (
                  <div key={i} className="bg-[#222] rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                        style={{ backgroundColor: '#F97316' }}
                      >
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{review.name}</p>
                        <p className="text-white/30 text-xs">{review.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={12} fill="#F97316" color="#F97316" />
                      ))}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20" id="zone">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F97316' }}>
          {[
            { icon: Moon, title: 'OUVERT TOUS LES JOURS', sub: '22H – 6H' },
            { icon: Bike, title: 'LIVRAISON RAPIDE', sub: '30 – 40 MIN' },
            { icon: Shield, title: 'PAIEMENT 100% SÉCURISÉ', sub: 'CB, Apple Pay, PayPal' },
          ].map(({ icon: Icon, title, sub }, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-6 ${i > 0 ? 'border-l border-orange-600' : ''}`}
            >
              <Icon size={28} className="text-white flex-shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-white/70 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
