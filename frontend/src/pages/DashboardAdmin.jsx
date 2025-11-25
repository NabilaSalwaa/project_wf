
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const sidebarMenu = [
  {
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#22C55E" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-7 4h14" />
      </svg>
    ),
  },
  {
    label: 'Data Nasabah',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a4 4 0 018 0v2" />
      </svg>
    ),
  },
  {
    label: 'Data Sampah + Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 15h8" />
      </svg>
    ),
  },
  {
    label: 'Verifikasi Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    label: 'Transaksi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" />
      </svg>
    ),
  },
  {
    label: 'Laporan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h8" />
      </svg>
    ),
  },
  {
    label: 'Pengaturan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#1E293B" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

const statCards = [
  {
    title: 'Total Nasabah',
    value: '1,247',
    subtitle: '+12% dari bulan lalu',
    color: 'text-green-600',
    badge: 'bg-green-100 text-green-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#22C55E" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a4 4 0 018 0v2" />
      </svg>
    ),
  },
  {
    title: 'Total Setoran',
    value: 'Rp 45.2M',
    subtitle: '+8.5% dari bulan lalu',
    color: 'text-green-600',
    badge: 'bg-green-100 text-green-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#22C55E" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Total Penarikan',
    value: 'Rp 32.1M',
    subtitle: '-3.2% dari bulan lalu',
    color: 'text-red-600',
    badge: 'bg-red-100 text-red-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Butuh Verifikasi',
    value: '23',
    subtitle: 'data menunggu verifikasi',
    color: 'text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#F59E42" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#F59E42" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m0-4h.01" />
      </svg>
    ),
  },
];

const pieData = [
  { name: 'Organik', value: 59.7, color: '#22C55E' },
  { name: 'Anorganik', value: 40.3, color: '#3B82F6' },
];

const transactions = [
  { name: 'Sari Dewi', type: 'Setoran', amount: 125000, status: 'Selesai', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Budi Santoso', type: 'Penarikan', amount: 75000, status: 'Proses', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Maya Putri', type: 'Setoran', amount: 200000, status: 'Selesai', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { name: 'Agus Rahman', type: 'Setoran', amount: 90000, status: 'Proses', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { name: 'Lisa Handayani', type: 'Penarikan', amount: 150000, status: 'Selesai', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

function formatRupiah(num) {
  if (!num) return '-';
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        {stat.icon}
        <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
      </div>
      <div className="font-semibold text-gray-700">{stat.title}</div>
      <div className={`text-xs font-medium ${stat.badge} px-2 py-1 rounded-full inline-block mt-1`}>{stat.subtitle}</div>
    </div>
  );
}



export default function DashboardAdmin() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-white border-r flex flex-col justify-between relative">
          {/* Tombol X untuk close sidebar di mobile */}
          <button
            className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <div className="p-6 flex items-center gap-3 border-b">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
                  <rect x="4" y="7" width="16" height="10" rx="2" fill="#fff" />
                  <rect x="9" y="10" width="6" height="5" rx="1" fill="#22C55E" />
                  <rect x="10" y="11" width="4" height="3" rx="0.5" fill="#fff" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg text-slate-800">BANGKIT</div>
                <div className="text-xs text-gray-400">Bank Sampah Digital</div>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarMenu.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setActiveMenu(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all duration-150 text-left
                    ${activeMenu === i ? 'bg-green-600 text-white' : 'text-[#1E293B]'}
                    ${activeMenu !== i ? 'hover:bg-[#D1FADF] hover:text-green-600' : ''}`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {React.cloneElement(item.icon, {
                      stroke: activeMenu === i ? '#fff' : '#1E293B',
                      fill: 'none',
                    })}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          {/* Tombol Keluar selalu di bawah sidebar */}
          <div className="p-4 mt-auto">
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </aside>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Tombol buka sidebar di mobile */}
        {!sidebarOpen && (
          <button
            className="mb-4 md:hidden text-gray-400 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka Sidebar"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Dashboard Admin</h1>
            <div className="text-base text-gray-500 font-medium">Selamat datang di panel admin BANGKIT</div>
          </div>
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="Admin" className="w-12 h-12 rounded-full border-2 border-green-200" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg text-gray-800 leading-tight">Admin User</span>
              <span className="text-sm text-gray-500 font-medium">admin@iqbankku.com</span>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col justify-between min-h-[340px]">
            <div className="font-semibold mb-4">Distribusi Jenis Sampah</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  labelLine={false}
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{background: d.color}}></span>
                  <span className="text-sm font-bold" style={{color: d.color}}>{d.name}</span>
                  <span className="text-sm font-bold" style={{color: d.color}}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Transaksi Terbaru */}
          <div className="bg-white rounded-xl border shadow-sm p-6 min-h-[340px]">
            <div className="font-semibold mb-4">Transaksi Terbaru</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="text-left py-2 font-medium">Nasabah</th>
                  <th className="text-left py-2 font-medium">Jenis</th>
                  <th className="text-left py-2 font-medium">Jumlah</th>
                  <th className="text-left py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition-all">
                    <td className="py-2 flex items-center gap-2">
                      <img src={tx.avatar} alt={tx.name} className="w-7 h-7 rounded-full border-2 border-gray-200" />
                      <span className="font-medium text-gray-700">{tx.name}</span>
                    </td>
                    <td className="py-2">{tx.type}</td>
                    <td className="py-2 font-semibold">{formatRupiah(tx.amount)}</td>
                    <td className="py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${tx.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="w-full bg-white border-t py-6 text-xs text-gray-400 flex items-center justify-center mt-auto">
          <span>© 2025 BANGKIT – Bank Sampah Digital. All rights reserved.</span>
        </footer>
      </main>
    </div>
  );
}





