import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const sidebarMenu = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
  },
  {
    label: 'Data Nasabah',
    path: '/admin/data-nasabah',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    label: 'Data Sampah + Deteksi',
    path: '/admin/data-sampah',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Verifikasi Deteksi',
    path: '/admin/verifikasi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Transaksi',
    path: '/admin/transaksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
      </svg>
    ),
  },
  {
    label: 'Laporan',
    path: '/admin/laporan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Pengaturan',
    path: '/admin/pengaturan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const statCards = [
  {
    title: 'Total Nasabah',
    value: '1,247',
    subtitle: '+12% dari bulan lalu',
    trend: 'up',
    icon: '📈',
  },
  {
    title: 'Total Setoran',
    value: 'Rp 45.2M',
    subtitle: '+8.5% dari bulan lalu',
    trend: 'up',
  },
  {
    title: 'Total Penarikan',
    value: 'Rp 32.1M',
    subtitle: '-3.2% dari bulan lalu',
    trend: 'down',
  },
  {
    title: 'Butuh Verifikasi',
    value: '23',
    subtitle: 'data menunggu verifikasi',
    trend: 'warning',
  },
];

const pieData = [
  { name: 'Organik', value: 59.7, color: '#22C55E' },
  { name: 'Anorganik', value: 40.3, color: '#3B82F6' },
];

const transactions = [
  { name: 'Sari Dewi', type: 'Setoran', amount: 'Rp 125,000', status: 'Selesai', avatar: 'https://ui-avatars.com/api/?name=Sari+Dewi&background=22C55E&color=fff' },
  { name: 'Budi Santoso', type: 'Penarikan', amount: 'Rp 75,000', status: 'Proses', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=3B82F6&color=fff' },
  { name: 'Maya Putri', type: 'Setoran', amount: 'Rp 200,000', status: 'Selesai', avatar: 'https://ui-avatars.com/api/?name=Maya+Putri&background=22C55E&color=fff' },
  { name: 'Agus Rahman', type: 'Setoran', amount: 'Rp 90,000', status: 'Proses', avatar: 'https://ui-avatars.com/api/?name=Agus+Rahman&background=3B82F6&color=fff' },
  { name: 'Lisa Handayani', type: 'Penarikan', amount: 'Rp 150,000', status: 'Selesai', avatar: 'https://ui-avatars.com/api/?name=Lisa+Handayani&background=22C55E&color=fff' },
];

function StatCard({ stat }) {
  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-orange-600';
  };

  const getTrendBg = (trend) => {
    if (trend === 'up') return 'bg-green-50';
    if (trend === 'down') return 'bg-red-50';
    return 'bg-orange-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-lg ${getTrendBg(stat.trend)} flex items-center justify-center`}>
          {stat.icon && <span className="text-xl">{stat.icon}</span>}
          {stat.trend === 'up' && !stat.icon && <span className="text-green-600 text-xl">↗</span>}
          {stat.trend === 'down' && !stat.icon && <span className="text-red-600 text-xl">↘</span>}
          {stat.trend === 'warning' && !stat.icon && <span className="text-orange-600 text-xl">⚠</span>}
        </div>
      </div>
      <p className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
        {stat.subtitle}
      </p>
    </div>
  );
}



export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = (index, path) => {
    setActiveMenu(index);
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login-admin');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-10 py-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-gray-800 text-xl">BANGKIT</div>
                <div className="text-[10px] text-gray-500">Bank Sampah Digital</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="px-10 pb-3 border-b-2 border-gray-200"></div>

          {/* Menu */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarMenu.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(i, item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-all text-left text-sm
                  ${activeMenu === i 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-3">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all text-sm border border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-500 mt-0.5">Selamat datang di panel admin BANGKIT</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <button className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Mail Icon */}
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Admin User Profile */}
              <div className="flex items-center gap-2.5">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=22C55E&color=fff&size=36" 
                  alt="Admin User" 
                  className="w-9 h-9 rounded-full"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-[11px] text-gray-500">admin@bangkit.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>

          {/* Charts and Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribusi Jenis Sampah</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-8 mt-6">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></span>
                    <span className="text-sm font-medium text-gray-700">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaksi Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Nasabah</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Jenis</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <img src={tx.avatar} alt={tx.name} className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium text-gray-900">{tx.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{tx.type}</td>
                        <td className="py-3 px-2 text-sm font-semibold text-gray-900">{tx.amount}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                            ${tx.status === 'Selesai' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-5 px-8">
          <p className="text-sm text-gray-500 text-center">
            © 2025 BANGKIT – Bank Sampah Digital. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}





