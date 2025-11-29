import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarMenu = [
  {
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
    path: '/admin/dashboard'
  },
  {
    label: 'Data Nasabah',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
    path: '/admin/data-nasabah'
  },
  {
    label: 'Data Sampah + Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/data-sampah'
  },
  {
    label: 'Verifikasi Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/verifikasi'
  },
  {
    label: 'Transaksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
      </svg>
    ),
    path: '/admin/transaksi'
  },
  {
    label: 'Laporan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/laporan'
  },
  {
    label: 'Pengaturan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/pengaturan'
  },
];

// Sample data dengan detail lengkap untuk setiap nasabah
const sampahData = [
  { 
    id: 'WS-001', 
    nama: 'Siti Aminah', 
    foto: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=22C55E&color=fff', 
    jenis: 'Anorganik', 
    berat: '2.5 kg', 
    tanggal: '12 Jan 2025, 14:30',
    idNasabah: '#NSB-001',
    fotoSampah: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
    akurasi: '94.8%',
    objekTerdeteksi: '12 Item',
    detailSampah: [
      { jenis: 'Botol Plastik', kategori: 'PET', berat: '2.5 kg', harga: 'Rp 5.000' },
      { jenis: 'Kaleng Aluminium', kategori: 'ALU', berat: '1.8 kg', harga: 'Rp 7.200' },
      { jenis: 'Kardus', kategori: 'PAPER', berat: '3.2 kg', harga: 'Rp 6.400' }
    ],
    totalPembayaran: 'Rp 18.600'
  },
  { 
    id: 'WS-002', 
    nama: 'Budi Santoso', 
    foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=3B82F6&color=fff', 
    jenis: 'Organik', 
    berat: '3.2 kg', 
    tanggal: '12 Jan 2025, 13:15',
    idNasabah: '#NSB-002',
    fotoSampah: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
    akurasi: '91.2%',
    objekTerdeteksi: '8 Item',
    detailSampah: [
      { jenis: 'Botol Kaca', kategori: 'GLASS', berat: '2.0 kg', harga: 'Rp 4.000' },
      { jenis: 'Kertas Koran', kategori: 'PAPER', berat: '1.2 kg', harga: 'Rp 2.400' }
    ],
    totalPembayaran: 'Rp 6.400'
  },
  { 
    id: 'WS-003', 
    nama: 'Dewi Lestari', 
    foto: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=22C55E&color=fff', 
    jenis: 'Anorganik', 
    berat: '1.8 kg', 
    tanggal: '12 Jan 2025, 12:00',
    idNasabah: '#NSB-003',
    fotoSampah: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800',
    akurasi: '89.5%',
    objekTerdeteksi: '15 Item',
    detailSampah: [
      { jenis: 'Plastik HDPE', kategori: 'HDPE', berat: '1.8 kg', harga: 'Rp 3.600' }
    ],
    totalPembayaran: 'Rp 3.600'
  },
  { 
    id: 'WS-004', 
    nama: 'Ahmad Rizki', 
    foto: 'https://ui-avatars.com/api/?name=Ahmad+Rizki&background=F59E0B&color=fff', 
    jenis: 'Anorganik', 
    berat: '4.1 kg', 
    tanggal: '11 Jan 2025, 16:45',
    idNasabah: '#NSB-004',
    fotoSampah: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    akurasi: '96.3%',
    objekTerdeteksi: '20 Item',
    detailSampah: [
      { jenis: 'Botol Plastik', kategori: 'PET', berat: '3.0 kg', harga: 'Rp 6.000' },
      { jenis: 'Kaleng Aluminium', kategori: 'ALU', berat: '1.1 kg', harga: 'Rp 4.400' }
    ],
    totalPembayaran: 'Rp 10.400'
  },
  { 
    id: 'WS-005', 
    nama: 'Maya Putri', 
    foto: 'https://ui-avatars.com/api/?name=Maya+Putri&background=22C55E&color=fff', 
    jenis: 'Organik', 
    berat: '2.0 kg', 
    tanggal: '11 Jan 2025, 15:20',
    idNasabah: '#NSB-005',
    fotoSampah: 'https://images.unsplash.com/photo-1607687939738-a0442f5e4f4c?w=800',
    akurasi: '92.7%',
    objekTerdeteksi: '10 Item',
    detailSampah: [
      { jenis: 'Kardus', kategori: 'PAPER', berat: '2.0 kg', harga: 'Rp 4.000' }
    ],
    totalPembayaran: 'Rp 4.000'
  },
];

export default function DataSampah() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [jenisFilter, setJenisFilter] = useState('Semua');

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

  const getJenisStyle = (jenis) => {
    if (jenis === 'Organik') return 'bg-green-50 text-green-700 border border-green-200';
    return 'bg-blue-50 text-blue-700 border border-blue-200';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
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
        <header className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Data Sampah</h1>
              <p className="text-xs text-gray-500 mt-0.5">Mengelola jenis sampah, harga, dan stok</p>
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

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Jenis</p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Stok</p>
              <h3 className="text-2xl font-bold text-gray-900">2,847 kg</h3>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Nilai</p>
              <h3 className="text-2xl font-bold text-gray-900">Rp 8,5 Jt</h3>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Stok hari Hingga</p>
              <h3 className="text-2xl font-bold text-gray-900">Rp 3.200</h3>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Jenis Sampah Filter */}
            <select
              value={jenisFilter}
              onChange={(e) => setJenisFilter(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white cursor-pointer transition-all duration-200"
            >
              <option>Semua</option>
              <option>Organik</option>
              <option>Anorganik</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan ID atau nama maskapai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    ID Sampah
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Nama Nasabah
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Foto
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Jenis
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Berat
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Waktu
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sampahData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all duration-150">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.foto} alt={item.nama} className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-gray-900">{item.nama}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <img src={item.foto} alt="Sampah" className="w-10 h-10 rounded-lg object-cover" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold ${getJenisStyle(item.jenis)}`}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.berat}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => navigate(`/admin/detail-deteksi/${item.id}`, { state: { data: item } })}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Menampilkan 1-5 dari 120 data</p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-[13px] font-medium rounded-lg transition-colors bg-gray-100 text-gray-400 cursor-not-allowed">
                    Previous
                  </button>
                  <button className="w-9 h-9 text-[13px] font-semibold rounded-lg transition-colors bg-green-600 text-white">
                    1
                  </button>
                  <button className="w-9 h-9 text-[13px] font-semibold rounded-lg transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                    2
                  </button>
                  <button className="w-9 h-9 text-[13px] font-semibold rounded-lg transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                    3
                  </button>
                  <button className="px-4 py-2 text-[13px] font-medium rounded-lg transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-5 px-8">
          <p className="text-xs text-gray-500 text-center">
            © 2025 BANGKIT — Bank Sampah Digital. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
