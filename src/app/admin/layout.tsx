import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <AdminSidebar />
      <main style={{ marginLeft: '256px', paddingTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}
