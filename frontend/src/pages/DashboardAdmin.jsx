import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const sidebarMenu = [
  {
    label: 'Dashboard',
    path: '/dashboard-admin',
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
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: 'Verifikasi Deteksi',
    path: '/admin/verifikasi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Transaksi',
    path: '/admin/transaksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
      </svg>
    ),
  },
  {
    label: 'Laporan',
    path: '/admin/laporan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
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
  const [newUserNotifications, setNewUserNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [lastCheckedTime, setLastCheckedTime] = useState(() => {
    const stored = localStorage.getItem('lastUserCheckTime');
    return stored ? parseInt(stored) : Date.now() - 60000; // Default: check last 1 minute
  });

  // Real-time stats
  const [stats, setStats] = useState({
    totalNasabah: 0,
    totalSetoran: 0,
    totalPenarikan: 0,
    pendingVerifikasi: 0
  });

  const [pieData, setPieData] = useState([
    { name: 'Organik', value: 0, color: '#22C55E' },
    { name: 'Anorganik', value: 0, color: '#3B82F6' },
  ]);

  const [recentTransactions, setRecentTransactions] = useState([]);

  // Load real-time data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // 1. Load Total Nasabah dari API
        const response = await axios.get('http://127.0.0.1:8000/api/users/all');
        const totalNasabah = response.data.success 
          ? response.data.users.filter(u => u.role !== 'admin').length 
          : 0;

        // 2. Load Verifikasi Data
        const verifikasiData = JSON.parse(localStorage.getItem('verifikasiList') || '[]');
        const approvedItems = verifikasiData.filter(item => item.status === 'approved');
        const pendingItems = verifikasiData.filter(item => item.status === 'pending');

        // 3. Load Penarikan Data
        const penarikanData = JSON.parse(localStorage.getItem('penarikanList') || '[]');

        // 4. Calculate Total Setoran (dari approved verifikasi)
        const totalSetoran = approvedItems.reduce((sum, item) => sum + (item.totalPembayaran || 0), 0);

        // 5. Calculate Total Penarikan
        const totalPenarikan = penarikanData.reduce((sum, item) => sum + (item.jumlah || 0), 0);

        // 6. Calculate Pie Chart Data (Organik vs Anorganik)
        const organikCount = approvedItems.filter(item => item.prediksiAI === 'Organik').length;
        const anorganikCount = approvedItems.filter(item => item.prediksiAI === 'Anorganik').length;
        const total = organikCount + anorganikCount;

        if (total > 0) {
          setPieData([
            { name: 'Organik', value: ((organikCount / total) * 100).toFixed(1), color: '#22C55E' },
            { name: 'Anorganik', value: ((anorganikCount / total) * 100).toFixed(1), color: '#3B82F6' },
          ]);
        }

        // 7. Get Recent Transactions (5 terbaru)
        const allTransactions = [
          ...approvedItems.map(item => ({
            nama: item.nama,
            type: 'Setoran',
            amount: item.totalPembayaran || 0,
            status: 'Selesai',
            avatar: item.foto || `https://ui-avatars.com/api/?name=${item.nama}&background=22C55E&color=fff`,
            timestamp: new Date(item.approvedAt || item.created_at).getTime()
          })),
          ...penarikanData.map(item => ({
            nama: item.nama,
            type: 'Penarikan',
            amount: item.jumlah || 0,
            status: item.status || 'Selesai',
            avatar: item.foto || `https://ui-avatars.com/api/?name=${item.nama}&background=EF4444&color=fff`,
            timestamp: new Date(item.tanggal || item.created_at).getTime()
          }))
        ];

        // Sort by timestamp descending
        allTransactions.sort((a, b) => b.timestamp - a.timestamp);
        setRecentTransactions(allTransactions.slice(0, 5));

        // Update stats
        setStats({
          totalNasabah,
          totalSetoran,
          totalPenarikan,
          pendingVerifikasi: pendingItems.length
        });

        console.log('📊 Dashboard data updated:', {
          totalNasabah,
          totalSetoran,
          totalPenarikan,
          pendingVerifikasi: pendingItems.length
        });

      } catch (error) {
        console.error('❌ Error loading dashboard data:', error);
      }
    };

    // Load immediately
    loadDashboardData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadDashboardData, 10000);

    return () => clearInterval(interval);
  }, []);

  // Check for new users every 5 seconds
  useEffect(() => {
    const checkNewUsers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/recent?since=${lastCheckedTime}`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.newUsers && data.newUsers.length > 0) {
            console.log('New users found:', data.newUsers);
            // Add new users to notifications
            setNewUserNotifications(prev => [...data.newUsers, ...prev].slice(0, 10));
            setShowNotification(true);
            
            // Auto hide notification after 8 seconds
            setTimeout(() => setShowNotification(false), 8000);
            
            // Update last checked time
            const newTime = Date.now();
            setLastCheckedTime(newTime);
            localStorage.setItem('lastUserCheckTime', newTime.toString());
          }
        }
      } catch (error) {
        console.error('Error checking new users:', error);
      }
    };

    // Check immediately on mount
    checkNewUsers();
    
    // Then check every 5 seconds
    const interval = setInterval(checkNewUsers, 5000);
    
    return () => clearInterval(interval);
  }, [lastCheckedTime]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Dynamic stat cards with real data
  const statCards = [
    {
      title: 'Total Nasabah',
      value: stats.totalNasabah.toString(),
      subtitle: 'Nasabah terdaftar',
      trend: 'up',
      icon: '👥',
    },
    {
      title: 'Total Setoran',
      value: formatRupiah(stats.totalSetoran),
      subtitle: 'Dari verifikasi disetujui',
      trend: 'up',
    },
    {
      title: 'Total Penarikan',
      value: formatRupiah(stats.totalPenarikan),
      subtitle: 'Total dicairkan nasabah',
      trend: stats.totalPenarikan > 0 ? 'down' : 'up',
    },
    {
      title: 'Butuh Verifikasi',
      value: stats.pendingVerifikasi.toString(),
      subtitle: 'data menunggu verifikasi',
      trend: 'warning',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login-admin');
  };

  const handleViewNewUsers = () => {
    setShowNotification(false);
    navigate('/admin/data-nasabah');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Notification Popup */}
      {showNotification && newUserNotifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white rounded-lg shadow-2xl border border-green-200 p-4 w-80">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Nasabah Baru Mendaftar!</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {newUserNotifications[0].name} baru saja mendaftar
                </p>
                <button 
                  onClick={handleViewNewUsers}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Lihat Detail →
                </button>
              </div>
              <button 
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
                onClick={() => {
                  console.log('Navigating to:', item.path, 'Label:', item.label);
                  setActiveMenu(i);
                  navigate(item.path);
                }}
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
          <div className="p-3 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <header className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-xs text-gray-500 mt-0.5">Selamat datang di panel admin BANGKIT</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <button 
                onClick={() => navigate('/admin/notifications')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {newUserNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {newUserNotifications.length}
                  </span>
                )}
              </button>
              
              {/* Mail Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              
              {/* Admin Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                  AU
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@bangkit.com</div>
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
                    <span className="text-sm font-medium text-gray-700">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaksi Terbaru</h3>
              <div className="overflow-x-auto">
                {recentTransactions.length > 0 ? (
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
                      {recentTransactions.map((tx, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <img src={tx.avatar} alt={tx.nama} className="w-8 h-8 rounded-full" />
                              <span className="text-sm font-medium text-gray-900">{tx.nama}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`text-sm font-medium ${tx.type === 'Setoran' ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                            {formatRupiah(tx.amount)}
                          </td>
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
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">Belum ada transaksi</p>
                    <p className="text-gray-400 text-sm mt-1">Transaksi akan muncul setelah ada setoran atau penarikan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-5 px-8">
          <p className="text-sm text-gray-500 text-center font-medium">
            © 2025 BANGKIT – Bank Sampah Digital. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}





