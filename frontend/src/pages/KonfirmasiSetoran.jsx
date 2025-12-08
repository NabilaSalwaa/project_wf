import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import api from '../api/axios';

export default function KonfirmasiSetoran() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [setoranData, setSetoranData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
  ];

  useEffect(() => {
    // Load data dari location state
    const data = location.state?.setoranData;
    if (!data) {
      navigate('/setor-sampah');
      return;
    }
    setSetoranData(data);
  }, [navigate, location]);

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      console.log('📤 Mengirim setoran ke backend...');
      
      // Ambil email dari localStorage
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        alert('User tidak ditemukan. Silakan login ulang.');
        navigate('/login');
        setLoading(false);
        return;
      }
      
      console.log('📧 Email user:', userEmail);
      
      // Fetch user ID dari database berdasarkan email
      const usersResponse = await axios.get('http://127.0.0.1:8000/api/users/all');
      
      if (!usersResponse.data.success) {
        alert('Gagal mengambil data user');
        setLoading(false);
        return;
      }
      
      const userData = usersResponse.data.users.find(u => u.email === userEmail);
      
      if (!userData) {
        alert('User tidak ditemukan di database. Silakan login ulang.');
        navigate('/login');
        setLoading(false);
        return;
      }
      
      console.log('👤 User ID:', userData.id);
      
      // Hit API backend untuk simpan transaksi dan update saldo
      const response = await axios.post('http://127.0.0.1:8000/api/transactions', {
        type: 'deposit',
        category: setoranData.jenis_sampah,
        weight: parseFloat(setoranData.berat),
        amount: parseFloat(setoranData.total_harga),
        user_id: userData.id
      });

      console.log('✅ Setoran berhasil:', response.data);
      
      if (response.data.success) {
        console.log('💰 Saldo penarikan baru:', response.data.saldo_penarikan);
        console.log('💵 Saldo dashboard:', response.data.saldo_dashboard);
        
        // Simpan ke localStorage untuk ditampilkan di Data Sampah admin
        const setoranList = JSON.parse(localStorage.getItem('setoranSampahList') || '[]');
        
        const newSetoran = {
          id: `WS-${String(setoranList.length + 1).padStart(3, '0')}`,
          transaction_id: response.data.transaction.id,
          nama: userData.name || userEmail.split('@')[0],
          email: userEmail,
          user_id: userData.id,
          foto: userData.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || userEmail)}&background=22C55E&color=fff`,
          jenis: setoranData.jenis_sampah,
          berat: `${setoranData.berat} kg`,
          tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          idNasabah: `#NSB-${String(userData.id).padStart(3, '0')}`,
          fotoSampah: setoranData.foto, // Foto base64 dari SetorSampah
          totalPembayaran: parseFloat(setoranData.total_harga), // Simpan sebagai number untuk perhitungan
          totalPembayaranFormatted: `Rp ${parseFloat(setoranData.total_harga).toLocaleString('id-ID')}`, // String untuk display
          harga_per_kg: setoranData.harga_per_kg || 0,
          detailSampah: [
            {
              jenis: setoranData.jenis_sampah,
              kategori: setoranData.jenis_sampah.toUpperCase(),
              berat: parseFloat(setoranData.berat), // Number untuk perhitungan
              beratFormatted: `${setoranData.berat} kg`, // String untuk display
              harga: parseFloat(setoranData.total_harga), // Number
              hargaFormatted: `Rp ${parseFloat(setoranData.total_harga).toLocaleString('id-ID')}` // String untuk display
            }
          ],
          akurasi: '95.0%',
          objekTerdeteksi: '1 Item',
          status: 'pending',
          created_at: new Date().toISOString()
        };
        
        setoranList.push(newSetoran);
        localStorage.setItem('setoranSampahList', JSON.stringify(setoranList));
        
        console.log('📦 Data setoran disimpan untuk admin:', newSetoran);
        
        // Navigasi ke halaman setoran berhasil
        navigate('/setoran-berhasil', { 
          state: { 
            setoranData: {
              ...setoranData,
              saldo_penarikan: response.data.saldo_penarikan,
              saldo_dashboard: response.data.saldo_dashboard
            }
          } 
        });
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Gagal menyimpan setoran: ' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/setor-sampah');
  };

  if (!setoranData) {
    return <div>Loading...</div>;
  }

  const jenisLabel = {
    'plastik': 'Botol Plastik',
    'kertas': 'Kertas Bekas',
    'logam': 'Kaleng Minuman',
    'kaca': 'Kaca',
    'kardus': 'Kardus Bekas',
    'botol-plastik': 'Botol Plastik',
    'kaleng': 'Kaleng',
    'elektronik': 'Barang Elektronik'
  };

  // Mapping icon berdasarkan jenis sampah
  const getIcon = (jenis) => {
    const iconMap = {
      'plastik': '🍾',
      'kertas': '📄',
      'logam': '🗑️',
      'kaca': '🥛',
      'kardus': '📦',
      'botol-plastik': '🍾',
      'kaleng': '🥫',
      'elektronik': '📱'
    };
    return iconMap[jenis] || '♻️';
  };

  // Mapping background color
  const getIconBg = (jenis) => {
    const bgMap = {
      'plastik': 'bg-blue-100',
      'kertas': 'bg-yellow-100',
      'logam': 'bg-gray-100',
      'kaca': 'bg-purple-100',
      'kardus': 'bg-orange-100',
      'botol-plastik': 'bg-blue-100',
      'kaleng': 'bg-gray-100',
      'elektronik': 'bg-red-100'
    };
    return bgMap[jenis] || 'bg-green-100';
  };

  // Semua jenis sampah adalah anorganik
  const kategori = 'Anorganik';

  // Buat array untuk tampilan tabel
  const setoranItems = [{
    id: 1,
    icon: getIcon(setoranData.jenis_sampah),
    iconBg: getIconBg(setoranData.jenis_sampah),
    jenis: 'Setor Sampah ' + kategori,
    kategori: jenisLabel[setoranData.jenis_sampah] || setoranData.jenis_sampah,
    berat: setoranData.berat,
    hargaPerKg: setoranData.harga_per_kg,
    total: setoranData.total_harga
  }];

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center shadow-2xl">
            <div className="relative">
              <svg className="animate-spin h-20 w-20 text-simgreen-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <p className="mt-6 text-xl font-bold text-gray-800">Mengirim Setoran...</p>
            <p className="mt-2 text-gray-600">Mohon tunggu sebentar</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 px-8 pt-8 pb-8">
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
                            notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
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
        <div className="max-w-7xl mx-auto">
          {/* Ringkasan Setoran Card */}
          <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-3xl font-bold mb-3">Ringkasan Setoran</h2>
            <p className="text-white/90 text-base">Hasil deteksi sampah otomatis</p>
          </div>

          {/* Foto Preview Section */}
          {setoranData.previewUrl && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Foto Sampah</h3>
              <div className="flex justify-center">
                <img 
                  src={setoranData.previewUrl} 
                  alt="Foto Sampah" 
                  className="max-w-md w-full h-auto rounded-xl border-4 border-gray-200 shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2">
                  <tr>
                    <th className="px-8 py-5 text-left text-base font-bold text-gray-800">Jenis Sampah</th>
                    <th className="px-8 py-5 text-center text-base font-bold text-gray-800">Berat (kg)</th>
                    <th className="px-8 py-5 text-center text-base font-bold text-gray-800">Harga per Kg</th>
                    <th className="px-8 py-5 text-right text-base font-bold text-gray-800">Total Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {setoranItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center text-3xl`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-bold text-lg text-gray-800">{item.jenis}</div>
                            <div className="text-base text-gray-600">{item.kategori}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-5 py-2 bg-yellow-100 text-yellow-800 rounded-full text-base font-bold">
                          {item.berat} kg
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center text-lg font-semibold text-gray-700">
                        Rp {parseFloat(item.hargaPerKg).toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-6 text-right font-bold text-xl text-simgreen-600">
                        Rp {parseFloat(item.total).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Section */}
          <div className="bg-green-50 border-4 border-simgreen-300 rounded-2xl p-10 mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-800 font-bold text-xl mb-2">Total Setoran</div>
                <div className="text-base text-gray-700 font-medium">Total berat: {setoranData.berat} kg</div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-simgreen-600">
                  Rp {setoranData.total_harga.toLocaleString('id-ID')}
                </div>
                <div className="text-base text-gray-600 mt-2 font-medium">Akan ditambahkan ke saldo</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6">
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex-1 px-10 py-5 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batalkan
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-10 py-5 bg-simgreen-600 hover:bg-simgreen-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Kirim Setoran
                </>
              )}
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <span className="font-semibold">Informasi Penting:</span> Setelah dikirimkan, setoran akan diverifikasi oleh admin dalam waktu 1-2 hari kerja. Saldo akan otomatis ditambahkan setelah disetujui.
            </div>
          </div>
        </div>
        </div>
      </main>
      </div>
    </>
  );
}
