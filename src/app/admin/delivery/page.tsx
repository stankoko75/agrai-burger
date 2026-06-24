'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash2, Bike } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';

const ZONES = [
  { id: '1', name: 'Zone 1 – Centre', radius: '0-3 km', fee: 2.50, time: '20-30 min', active: true },
  { id: '2', name: 'Zone 2 – Proche', radius: '3-7 km', fee: 3.50, time: '30-45 min', active: true },
  { id: '3', name: 'Zone 3 – Étendue', radius: '7-12 km', fee: 5.00, time: '45-60 min', active: false },
];

export default function DeliveryPage() {
  const [zones, setZones] = useState(ZONES);
  const [minOrder, setMinOrder] = useState('15');
  const [freeDelivery, setFreeDelivery] = useState('25');

  return (
    <>
      <AdminHeader title="Livraison" />
      <div className="p-6 space-y-6">
        {/* General settings */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Bike size={20} style={{ color: '#F97316' }} /> Paramètres généraux
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs font-semibold block mb-2">Commande minimum (€)</label>
              <input
                type="number"
                value={minOrder}
                onChange={e => setMinOrder(e.target.value)}
                className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-semibold block mb-2">Livraison gratuite à partir de (€)</label>
              <input
                type="number"
                value={freeDelivery}
                onChange={e => setFreeDelivery(e.target.value)}
                className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => toast.success('Paramètres sauvegardés !')}
            className="mt-4 px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ backgroundColor: '#F97316' }}
          >
            Sauvegarder
          </button>
        </div>

        {/* Delivery zones */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <MapPin size={20} style={{ color: '#F97316' }} /> Zones de livraison
            </h2>
            <button
              onClick={() => toast.success('Ajouter une zone bientôt disponible')}
              className="flex items-center gap-2 font-bold text-white px-4 py-2 rounded-xl text-sm"
              style={{ backgroundColor: '#F97316' }}
            >
              <Plus size={16} /> Ajouter une zone
            </button>
          </div>

          <div className="space-y-3">
            {zones.map(zone => (
              <div
                key={zone.id}
                className="flex items-center gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: '#222', borderColor: zone.active ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: zone.active ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)' }}
                >
                  <MapPin size={20} style={{ color: zone.active ? '#F97316' : 'rgba(255,255,255,0.2)' }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-bold">{zone.name}</p>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: zone.active ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                        color: zone.active ? '#22C55E' : '#EF4444',
                      }}
                    >
                      {zone.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-6 text-xs text-white/40">
                    <span>📍 {zone.radius}</span>
                    <span>💶 {zone.fee.toFixed(2)} €</span>
                    <span>⏱ {zone.time}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setZones(prev => prev.map(z => z.id === zone.id ? { ...z, active: !z.active } : z));
                      toast.success(`Zone ${zone.active ? 'désactivée' : 'activée'}`);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:bg-white/5 text-white/60 transition-colors"
                  >
                    {zone.active ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => { setZones(prev => prev.filter(z => z.id !== zone.id)); toast.success('Zone supprimée'); }}
                    className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center hover:bg-red-500/20"
                  >
                    <Trash2 size={15} className="text-white/40" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
