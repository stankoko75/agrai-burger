'use client';

import Link from 'next/link';
import { CheckCircle, Bike, Clock, Phone } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderNumber = `#${Math.floor(1500 + Math.random() * 100)}`;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="w-full max-w-md text-center">
        {/* Success icon */}
        <div className="relative mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}
          >
            <CheckCircle size={48} style={{ color: '#F97316' }} />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20 mx-auto w-24 h-24"
            style={{ backgroundColor: '#F97316' }}
          />
        </div>

        <h1 className="text-white font-bold text-3xl mb-2">Commande confirmée !</h1>
        <p className="text-white/50 mb-2">Commande {orderNumber}</p>
        <p className="text-white/40 text-sm mb-10">
          Votre commande a bien été reçue. Vous recevrez une confirmation par SMS.
        </p>

        {/* Tracking steps */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 mb-6 text-left">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F97316' }}>
              <CheckCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Commande reçue</p>
              <p className="text-white/40 text-xs">Il y a quelques secondes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-5 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center">
              <Clock size={18} className="text-white/50" />
            </div>
            <div>
              <p className="text-white/70 font-semibold text-sm">En préparation</p>
              <p className="text-white/30 text-xs">En cours...</p>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-30">
            <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center">
              <Bike size={18} className="text-white/50" />
            </div>
            <div>
              <p className="text-white/70 font-semibold text-sm">En livraison</p>
              <p className="text-white/30 text-xs">Estimé : 25 – 35 min</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8">
          <Phone size={14} />
          <span>Un problème ? Appelez le 06 21 62 50 50</span>
        </div>

        <Link
          href="/"
          className="block w-full font-bold text-white py-4 rounded-2xl text-lg transition-all"
          style={{ backgroundColor: '#F97316' }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
