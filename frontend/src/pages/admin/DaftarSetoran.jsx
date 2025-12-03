import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DaftarSetoran() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [setoranList, setSetoranList] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [selectedSetoran, setSelectedSetoran] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadSetoran();
    // Auto refresh every 10 seconds
    const interval = setInterval(loadSetoran, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadSetoran = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        '/api/admin/setoran-list.php',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSetoranList(response.data.data);
      }
    } catch (error) {
      console.error('Error loading setoran:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (setoran) => {
    if (!confirm(`Setujui setoran dari ${setoran.user_name}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/admin/setoran-list.php',
        {
          setoran_id: setoran.id,
          status: 'approved',
          catatan: 'Setoran disetujui oleh admin'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Setoran berhasil disetujui!');
        loadSetoran();
      }
    } catch (error) {
      console.error('Error approving:', error);
      alert('Gagal menyetujui setoran');
    }
  };

  const handleReject = async (setoran) => {
    const reason = prompt(`Alasan menolak setoran dari ${setoran.user_name}:`);
    if (!reason) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/admin/setoran-list.php',
        {
          setoran_id: setoran.id,
          status: 'rejected',
          catatan: reason
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Setoran ditolak');
        loadSetoran();
      }
    } catch (error) {
      console.error('Error rejecting:', error);
      alert('Gagal menolak setoran');
    }
  };

  const filteredSetoran = setoranList.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const jenisLabel = {
    'plastik': 'Plastik',
    'kertas': 'Kertas',
    'logam': 'Logam',
    'kaca': 'Kaca',
    'organik': 'Organik'
  };

  const statusColor = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };

  const statusText = {
    'pending': 'Menunggu',
    'approved': 'Disetujui',
    'rejected': 'Ditolak'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daftar Setoran Sampah</h1>
              <p className="text-gray-600 mt-1">Kelola dan verifikasi setoran dari nasabah</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Kembali
            </button>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all' 
                  ? 'bg-simgreen-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua ({setoranList.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'pending' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending ({setoranList.filter(s => s.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'approved' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Disetujui ({setoranList.filter(s => s.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'rejected' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ditolak ({setoranList.filter(s => s.status === 'rejected').length})
            </button>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-simgreen-600"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        ) : filteredSetoran.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600">Belum ada setoran</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSetoran.map((setoran) => (
              <div key={setoran.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Foto */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={`/storage/uploads/${setoran.foto_sampah}`}
                    alt="Sampah"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Foto+Tidak+Tersedia';
                    }}
                  />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor[setoran.status]}`}>
                    {statusText[setoran.status]}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">
                      #{setoran.id} • {new Date(setoran.created_at).toLocaleString('id-ID', { 
                        day: '2-digit', 
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-1">{setoran.user_name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{setoran.user_email}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jenis:</span>
                      <span className="font-semibold">{jenisLabel[setoran.jenis_sampah]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Berat:</span>
                      <span className="font-semibold">{setoran.berat} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-simgreen-600">
                        Rp {parseFloat(setoran.total_harga).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {setoran.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(setoran)}
                        className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
                      >
                        Tolak
                      </button>
                      <button
                        onClick={() => handleApprove(setoran)}
                        className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition"
                      >
                        Setujui
                      </button>
                    </div>
                  )}

                  {setoran.catatan && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      <strong>Catatan:</strong> {setoran.catatan}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
