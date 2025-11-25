import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function KonfirmasiSetoran() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  // Data dummy setoran (nanti bisa dari API/props)
  const setoranData = [
    {
      id: 1,
      icon: '🍾',
      iconBg: 'bg-blue-100',
      jenis: 'Setor Sampah Anorganik',
      kategori: 'Botol Plastik',
      berat: 2.5,
      hargaPerKg: 3000,
      total: 7500
    },
    {
      id: 2,
      icon: '📦',
      iconBg: 'bg-yellow-100',
      jenis: 'Setor Sampah Anorganik',
      kategori: 'Karton Bekas',
      berat: 1.8,
      hargaPerKg: 2500,
      total: 4500
    },
    {
      id: 3,
      icon: '🗑️',
      iconBg: 'bg-gray-100',
      jenis: 'Setor Sampah Anorganik',
      kategori: 'Kaleng Minuman',
      berat: 0.9,
      hargaPerKg: 8000,
      total: 6400
    },
    {
      id: 4,
      icon: '🌿',
      iconBg: 'bg-green-100',
      jenis: 'Setor Sampah Organik',
      kategori: 'Sisa Sayuran',
      berat: 1.2,
      hargaPerKg: 1900,
      total: 1800
    }
  ];

  const totalBerat = setoranData.reduce((sum, item) => sum + item.berat, 0);
  const totalHarga = setoranData.reduce((sum, item) => sum + item.total, 0);

  const handleKirimSetoran = () => {
    // Simulasi proses kirim ke server
    const confirmed = confirm('Apakah Anda yakin ingin mengirim setoran ini?');
    if (confirmed) {
      // Redirect ke halaman sukses
      navigate('/setoran-berhasil');
    }
  };

  const handleBatalkan = () => {
    if (confirm('Yakin ingin membatalkan setoran ini?')) {
      navigate('/setor-sampah');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 px-8 pt-8 pb-8 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 p-2 bg-simgreen-600 text-white rounded-lg shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Header with User Info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Konfirmasi Setoran</h1>
            <p className="text-gray-500 mt-1">Periksa kembali detail setoran sampah Anda sebelum mengirim</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg relative"
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
              <div className="text-right">
                <div className="font-semibold text-gray-800">Ahmad Rizki</div>
                <div className="text-xs text-gray-500">Nasabah</div>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=Ahmad+Rizki&background=16a34a&color=fff" 
                alt="User" 
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Ringkasan Setoran Card */}
          <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 rounded-xl p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-2">Ringkasan Setoran</h2>
            <p className="text-white/90 text-sm">Hasil deteksi sampah otomatis</p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jenis Sampah</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Berat (kg)</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Harga per Kg</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Total Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {setoranData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center text-xl`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{item.jenis}</div>
                            <div className="text-sm text-gray-500">{item.kategori}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {item.berat} kg
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        Rp {item.hargaPerKg.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-simgreen-600">
                        Rp {item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Section */}
          <div className="bg-green-50 border-2 border-simgreen-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-700 font-medium mb-1">Total Setoran</div>
                <div className="text-sm text-gray-600">Total berat: {totalBerat.toFixed(1)} kg</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-simgreen-600">
                  Rp {totalHarga.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Akan ditambahkan ke saldo</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBatalkan}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batalkan
            </button>
            <button
              onClick={handleKirimSetoran}
              className="flex-1 px-6 py-3 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Kirim Setoran
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <span className="font-semibold">Informasi Penting:</span> Setelah dikirimkan, saldo akan otomatis ditambahkan ke akun Anda dalam 1-2 menit. Pastikan semua data sudah benar sebelum mengirim.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
