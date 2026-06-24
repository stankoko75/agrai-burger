'use client';

import { Plus, Edit, Trash2, Shield, User } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import toast from 'react-hot-toast';

const USERS = [
  { id: '1', name: 'Agraï Admin', email: 'admin@agrai-burger.fr', role: 'Propriétaire', lastLogin: "Il y a 5 min", avatar: 'AA' },
  { id: '2', name: 'Livreur 1', email: 'livreur1@agrai-burger.fr', role: 'Livreur', lastLogin: 'Il y a 22 min', avatar: 'L1' },
  { id: '3', name: 'Caisse 1', email: 'caisse@agrai-burger.fr', role: 'Caissier', lastLogin: 'Il y a 1h', avatar: 'C1' },
];

const ROLE_COLORS: Record<string, string> = {
  'Propriétaire': '#F97316',
  'Livreur': '#3B82F6',
  'Caissier': '#22C55E',
};

export default function UsersPage() {
  return (
    <>
      <AdminHeader title="Utilisateurs" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/40 text-sm">{USERS.length} utilisateurs</p>
          <button
            onClick={() => toast.success('Invitation envoyée !')}
            className="flex items-center gap-2 font-bold text-white px-5 py-3 rounded-xl"
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus size={18} /> Inviter un utilisateur
          </button>
        </div>

        <div className="space-y-3">
          {USERS.map(user => (
            <div key={user.id} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                style={{ backgroundColor: ROLE_COLORS[user.role] || '#333' }}
              >
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-white font-bold">{user.name}</p>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${ROLE_COLORS[user.role]}20`, color: ROLE_COLORS[user.role] }}
                  >
                    {user.role}
                  </span>
                  {user.role === 'Propriétaire' && <Shield size={14} style={{ color: '#F97316' }} />}
                </div>
                <p className="text-white/40 text-sm">{user.email}</p>
                <p className="text-white/20 text-xs mt-0.5">Connecté {user.lastLogin}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-[#2A2A2A]">
                  <Edit size={15} className="text-white/60" />
                </button>
                {user.role !== 'Propriétaire' && (
                  <button className="w-9 h-9 rounded-xl bg-[#222] flex items-center justify-center hover:bg-red-500/20">
                    <Trash2 size={15} className="text-white/60" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
