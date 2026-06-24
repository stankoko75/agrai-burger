'use client';

import { Save, Bell, Globe, Lock, Zap } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderReady: true,
    lowStock: true,
    review: false,
    dailyReport: true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <AdminHeader title="Réglages" />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Notifications */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Bell size={18} style={{ color: '#F97316' }} /> Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: 'newOrder', label: 'Nouvelle commande', desc: 'Être notifié pour chaque nouvelle commande' },
              { key: 'orderReady', label: 'Commande prête', desc: 'Notification quand une commande est prête' },
              { key: 'lowStock', label: 'Stock faible', desc: 'Alerte quand un produit est en rupture de stock' },
              { key: 'review', label: 'Nouvel avis client', desc: 'Notification pour chaque nouvel avis' },
              { key: 'dailyReport', label: 'Rapport quotidien', desc: 'Résumé des ventes envoyé chaque matin' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/30 text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof notifications)}
                  className="relative w-12 h-6 rounded-full transition-all duration-200"
                  style={{ backgroundColor: notifications[key as keyof typeof notifications] ? '#F97316' : '#333' }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200"
                    style={{ left: notifications[key as keyof typeof notifications] ? '28px' : '4px' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Lock size={18} style={{ color: '#F97316' }} /> Clés API
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Stripe (paiements)', placeholder: 'sk_live_...' },
              { label: 'Resend (emails)', placeholder: 're_...' },
              { label: 'Google Maps API', placeholder: 'AIza...' },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="text-white/50 text-xs font-semibold block mb-2">{label}</label>
                <input
                  type="password"
                  placeholder={placeholder}
                  className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none font-mono"
                />
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4">🔒 Les clés API sont chiffrées et stockées de manière sécurisée.</p>
        </div>

        {/* Performance */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Zap size={18} style={{ color: '#F97316' }} /> Performance
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Mode maintenance', desc: 'Ferme temporairement le site aux clients' },
              { label: 'Cache produits', desc: 'Activer le cache pour charger le menu plus vite' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/30 text-xs">{desc}</p>
                </div>
                <button
                  className="relative w-12 h-6 rounded-full bg-[#333] transition-all duration-200"
                >
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => toast.success('Réglages sauvegardés !')}
          className="flex items-center gap-2 font-bold text-white px-8 py-4 rounded-xl"
          style={{ backgroundColor: '#F97316' }}
        >
          <Save size={18} /> Sauvegarder
        </button>
      </div>
    </>
  );
}
