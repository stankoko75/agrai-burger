'use client';

import { Save, Clock, Phone, MapPin, Instagram } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';

export default function RestaurantPage() {
  return (
    <>
      <AdminHeader title="Paramètres restaurant" />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Infos générales */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5">Informations générales</h2>
          <div className="space-y-4">
            {[
              { label: 'Nom du restaurant', defaultValue: 'Agraï Burger' },
              { label: 'Description', defaultValue: 'Vos burgers préférés, livrés chauds de nuit.', type: 'textarea' },
              { label: 'Email de contact', defaultValue: 'agrai.burger@gmail.com' },
            ].map(({ label, defaultValue, type }) => (
              <div key={label}>
                <label className="text-white/50 text-xs font-semibold block mb-2">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    defaultValue={defaultValue}
                    rows={3}
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={defaultValue}
                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Phone size={18} style={{ color: '#F97316' }} /> Contact & Réseaux
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Téléphone', defaultValue: '06 21 62 50 50', icon: Phone },
              { label: 'Snapchat', defaultValue: '@agrai_burger', icon: Instagram },
              { label: 'Instagram', defaultValue: '@agrai_burger', icon: Instagram },
              { label: 'TikTok', defaultValue: '@agrai_burger', icon: Instagram },
            ].map(({ label, defaultValue }) => (
              <div key={label}>
                <label className="text-white/50 text-xs font-semibold block mb-2">{label}</label>
                <input
                  type="text"
                  defaultValue={defaultValue}
                  className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Clock size={18} style={{ color: '#F97316' }} /> Horaires de livraison
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs font-semibold block mb-2">Ouverture</label>
              <input type="time" defaultValue="22:00" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-semibold block mb-2">Fermeture</label>
              <input type="time" defaultValue="06:00" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none" />
            </div>
          </div>
          <p className="text-white/30 text-xs mt-3">⚠️ Les commandes seront automatiquement refusées hors de ces horaires.</p>
        </div>

        <button
          onClick={() => toast.success('Paramètres sauvegardés !')}
          className="flex items-center gap-2 font-bold text-white px-8 py-4 rounded-xl"
          style={{ backgroundColor: '#F97316' }}
        >
          <Save size={18} /> Sauvegarder les modifications
        </button>
      </div>
    </>
  );
}
