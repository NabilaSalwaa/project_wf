import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function SetorSampah() {
  const navigate = useNavigate();
  const [jenisSampah, setJenisSampah] = useState('');
  const [berat, setBerat] = useState('');
  const [hargaPerKg, setHargaPerKg] = useState('');
  const [catatan, setCatatan] = useState('');
  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [useCamera, setUseCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  const jenisSampahOptions = [
    { value: 'plastik', label: 'Plastik', harga: 2000 },
    { value: 'kertas', label: 'Kertas', harga: 1500 },
    { value: 'logam', label: 'Logam', harga: 5000 },
    { value: 'kaca', label: 'Kaca', harga: 1000 },
    { value: 'kardus', label: 'Kardus', harga: 1200 },
    { value: 'botol-plastik', label: 'Botol Plastik', harga: 2500 },
    { value: 'kaleng', label: 'Kaleng', harga: 3000 },
    { value: 'elektronik', label: 'Elektronik', harga: 4000 },
  ];

  const handleJenisChange = (value) => {
    setJenisSampah(value);
    const selected = jenisSampahOptions.find(opt => opt.value === value);
    if (selected) {
      setHargaPerKg(selected.harga);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      setUseCamera(true);
      
      // Tunggu sebentar lalu set srcObject
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
        }
      }, 100);
    } catch (err) {
      alert('Tidak dapat mengakses kamera: ' + err.message);
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setUseCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
        setFoto(file);
        setPreviewUrl(URL.createObjectURL(file));
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const handleSubmit = async () => {
    // Validasi
    if (!jenisSampah || !berat || !hargaPerKg || !foto) {
      alert('Semua field harus diisi dan foto harus diupload!');
      return;
    }

    setLoading(true);
    
    try {
      // Langsung kirim ke halaman konfirmasi tanpa hit backend dulu
      setTimeout(() => {
        setLoading(false);
        navigate('/konfirmasi-setoran', { 
          state: { 
            setoranData: {
              jenis_sampah: jenisSampah,
              berat: parseFloat(berat),
              harga_per_kg: parseFloat(hargaPerKg),
              total_harga: parseFloat(berat) * parseFloat(hargaPerKg),
              catatan,
              previewUrl,
              foto,
              timestamp: new Date().toISOString()
            }
          } 
        });
      }, 500);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('Terjadi kesalahan: ' + error.message);
    }
  };

  const totalHarga = berat && hargaPerKg ? parseFloat(berat) * parseFloat(hargaPerKg) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 p-8">
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
              <h1 className="text-2xl font-bold text-gray-800">Setor Sampah</h1>
              <p className="text-sm text-gray-500">Unggah foto sampah Anda untuk deteksi otomatis dan penilaian</p>
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
                  A
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-gray-800">Ahmad Rizki</div>
                <div className="text-xs text-gray-500">Nasabah</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container with Max Width */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jenis Sampah */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenis Sampah <span className="text-red-500">*</span>
                </label>
                <select
                  value={jenisSampah}
                  onChange={(e) => handleJenisChange(e.target.value)}
                  className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent"
                >
                  <option value="">Pilih jenis sampah</option>
                  {jenisSampahOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} (Rp {opt.harga.toLocaleString('id-ID')}/kg)
                    </option>
                  ))}
                </select>
              </div>

              {/* Berat */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Berat (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={berat}
                  onChange={(e) => setBerat(e.target.value)}
                  placeholder="Contoh: 2.5"
                  className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent"
                />
              </div>

              {/* Harga Per Kg (readonly) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga Per Kg
                </label>
                <input
                  type="text"
                  value={hargaPerKg ? `Rp ${parseFloat(hargaPerKg).toLocaleString('id-ID')}` : ''}
                  readOnly
                  className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-medium"
                />
              </div>

              {/* Total Harga */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total yang Diterima
                </label>
                <div className="w-full px-4 py-3 border-2 border-green-300 rounded-lg bg-green-50">
                  <p className="text-2xl font-bold text-simgreen-600">
                    {totalHarga > 0 ? `Rp ${totalHarga.toLocaleString('id-ID')}` : 'Rp 0'}
                  </p>
                </div>
              </div>
            </div>

            {/* Foto Sampah */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto Sampah <span className="text-red-500">*</span>
              </label>
              
              {!useCamera && !previewUrl && (
                <div className="space-y-3">
                  <label className="w-full flex items-center justify-center px-4 py-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-simgreen-500 hover:bg-gray-50 transition">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-600">Upload dari Galeri</p>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG hingga 10MB</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  
                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full px-4 py-4 bg-simgreen-500 text-white rounded-lg hover:bg-simgreen-600 transition flex items-center justify-center gap-2 font-semibold text-base"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ambil Foto dengan Kamera
                  </button>
                </div>
              )}

              {useCamera && (
                <div className="space-y-4">
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden border-2 border-simgreen-500 shadow-lg">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      muted
                      className="w-full object-cover rounded-xl"
                      style={{ height: '400px', width: '100%', display: 'block', backgroundColor: '#000' }}
                    />
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="px-6 py-4 bg-simgreen-500 text-white rounded-lg hover:bg-simgreen-600 transition font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
                    >
                      📸 Ambil Foto
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-6 py-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold text-lg shadow-lg"
                    >
                      ❌ Batal
                    </button>
                  </div>
                </div>
              )}

              {previewUrl && (
                <div className="space-y-3">
                  <div className="relative cursor-pointer group" onClick={() => window.open(previewUrl, '_blank')}>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-80 h-80 object-cover mx-auto rounded-lg border-2 border-gray-200 shadow-sm hover:border-simgreen-500 transition" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(previewUrl, '_blank');
                      }}
                      className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Lihat
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFoto(null);
                        setPreviewUrl('');
                      }}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Ganti
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Catatan */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={4}
                placeholder="Tambahkan catatan jika diperlukan..."
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Button Submit */}
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold text-lg"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-simgreen-500 to-simgreen-600 text-white font-semibold rounded-lg hover:from-simgreen-600 hover:to-simgreen-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : 'Lanjut ke Konfirmasi'}
              </button>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
