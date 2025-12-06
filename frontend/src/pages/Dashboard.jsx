import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard(){
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [saldoTersedia, setSaldoTersedia] = useState(0);
  const [pemasukanBulanIni, setPemasukanBulanIni] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  // Fungsi untuk menghitung pemasukan bulan ini
  const hitungPemasukanBulanIni = () => {
    const riwayat = JSON.parse(localStorage.getItem('riwayatTransaksi') || '[]');
    const bulanIni = new Date().getMonth();
    const tahunIni = new Date().getFullYear();
    
    const totalBulanIni = riwayat
      .filter(trx => {
        if (!trx.timestamp) return false;
        const trxDate = new Date(trx.timestamp);
        return trxDate.getMonth() === bulanIni && trxDate.getFullYear() === tahunIni;
      })
      .reduce((total, trx) => total + (trx.jumlah || 0), 0);
    
    return totalBulanIni;
  };

  useEffect(()=>{
    fetchUserData();
    fetchSummary();
    setPemasukanBulanIni(hitungPemasukanBulanIni());
    setProfilePhoto(localStorage.getItem('profilePhoto') || '');
    
    // Auto-refresh saldo setiap 3 detik
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 3000);

    return () => clearInterval(intervalId);
  },[]);

  const fetchSummary = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const response = await api.get(`/summary?email=${userEmail}`);
        setSummary(response.data);
      }
    } catch (error) {
      console.log('Error fetching summary:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
      
      // Fetch saldo terbaru dari database
      const usersResponse = await api.get('http://127.0.0.1:8000/api/users/all', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (usersResponse.data.success && response.data.email) {
        const userData = usersResponse.data.users.find(u => u.email === response.data.email);
        if (userData) {
          const newSaldo = parseFloat(userData.saldo) || 0;
          setSaldoTersedia(newSaldo);
          localStorage.setItem('saldoTersedia', newSaldo.toString());
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback ke localStorage
      const saldo = parseFloat(localStorage.getItem('saldoTersedia') || '1000000');
      setSaldoTersedia(saldo);
    }
  };

  const barData = {
    labels: summary?.byCategory?.map(c=>c.category) ?? ['Organik','Anorganik'],
    datasets: [{ 
      label: 'Berat (Kg)', 
      data: summary?.byCategory?.map(c=>c.total_weight) ?? [142,86], 
      backgroundColor: ['#10B981','#3B82F6'],
      borderRadius: 8
    }]
  };

  const pieData = {
    labels: summary?.byCategory?.map(c=>c.category) ?? ['Organik','Anorganik'],
    datasets: [{ 
      data: summary?.byCategory?.map(c=>c.total_weight) ?? [62, 38],
      backgroundColor: ['#10B981','#3B82F6'],
      borderWidth: 0
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { display: false }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 px-8 pt-8 pb-8 overflow-y-auto max-h-screen">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 p-2 bg-simgreen-600 text-white rounded-lg shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Kelola sampah Anda dengan mudah</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                      <span className="text-xs bg-simgreen-500 text-white px-2 py-1 rounded-full">
                        {notifications.filter(n => n.unread).length} baru
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-simgreen-50' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                            notif.type === 'success' ? 'bg-green-500' :
                            notif.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-800">{notif.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                            <span className="text-xs text-gray-400 mt-2 inline-block">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-simgreen-600 hover:text-simgreen-700 font-medium">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-simgreen-500"
                />
              ) : (
                <div className="w-10 h-10 bg-simgreen-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-gray-800">{user?.name || 'Ahmad Rizki'}</div>
                <div className="text-xs text-gray-500">Nasabah</div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👋</span>
            <h2 className="text-xl font-bold">Selamat Datang, {user?.name || 'Ahmad Rizki'}!</h2>
          </div>
          <p className="text-white/90">Mari kelola sampah dan dapatkan keuntungan bersama BANGKIT</p>
        </div>

        {/* Saldo Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Saldo Saat Ini</p>
              <h3 className="text-4xl font-bold text-gray-800">
                Rp {saldoTersedia.toLocaleString('id-ID')}
              </h3>
              <p className="text-sm text-simgreen-600 mt-2">
                +Rp {pemasukanBulanIni.toLocaleString('id-ID')} Bulan Ini
              </p>
            </div>
            <div className="w-16 h-16 bg-simgreen-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Menu Utama */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Menu Utama</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Setor Sampah */}
            <Link to="/setor-sampah" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer block">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Setor Sampah</h4>
              <p className="text-xs text-gray-500">Setor sampah dan dapatkan saldo</p>
            </Link>

            {/* Tarik Saldo */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Tarik Saldo</h4>
              <p className="text-xs text-gray-500">Cairkan saldo ke rekening</p>
            </div>

            {/* Riwayat Transaksi */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Riwayat Transaksi</h4>
              <p className="text-xs text-gray-500">Lihat semua transaksi</p>
            </div>

            {/* Profil Pengguna */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Profil Pengguna</h4>
              <p className="text-xs text-gray-500">Kelola profil akun</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Setoran Per Jenis Sampah</h3>
            <div style={{ height: '280px' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Perbandingan Jenis Sampah</h3>
            <div style={{ height: '280px' }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
            <a href="/riwayat-transaksi" className="text-sm text-simgreen-600 hover:text-simgreen-700 font-medium">
              Lihat Semua
            </a>
          </div>
          
          <div className="space-y-3">
            {/* Latest Penarikan Activity */}
            {(() => {
              const latestPenarikan = localStorage.getItem('latestPenarikanActivity');
              if (latestPenarikan) {
                const activity = JSON.parse(latestPenarikan);
                return (
                  <div className="flex items-center justify-between p-4 border-2 border-red-200 bg-red-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center animate-pulse">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 flex items-center gap-2">
                          Penarikan Saldo
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                            {activity.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">{activity.bank} • {activity.tanggal}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">-Rp {activity.jumlah.toLocaleString('id-ID')}</div>
                      <div className="text-xs text-gray-500">Ke Rekening</div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Latest Setoran Activity */}
            {(() => {
              const latestActivity = localStorage.getItem('latestSetoranActivity');
              if (latestActivity) {
                const activity = JSON.parse(latestActivity);
                return (
                  <div className="flex items-center justify-between p-4 border-2 border-green-200 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center animate-pulse">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 flex items-center gap-2">
                          Setor Sampah Anorganik
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                            Verifikasi
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{activity.jenis} • {activity.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+Rp {activity.total.toLocaleString('id-ID')}</div>
                      <div className="text-xs text-gray-500">{activity.berat} kg</div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Transaction 1 */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Setor Sampah Organik</div>
                  <div className="text-xs text-gray-500">15 November 2025, 10:21</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+Rp 45.000</div>
                <div className="text-xs text-gray-500">15 kg</div>
              </div>
            </div>

            {/* Transaction 2 - Penarikan */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" transform="rotate(180 10 10)" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Penarikan Saldo</div>
                  <div className="text-xs text-gray-500">12 November 2025, 14:20</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-600">-Rp 200.000</div>
                <div className="text-xs text-gray-500">Transfer Bank</div>
              </div>
            </div>

            {/* Transaction 3 */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Setor Sampah Anorganik</div>
                  <div className="text-xs text-gray-500">10 November 2025, 09:15</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+Rp 85.000</div>
                <div className="text-xs text-gray-500">20 kg</div>
              </div>
            </div>

            {/* Transaction 4 */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Setor Sampah Organik</div>
                  <div className="text-xs text-gray-500">08 November 2025, 11:47</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+Rp 52.000</div>
                <div className="text-xs text-gray-500">12 kg</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
