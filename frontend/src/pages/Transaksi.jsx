import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiFilter } from 'react-icons/fi';

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

// Data transaksi dummy
const initialTransaksiData = [
  {
    id: 'NSB001',
    nama: 'Siti Rahayu',
    idNasabah: 'ID-NSB001',
    foto: 'https://ui-avatars.com/api/?name=Siti+Rahayu&background=22C55E&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 25000,
    beratSampah: '2.5 kg',
    metode: 'AI',
    tanggal: '15 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB002',
    nama: 'Ahmad Budiono',
    idNasabah: 'ID-NSB002',
    foto: 'https://ui-avatars.com/api/?name=Ahmad+Budiono&background=EF4444&color=fff',
    jenisTransaksi: 'Penarikan',
    jumlah: 50000,
    beratSampah: '-',
    metode: 'AI',
    tanggal: '14 Des 2025',
    status: 'Proses',
    aksi: 'Detail'
  },
  {
    id: 'NSB003',
    nama: 'Maya Sari',
    idNasabah: 'ID-NSB003',
    foto: 'https://ui-avatars.com/api/?name=Maya+Sari&background=3B82F6&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 15000,
    beratSampah: '1.5 kg',
    metode: 'AI',
    tanggal: '13 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB004',
    nama: 'Budi Santoso',
    idNasabah: 'ID-NSB004',
    foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=8B5CF6&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 32000,
    beratSampah: '3.2 kg',
    metode: 'AI',
    tanggal: '13 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB005',
    nama: 'Dewi Lestari',
    idNasabah: 'ID-NSB005',
    foto: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=F59E0B&color=fff',
    jenisTransaksi: 'Penarikan',
    jumlah: 75000,
    beratSampah: '-',
    metode: 'AI',
    tanggal: '12 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB006',
    nama: 'Andi Wijaya',
    idNasabah: 'ID-NSB006',
    foto: 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=EC4899&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 18500,
    beratSampah: '1.8 kg',
    metode: 'AI',
    tanggal: '12 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB007',
    nama: 'Rina Marlina',
    idNasabah: 'ID-NSB007',
    foto: 'https://ui-avatars.com/api/?name=Rina+Marlina&background=10B981&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 28000,
    beratSampah: '2.8 kg',
    metode: 'AI',
    tanggal: '11 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB008',
    nama: 'Joko Susilo',
    idNasabah: 'ID-NSB008',
    foto: 'https://ui-avatars.com/api/?name=Joko+Susilo&background=6366F1&color=fff',
    jenisTransaksi: 'Penarikan',
    jumlah: 100000,
    beratSampah: '-',
    metode: 'AI',
    tanggal: '10 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB009',
    nama: 'Sri Wahyuni',
    idNasabah: 'ID-NSB009',
    foto: 'https://ui-avatars.com/api/?name=Sri+Wahyuni&background=F97316&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 22000,
    beratSampah: '2.2 kg',
    metode: 'AI',
    tanggal: '10 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  },
  {
    id: 'NSB010',
    nama: 'Hadi Purnomo',
    idNasabah: 'ID-NSB010',
    foto: 'https://ui-avatars.com/api/?name=Hadi+Purnomo&background=14B8A6&color=fff',
    jenisTransaksi: 'Setoran',
    jumlah: 19500,
    beratSampah: '1.9 kg',
    metode: 'AI',
    tanggal: '09 Des 2025',
    status: 'Selesai',
    aksi: 'Detail'
  }
];

export default function Transaksi() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(4);
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [transaksiData, setTransaksiData] = useState(initialTransaksiData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('tanggal');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const itemsPerPage = 10;

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

  const handleDetailClick = (transaksi) => {
    setSelectedTransaksi(transaksi);
    setShowDetailModal(true);
  };

  // Handle Print Struk
  const handlePrintStruk = () => {
    const printWindow = window.open('', '_blank');
    const struk = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Struk Transaksi - ${selectedTransaksi.idNasabah}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Courier New', monospace; 
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
          }
          .struk { 
            border: 2px dashed #333; 
            padding: 20px;
            background: white;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px dashed #333; 
            padding-bottom: 15px;
            margin-bottom: 15px;
          }
          .logo { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 5px;
          }
          .subtitle { 
            font-size: 12px; 
            color: #666;
          }
          .row { 
            display: flex; 
            justify-content: space-between; 
            margin: 8px 0;
            font-size: 14px;
          }
          .label { 
            font-weight: bold; 
          }
          .value { 
            text-align: right; 
          }
          .divider { 
            border-top: 1px dashed #999; 
            margin: 15px 0; 
          }
          .total { 
            font-size: 18px; 
            font-weight: bold; 
            margin-top: 10px;
          }
          .footer { 
            text-align: center; 
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px dashed #333;
            font-size: 12px;
          }
          .thank-you { 
            margin-top: 10px;
            font-weight: bold;
          }
          @media print {
            body { padding: 0; }
            .struk { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="struk">
          <div class="header">
            <div class="logo">BANGKIT</div>
            <div class="subtitle">Bank Sampah Digital</div>
            <div class="subtitle">Jl. Raya Bangkit No. 123, Jakarta</div>
            <div class="subtitle">Telp: (021) 1234-5678</div>
          </div>
          
          <div class="row">
            <span class="label">No. Transaksi:</span>
            <span class="value">${selectedTransaksi.id}</span>
          </div>
          <div class="row">
            <span class="label">Tanggal:</span>
            <span class="value">${selectedTransaksi.tanggal}</span>
          </div>
          <div class="row">
            <span class="label">Waktu:</span>
            <span class="value">${new Date().toLocaleTimeString('id-ID')}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row">
            <span class="label">Nama Nasabah:</span>
          </div>
          <div class="row">
            <span class="value">${selectedTransaksi.nama}</span>
          </div>
          <div class="row">
            <span class="label">ID Nasabah:</span>
            <span class="value">${selectedTransaksi.idNasabah}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row">
            <span class="label">Jenis Transaksi:</span>
            <span class="value">${selectedTransaksi.jenisTransaksi}</span>
          </div>
          <div class="row">
            <span class="label">Berat Sampah:</span>
            <span class="value">${selectedTransaksi.beratSampah}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row total">
            <span class="label">TOTAL:</span>
            <span class="value">Rp ${selectedTransaksi.jumlah.toLocaleString('id-ID')}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="row">
            <span class="label">Status:</span>
            <span class="value">${selectedTransaksi.status}</span>
          </div>
          
          <div class="footer">
            <div>Terima kasih telah berkontribusi</div>
            <div>untuk lingkungan yang lebih bersih!</div>
            <div class="thank-you">~ BANGKIT ~</div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(struk);
    printWindow.document.close();
  };

  // Sorting function
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Filter berdasarkan tab, search, dan status
  const filteredData = transaksiData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.idNasabah.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === 'Semua' || item.jenisTransaksi === activeTab;
    const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;
    
    return matchSearch && matchTab && matchStatus;
  }).sort((a, b) => {
    let aVal, bVal;
    
    if (sortBy === 'nama') {
      aVal = a.nama.toLowerCase();
      bVal = b.nama.toLowerCase();
    } else if (sortBy === 'jumlah') {
      aVal = a.jumlah;
      bVal = b.jumlah;
    } else if (sortBy === 'tanggal') {
      aVal = new Date(a.tanggal.split(' ').reverse().join(' '));
      bVal = new Date(b.tanggal.split(' ').reverse().join(' '));
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle Export
  const handleExport = () => {
    const csvContent = [
      ['Nama', 'ID Nasabah', 'Jenis Transaksi', 'Jumlah', 'Berat Sampah', 'Tanggal', 'Status'],
      ...filteredData.map(item => [
        item.nama,
        item.idNasabah,
        item.jenisTransaksi,
        item.jumlah,
        item.beratSampah,
        item.tanggal,
        item.status
      ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transaksi_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <h1 className="text-2xl font-bold text-gray-900">Kelola Transaksi</h1>
              <p className="text-xs text-gray-500 mt-0.5">Kelola semua transaksi setoran dan penarikan nasabah</p>
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
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-200">
              {['Semua', 'Setoran', 'Penarikan'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-all relative ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 animate-slideIn"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Transaksi</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{filteredData.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Setoran</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{filteredData.filter(t => t.jenisTransaksi === 'Setoran').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Penarikan</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{filteredData.filter(t => t.jenisTransaksi === 'Penarikan').length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" transform="rotate(180 10 10)" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Nilai</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">Rp {(filteredData.reduce((sum, t) => sum + t.jumlah, 0) / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari nama nasabah..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div className="flex gap-3">
              {/* Filter Button */}
              <button 
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 relative"
              >
                <FiFilter className="w-4 h-4" />
                Filter
                {filterStatus !== 'Semua' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>

              {/* Export Button */}
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      onClick={() => handleSort('nama')}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        Nama Nasabah
                        {sortBy === 'nama' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Jenis Transaksi
                    </th>
                    <th 
                      onClick={() => handleSort('jumlah')}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        Jumlah
                        {sortBy === 'jumlah' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Berat Sampah
                    </th>
                    <th 
                      onClick={() => handleSort('tanggal')}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        Tanggal
                        {sortBy === 'tanggal' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200 hover:shadow-sm">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={item.foto} alt={item.nama} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.nama}</p>
                              <p className="text-xs text-gray-500">{item.idNasabah}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.jenisTransaksi === 'Setoran'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {item.jenisTransaksi === 'Setoran' ? '↑' : '↓'} {item.jenisTransaksi}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          Rp {item.jumlah.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.beratSampah}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.tanggal}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'Selesai'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDetailClick(item)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-gray-500 text-sm font-medium">Tidak ada data transaksi</p>
                          <p className="text-gray-400 text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <p className="text-sm text-gray-600">
                  Menampilkan hasil <span className="font-semibold">{startIndex + 1}</span> dari <span className="font-semibold">{itemsPerPage}</span> sampai <span className="font-semibold">{Math.min(endIndex, filteredData.length)}</span>
                </p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="text-gray-400 px-1">...</span>;
                    }
                    return null;
                  })}
                  
                  <button 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Filter Transaksi</h3>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Filter Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status Transaksi</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Proses">Proses</option>
                  </select>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button 
                  onClick={() => {
                    setFilterStatus('Semua');
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Reset Filter
                </button>
                <button 
                  onClick={() => {
                    setShowFilterModal(false);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedTransaksi && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all animate-slideUp max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-900">Detail Transaksi</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Informasi Nasabah */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Informasi Nasabah
                  </h4>
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedTransaksi.foto} 
                      alt={selectedTransaksi.nama} 
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="text-lg font-bold text-gray-900">{selectedTransaksi.nama}</p>
                      <p className="text-sm text-gray-600">{selectedTransaksi.idNasabah}</p>
                    </div>
                  </div>
                </div>

                {/* Detail Transaksi */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Detail Transaksi
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">Jenis Transaksi</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        selectedTransaksi.jenisTransaksi === 'Setoran'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedTransaksi.jenisTransaksi === 'Setoran' ? '↑' : '↓'} {selectedTransaksi.jenisTransaksi}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">Jumlah</p>
                      <p className="text-lg font-bold text-gray-900">Rp {selectedTransaksi.jumlah.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">Berat Sampah</p>
                      <p className="text-lg font-bold text-gray-900">{selectedTransaksi.beratSampah}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">Tanggal</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedTransaksi.tanggal}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">Status</p>
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-bold ${
                        selectedTransaksi.status === 'Selesai'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedTransaksi.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Riwayat/Timeline */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Riwayat Transaksi
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-semibold text-gray-900">Transaksi Dibuat</p>
                        <p className="text-xs text-gray-500">{selectedTransaksi.tanggal} • 08:30 WIB</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-semibold text-gray-900">Verifikasi AI</p>
                        <p className="text-xs text-gray-500">{selectedTransaksi.tanggal} • 08:31 WIB</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Transaksi Selesai</p>
                        <p className="text-xs text-gray-500">{selectedTransaksi.tanggal} • 08:35 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Tutup
                </button>
                <button 
                  onClick={handlePrintStruk}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Cetak Struk
                </button>
              </div>
            </div>
          </div>
        )}

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
