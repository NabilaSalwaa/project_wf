import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { FiDownload, FiTrendingUp, FiTrendingDown, FiPackage } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const sidebarMenu = [
  {
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
    path: '/dashboard-admin'
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

export default function Laporan() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(5);
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-12-31'
  });
  const [selectedNasabah, setSelectedNasabah] = useState('Semua');
  const [selectedNasabahFilter, setSelectedNasabahFilter] = useState('Semua Nasabah');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [periodeView, setPeriodeView] = useState('bulanan');
  const [showComparison, setShowComparison] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(true);
  const [stats, setStats] = useState({
    totalSetoran: 12450000,
    totalPenarikan: 8750000,
    totalBeratSampah: 2840,
    setoranChange: 12.5,
    penarikanChange: -5.2,
    beratChange: 8.3
  });

  // Data untuk chart Total Setoran per Bulan
  const getSetoranData = () => {
    if (periodeView === 'bulanan') {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        data: [650, 720, 680, 850, 920, 780, 890, 950, 820, 880, 910, 1020]
      };
    } else if (periodeView === 'mingguan') {
      return {
        labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
        data: [245, 280, 265, 230]
      };
    } else {
      return {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        data: [45, 52, 38, 61, 48, 35, 41]
      };
    }
  };

  const setoranDataSource = getSetoranData();
  const setoranData = {
    labels: setoranDataSource.labels,
    datasets: [{
      label: 'Total Setoran',
      data: setoranDataSource.data,
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 28,
    }]
  };

  // Data untuk chart Total Penarikan per Bulan
  const penarikanData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [{
      label: 'Total Penarikan',
      data: [450, 380, 520, 290, 610, 340, 480, 550, 420, 390, 680, 520],
      // backgroundColor: 'transparent',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: 'rgba(239, 68, 68, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        return gradient;
      },
    }]
  };

  // Data untuk pie chart Distribusi Jenis Sampah
  const distribusiData = {
    labels: ['Kertas', 'Botol', 'Logam', 'Plastik', 'Lainnya'],
    datasets: [{
      data: [35, 28, 15, 12, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(251, 146, 60, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(168, 85, 247, 1)',
      ],
      borderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

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

  const handleGenerateLaporan = () => {
    setIsGenerating(true);
    
    // Simulasi loading
    setTimeout(() => {
      // Generate random data
      const randomSetoran = Math.floor(Math.random() * 5000000) + 10000000;
      const randomPenarikan = Math.floor(Math.random() * 3000000) + 7000000;
      const randomBerat = Math.floor(Math.random() * 1000) + 2000;
      
      setStats({
        totalSetoran: randomSetoran,
        totalPenarikan: randomPenarikan,
        totalBeratSampah: randomBerat,
        setoranChange: (Math.random() * 20 - 5).toFixed(1),
        penarikanChange: (Math.random() * 15 - 10).toFixed(1),
        beratChange: (Math.random() * 15 - 2).toFixed(1)
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  const handlePeriodeChange = (newPeriode) => {
    setPeriodeView(newPeriode);
    setAnimateCharts(true);
    setTimeout(() => setAnimateCharts(false), 500);
  };

  const handleRefreshData = () => {
    setAnimateCharts(true);
    handleGenerateLaporan();
    setTimeout(() => setAnimateCharts(false), 1500);
  };

  const handleExportPDF = () => {
    alert('Mengekspor laporan ke format PDF...\nFile akan diunduh dalam beberapa detik.');
  };

  const handleExportExcel = () => {
    alert('Mengekspor laporan ke format Excel...\nFile akan diunduh dalam beberapa detik.');
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
              <h1 className="text-2xl font-bold text-gray-900">Laporan Bank Sampah</h1>
              <p className="text-xs text-gray-500 mt-0.5">Kelola dan analisis data transaksi bank sampah</p>
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
          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Laporan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Rentang Tanggal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rentang Tanggal</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                  />
                  <span className="flex items-center text-gray-500">—</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Jenis Transaksi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Transaksi</label>
                <select
                  value={selectedNasabah}
                  onChange={(e) => setSelectedNasabah(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                >
                  <option>Semua</option>
                  <option>Setoran</option>
                  <option>Penarikan</option>
                </select>
              </div>

              {/* Nasabah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nasabah</label>
                <select
                  value={selectedNasabahFilter}
                  onChange={(e) => setSelectedNasabahFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                >
                  <option>Semua Nasabah</option>
                  <option>Siti Rahayu</option>
                  <option>Ahmad Budiono</option>
                  <option>Maya Sari</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateLaporan}
              disabled={isGenerating}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-semibold ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:scale-105'
              } text-white`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Generate Laporan
                </>
              )}
            </button>
          </div>

          {/* View Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Periode View Toggle */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Tampilan Periode</label>
                <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1">
                  {['harian', 'mingguan', 'bulanan'].map((periode) => (
                    <button
                      key={periode}
                      onClick={() => handlePeriodeChange(periode)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        periodeView === periode
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {periode.charAt(0).toUpperCase() + periode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Type Toggle */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Tipe Grafik Setoran</label>
                <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1">
                  {[
                    { value: 'bar', label: 'Bar', icon: '▂▃▅▆' },
                    { value: 'line', label: 'Line', icon: '📈' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setChartType(type.value)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                        chartType === type.value
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefreshData}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-semibold hover:shadow-lg transform hover:scale-105"
              >
                <svg className={`w-4 h-4 ${animateCharts ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>

              {/* Comparison Toggle */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  showComparison
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {showComparison ? 'Sembunyikan' : 'Tampilkan'} Perbandingan
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Setoran */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                  <FiTrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  stats.setoranChange >= 0 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {stats.setoranChange >= 0 ? '+' : ''}{stats.setoranChange}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Setoran</h3>
              <p className="text-2xl font-bold text-gray-900">Rp {stats.totalSetoran.toLocaleString('id-ID')}</p>
            </div>

            {/* Total Penarikan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                  <FiTrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  stats.penarikanChange >= 0 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {stats.penarikanChange >= 0 ? '+' : ''}{stats.penarikanChange}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Penarikan</h3>
              <p className="text-2xl font-bold text-gray-900">Rp {stats.totalPenarikan.toLocaleString('id-ID')}</p>
            </div>

            {/* Total Berat Sampah */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                  <FiPackage className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  stats.beratChange >= 0 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {stats.beratChange >= 0 ? '+' : ''}{stats.beratChange}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Berat Sampah</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBeratSampah.toLocaleString('id-ID')} kg</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Total Setoran per Bulan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all ${animateCharts ? 'animate-pulse' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Total Setoran per {periodeView.charAt(0).toUpperCase() + periodeView.slice(1)}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {chartType === 'bar' ? 'Bar Chart' : 'Line Chart'}
                </span>
              </div>
              <div className="h-80">
                {chartType === 'bar' ? (
                  <Bar data={setoranData} options={chartOptions} />
                ) : (
                  <Line data={setoranData} options={lineChartOptions} />
                )}
              </div>
            </div>

            {/* Total Penarikan per Bulan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all ${animateCharts ? 'animate-pulse' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Total Penarikan per {periodeView.charAt(0).toUpperCase() + periodeView.slice(1)}</h3>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Line Chart</span>
              </div>
              <div className="h-80">
                <Line data={penarikanData} options={lineChartOptions} />
              </div>
            </div>
          </div>

          {/* Comparison View - Conditional */}
          {showComparison && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 animate-slideDown">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Perbandingan Setoran vs Penarikan
              </h3>
              <div className="h-80">
                <Bar 
                  data={{
                    labels: setoranDataSource.labels,
                    datasets: [
                      {
                        label: 'Setoran',
                        data: setoranDataSource.data,
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 2,
                      },
                      {
                        label: 'Penarikan',
                        data: periodeView === 'bulanan' 
                          ? [450, 380, 520, 290, 610, 340, 480, 550, 420, 390, 680, 520]
                          : periodeView === 'mingguan'
                          ? [180, 165, 195, 210]
                          : [28, 32, 25, 38, 30, 22, 27],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 2,
                      }
                    ]
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          usePointStyle: true,
                          padding: 15
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Distribusi & Export */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribusi Jenis Sampah */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Jenis Sampah</h3>
              <div className="h-80">
                <Pie data={distribusiData} options={pieChartOptions} />
              </div>
            </div>

            {/* Export Laporan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Export Laporan</h3>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleExportPDF}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
                >
                  <FiDownload className="w-5 h-5" />
                  Export PDF
                </button>
                
                <button
                  onClick={handleExportExcel}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
                >
                  <FiDownload className="w-5 h-5" />
                  Export Excel
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Informasi Laporan</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p><span className="font-medium">Periode:</span> Jan - Des 2025</p>
                  <p><span className="font-medium">Total Transaksi:</span> 1,247</p>
                  <p><span className="font-medium">Last Update:</span> 29 Nov 2025</p>
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
