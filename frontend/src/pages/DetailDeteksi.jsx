import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DetailDeteksi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [catatan, setCatatan] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // Ambil data dari route state, jika tidak ada gunakan data default
  const passedData = location.state?.data;
  
  const deteksiData = passedData ? {
    id: `TREK-${passedData.id.split('-')[1]}`, // Convert WS-001 to TREK-001
    status: 'Menunggu Verifikasi',
    nasabah: {
      nama: passedData.nama,
      idNasabah: passedData.idNasabah,
      tanggal: passedData.tanggal.split(',')[0], // Ambil bagian tanggal saja
      waktu: passedData.tanggal.split(', ')[1] // Ambil bagian waktu
    },
    deteksi: {
      foto: passedData.fotoSampah,
      akurasi: passedData.akurasi,
      objekTerdeteksi: passedData.objekTerdeteksi
    },
    sampah: passedData.detailSampah,
    totalPembayaran: passedData.totalPembayaran
  } : {
    // Data default jika tidak ada data yang dikirim
    id: 'TREK-001234',
    status: 'Menunggu Verifikasi',
    nasabah: {
      nama: 'Ahmad Rizki',
      idNasabah: '#NSB-001',
      tanggal: '15 Nov 2024',
      waktu: '14:30 WIB'
    },
    deteksi: {
      foto: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
      akurasi: '94.8%',
      objekTerdeteksi: '12 Item'
    },
    sampah: [
      { jenis: 'Botol Plastik', kategori: 'PET', berat: '2.5 kg', harga: 'Rp 5.000' },
      { jenis: 'Kaleng Aluminium', kategori: 'ALU', berat: '1.8 kg', harga: 'Rp 7.200' },
      { jenis: 'Kardus', kategori: 'PAPER', berat: '3.2 kg', harga: 'Rp 6.400' }
    ],
    totalPembayaran: 'Rp 18.600'
  };

  const handleSetuju = () => {
    alert('Setoran disetujui!');
    navigate('/admin/data-sampah');
  };

  const handleTolak = () => {
    if (!catatan.trim()) {
      alert('Mohon isi catatan penolakan');
      return;
    }
    alert('Setoran ditolak dengan catatan: ' + catatan);
    navigate('/admin/data-sampah');
  };

  const handleEditData = () => {
    setEditedData(JSON.parse(JSON.stringify(deteksiData.sampah))); // Deep copy
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    alert('Data berhasil diupdate!');
    setIsEditModalOpen(false);
    // Here you would typically send the edited data to backend
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditedData(null);
  };

  const handleEditItemChange = (index, field, value) => {
    const newData = [...editedData];
    newData[index][field] = value;
    setEditedData(newData);
  };

  const handleAddItem = () => {
    setEditedData([...editedData, { jenis: '', kategori: 'PET', berat: '', harga: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newData = editedData.filter((_, i) => i !== index);
    setEditedData(newData);
  };

  const getBadgeColor = (kategori) => {
    const colors = {
      'PET': 'bg-green-50 text-green-700 border-green-200',
      'ALU': 'bg-blue-50 text-blue-700 border-blue-200',
      'PAPER': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'GLASS': 'bg-purple-50 text-purple-700 border-purple-200',
      'HDPE': 'bg-cyan-50 text-cyan-700 border-cyan-200'
    };
    return colors[kategori] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-base">BANGKIT</div>
                  <div className="text-xs text-gray-500">Bank Sampah Digital</div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <button onClick={() => navigate('/admin/data-sampah')} className="text-gray-500 hover:text-gray-700">
              Data Sampah + Deteksi
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Detail</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Title & Status */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hasil Deteksi</h1>
            <p className="text-sm text-gray-500 mt-1">Detail sampah untuk verifikasi</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-yellow-50 text-yellow-700 text-sm font-semibold rounded-lg border border-yellow-200">
              {deteksiData.status}
            </span>
            <span className="text-sm text-gray-500">ID: {deteksiData.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Detection Result */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Hasil Deteksi YOLO</h2>
              </div>

              {/* Detection Image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={deteksiData.deteksi.foto} 
                  alt="Hasil Deteksi" 
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Detection Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">Akurasi Deteksi</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{deteksiData.deteksi.akurasi}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">Objek Terdeteksi</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{deteksiData.deteksi.objekTerdeteksi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Nasabah Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">Informasi Nasabah</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama</p>
                  <p className="text-sm font-semibold text-gray-900">{deteksiData.nasabah.nama}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID Nasabah</p>
                  <p className="text-sm font-semibold text-gray-900">{deteksiData.nasabah.idNasabah}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                  <p className="text-sm font-semibold text-gray-900">{deteksiData.nasabah.tanggal}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Waktu</p>
                  <p className="text-sm font-semibold text-gray-900">{deteksiData.nasabah.waktu}</p>
                </div>
              </div>
            </div>

            {/* Detail Sampah */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">Detail Sampah</h3>
              </div>
              <div className="space-y-3">
                {deteksiData.sampah.map((item, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.jenis}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Berat: {item.berat}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${getBadgeColor(item.kategori)}`}>
                        {item.kategori}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-green-600">Harga: {item.harga}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total Pembayaran</span>
                  <span className="text-lg font-bold text-green-600">{deteksiData.totalPembayaran}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Textarea untuk catatan (tampil saat akan menolak) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catatan Penolakan (Opsional)
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tulis alasan penolakan jika diperlukan..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                />
              </div>

              <button 
                onClick={handleSetuju}
                className="w-full px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Setujui Setoran
              </button>

              <button 
                onClick={handleTolak}
                className="w-full px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tolak Setoran
              </button>

              <button 
                onClick={handleEditData}
                className="w-full px-4 py-3 bg-white text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Data
              </button>
            </div>

            {/* Catatan Verifikasi */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Catatan Verifikasi</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Setelah otomatis sekor dapat terkirim atau berhasil anomali dari transaksi akan tersedia dalam sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Data Sampah</h2>
            <button 
              onClick={handleCloseModal}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">
              {editedData?.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">Item {index + 1}</h3>
                    {editedData.length > 1 && (
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Sampah</label>
                      <input
                        type="text"
                        value={item.jenis}
                        onChange={(e) => handleEditItemChange(index, 'jenis', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        placeholder="Contoh: Botol Plastik"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                      <select
                        value={item.kategori}
                        onChange={(e) => handleEditItemChange(index, 'kategori', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      >
                        <option value="PET">PET</option>
                        <option value="ALU">ALU</option>
                        <option value="PAPER">PAPER</option>
                        <option value="GLASS">GLASS</option>
                        <option value="HDPE">HDPE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Berat</label>
                      <input
                        type="text"
                        value={item.berat}
                        onChange={(e) => handleEditItemChange(index, 'berat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        placeholder="Contoh: 2.5 kg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Harga</label>
                      <input
                        type="text"
                        value={item.harga}
                        onChange={(e) => handleEditItemChange(index, 'harga', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        placeholder="Contoh: Rp 5.000"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Item Button */}
              <button
                onClick={handleAddItem}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Item Sampah
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
