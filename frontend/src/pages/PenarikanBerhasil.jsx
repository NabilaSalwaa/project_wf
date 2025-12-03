import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PenarikanBerhasil() {
  const navigate = useNavigate();
  const location = useLocation();
  const penarikanData = location.state?.penarikanData;

  React.useEffect(() => {
    if (!penarikanData) {
      navigate('/tarik-saldo');
    }
  }, [penarikanData, navigate]);

  if (!penarikanData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Penarikan Berhasil!</h1>
            <p className="text-sm text-gray-600">
              Permintaan penarikan saldo Anda sedang diproses
            </p>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Bukti Penarikan */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 mb-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs opacity-90 mb-1">Bukti Penarikan Saldo</p>
                  <p className="text-lg font-bold">{penarikanData.bank}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-90">ID Transaksi</p>
                  <p className="text-sm font-mono">{penarikanData.id}</p>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Nomor Rekening</p>
                  <p className="text-sm font-bold text-gray-800">{penarikanData.rekening}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Atas Nama</p>
                  <p className="text-sm font-bold text-gray-800">{penarikanData.atasNama}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tanggal</p>
                  <p className="text-sm font-bold text-gray-800">{penarikanData.tanggal}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Waktu</p>
                  <p className="text-sm font-bold text-gray-800">{penarikanData.waktu}</p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Jumlah Penarikan</p>
                <p className="text-3xl font-bold text-green-600">
                  Rp {penarikanData.jumlah.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                    {penarikanData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 mt-6 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-green-900">
                  <p className="font-bold mb-2 text-base">Informasi Penting</p>
                  <ul className="space-y-1 text-green-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Penarikan akan diproses dalam waktu 1-2 hari kerja</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Dana akan ditransfer ke rekening yang telah didaftarkan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Anda dapat melihat status penarikan di halaman Riwayat Transaksi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
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
                onClick={() => navigate('/riwayat-transaksi')}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Lihat Riwayat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
