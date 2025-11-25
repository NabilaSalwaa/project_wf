import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetoranBerhasil() {
  const navigate = useNavigate();

  // Data dummy (nanti dari state/API)
  const setoranData = {
    nomorReferensi: 'TRX-2024-001234',
    tanggalWaktu: '10 Nov 2024, 14:35',
    totalNilai: 47500,
    poinSimbasfa: 475,
    rincian: [
      {
        id: 1,
        icon: '🍾',
        jenis: 'Setor Sampah Anorganik',
        detail: '15 kg x Rp 1.500/kg',
        total: 22500
      },
      {
        id: 2,
        icon: '📦',
        jenis: 'Setor Sampah Anorganik',
        detail: '25 kg x Rp 400/kg',
        total: 10000
      },
      {
        id: 3,
        icon: '🌿',
        jenis: 'Setor Sampah Organik',
        detail: '5 kg x Rp 1.800/kg',
        total: 9000
      }
    ]
  };

  const handleKembaliDashboard = () => {
    navigate('/dashboard');
  };

  const handleUnduhPDF = () => {
    alert('Fitur unduh PDF akan segera tersedia!');
  };

  const handleBagikan = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Setoran Berhasil - BANGKIT',
        text: `Saya baru saja menyetor sampah senilai Rp ${setoranData.totalNilai.toLocaleString()} di BANGKIT!`,
        url: window.location.href
      });
    } else {
      alert('Browser tidak mendukung fitur berbagi');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* User Info (Top Right) */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md">
            <div className="text-right">
              <div className="font-semibold text-gray-800 text-sm">Ahmad Rizki</div>
              <div className="text-xs text-gray-500">Nasabah</div>
            </div>
            <img 
              src="https://ui-avatars.com/api/?name=Ahmad+Rizki&background=16a34a&color=fff" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Success Icon & Message */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 text-center">
            <div className="w-24 h-24 bg-simgreen-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Setoran Berhasil!</h1>
            <p className="text-gray-600 text-sm">
              Terima kasih telah berkontribusi untuk lingkungan yang lebih bersih
            </p>
          </div>

          {/* Bukti Setoran Card */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 rounded-xl p-5 mb-6 text-white">
              <h2 className="text-lg font-bold mb-1">Bukti Setoran Sampah</h2>
              <p className="text-sm text-white/90">Simpan bukti ini sebagai referensi transaksi Anda</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Nomor Referensi</div>
                <div className="font-bold text-gray-800">{setoranData.nomorReferensi}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Tanggal & Waktu</div>
                <div className="font-bold text-gray-800">{setoranData.tanggalWaktu}</div>
              </div>
            </div>

            {/* Total Nilai */}
            <div className="bg-green-50 border-2 border-simgreen-200 rounded-xl p-5 mb-6">
              <div className="text-sm text-gray-600 mb-2">Total Nilai Setoran</div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-bold text-simgreen-600">
                  Rp {setoranData.totalNilai.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-simgreen-700 bg-simgreen-100 px-3 py-1 rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  +{setoranData.poinSimbasfa} Poin SIMBASFA
                </div>
              </div>
            </div>

            {/* Rincian Setoran */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-gray-800">Rincian Setoran</h3>
              </div>
              
              <div className="space-y-3">
                {setoranData.rincian.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{item.jenis}</div>
                        <div className="text-xs text-gray-500">{item.detail}</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-700">
                      Rp {item.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Tambahan */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800">
                <span className="font-semibold">Informasi Tambahan:</span> Dana setoran akan ditambahkan ke saldo dalam 1-2 menit. Anda dapat melihat status transaksi di halaman Riwayat Transaksi.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleKembaliDashboard}
                className="px-6 py-3 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Kembali ke Dashboard
              </button>
              <button
                onClick={handleUnduhPDF}
                className="px-6 py-3 bg-white border-2 border-simgreen-600 text-simgreen-600 hover:bg-simgreen-50 font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Unduh PDF
              </button>
            </div>

            <button
              onClick={handleBagikan}
              className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-gray-700">BANGKIT</span>
          </div>
          <p className="text-sm text-gray-600">Bank Sampah Digital untuk Masa Depan yang Lebih Hijau</p>
          <p className="text-xs text-gray-500 mt-1">© 2025 BANGKIT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
