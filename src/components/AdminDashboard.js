import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';

export default function AdminDashboard({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <Dashboard />
    </AdminLayout>
  );
}
