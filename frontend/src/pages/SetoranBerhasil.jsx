import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SetoranBerhasil() {
  const navigate = useNavigate();
  const location = useLocation();
  const setoranData = location.state?.setoranData;

  React.useEffect(() => {
    if (!setoranData) {
      navigate('/konfirmasi-setoran');
    } else {
      // Simpan aktivitas terbaru ke localStorage
      const activityData = {
        jenis: setoranData.jenis_sampah,
        berat: setoranData.berat,
        total: setoranData.total_harga,
        time: new Date().toLocaleString('id-ID', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        timestamp: Date.now()
      };
      localStorage.setItem('latestSetoranActivity', JSON.stringify(activityData));
      
      // Simpan ke riwayat transaksi
      const setoranTransaksi = {
        id: `TRX-${Date.now()}`,
        jenis: 'Setor',
        jumlah: setoranData.total_harga,
        tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: 'Berhasil',
        timestamp: Date.now(),
        kategori: 'Anorganik',
        beratSampah: `${setoranData.berat} kg`,
        jenisSampah: setoranData.jenis_sampah
      };
      
      const existingTransaksi = JSON.parse(localStorage.getItem('riwayatTransaksi') || '[]');
      existingTransaksi.unshift(setoranTransaksi);
      localStorage.setItem('riwayatTransaksi', JSON.stringify(existingTransaksi));
      
      // TAMBAH saldo karena dapat uang dari setoran sampah
      const currentSaldo = parseFloat(localStorage.getItem('saldoTersedia') || '800000');
      const newSaldo = currentSaldo + setoranData.total_harga;
      localStorage.setItem('saldoTersedia', newSaldo.toString());
    }
  }, [setoranData, navigate]);

  if (!setoranData) {
    return null;
  }

  const getJenisLabel = (jenis) => {
    const labels = {
      'plastik': 'Plastik',
      'kertas': 'Kertas',
      'logam': 'Logam',
      'kaca': 'Kaca',
      'kardus': 'Kardus',
      'botol-plastik': 'Botol Plastik',
      'kaleng': 'Kaleng',
      'elektronik': 'Elektronik'
    };
    return labels[jenis] || jenis;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Icon */}
          <div className="flex justify-center pt-8 pb-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center px-8 pb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Setoran Berhasil!</h1>
            <p className="text-sm text-gray-600">
              Terima kasih telah berkontribusi untuk lingkungan yang lebih bersih
            </p>
          </div>

          {/* Info Card */}
          <div className="px-8 pb-8">
            {/* Green Header */}
            <div className="bg-green-600 text-white rounded-t-xl px-5 py-3">
              <h3 className="font-bold text-base">Bukti Setoran Sampah</h3>
              <p className="text-xs opacity-90">Simpan bukti ini sebagai referensi transaksi Anda</p>
            </div>

            {/* White Content */}
            <div className="bg-gray-50 rounded-b-xl p-5 border-2 border-gray-200">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Nomor Transaksi</p>
                  <p className="text-sm font-bold text-gray-800">TRX-2024-001234</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tanggal & Waktu</p>
                  <p className="text-sm font-bold text-gray-800">
                    {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Total Nilai Setoran</p>
                <p className="text-3xl font-bold text-green-600">
                  Rp {setoranData.total_harga.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-yellow-700 font-medium">+479 Poin BANGKIT</p>
                </div>
              </div>

              {/* Rincian Setoran */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <p className="text-sm font-bold text-gray-800">Rincian Setoran</p>
                </div>

                {/* Item 1 */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🗑️</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Setor Sampah Anorganik</p>
                      <p className="text-xs text-gray-600">{setoranData.berat} kg • Rp {setoranData.harga_per_kg.toLocaleString('id-ID')}/kg</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Rp {setoranData.total_harga.toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-blue-900">
                    <p className="font-bold mb-1">Informasi Tambahan</p>
                    <p>Dana setoran akan ditransfer ke rekening Anda dalam 1-2 hari kerja. Mohon dapat memantau transaksi menu Riwayat Transaksi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-5 py-3 bg-white border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-all text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Kembali ke Dashboard
              </button>
              <button 
                onClick={() => window.print()}
                className="px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
