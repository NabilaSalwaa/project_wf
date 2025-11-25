import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function SetorSampah() {
  const [formData, setFormData] = useState({
    kategori: '',
    jenis: '',
    berat: '',
    catatan: ''
  });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  const kategoriOptions = ['Organik', 'Anorganik'];
  const jenisOptions = {
    'Organik': ['Daun Kering', 'Sisa Makanan', 'Sayuran Busuk', 'Buah Busuk'],
    'Anorganik': ['Plastik', 'Kertas', 'Kardus', 'Botol Kaca', 'Kaleng', 'Besi']
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    // Cek apakah browser mendukung getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Browser Anda tidak mendukung akses kamera. Silakan gunakan tombol "Unggah Gambar".');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Create modal overlay
      const modal = document.createElement('div');
      modal.id = 'camera-modal';
      modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center;';
      
      // Create video element
      const video = document.createElement('video');
      video.autoplay = true;
      video.playsInline = true;
      video.style.cssText = 'max-width: 90%; max-height: 70vh; border-radius: 8px;';
      video.srcObject = stream;
      
      // Create buttons container
      const buttonsDiv = document.createElement('div');
      buttonsDiv.style.cssText = 'margin-top: 20px; display: flex; gap: 16px;';
      
      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Ambil Foto';
      captureBtn.style.cssText = 'padding: 12px 24px; background: #16a34a; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 600;';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Batal';
      cancelBtn.style.cssText = 'padding: 12px 24px; background: #dc2626; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 600;';
      
      buttonsDiv.appendChild(captureBtn);
      buttonsDiv.appendChild(cancelBtn);
      
      modal.appendChild(video);
      modal.appendChild(buttonsDiv);
      document.body.appendChild(modal);
      
      // Capture button click
      captureBtn.onclick = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          const file = new File([blob], 'camera-capture-' + Date.now() + '.jpg', { type: 'image/jpeg' });
          setImageFile(file);
          setImagePreview(canvas.toDataURL('image/jpeg', 0.9));
          
          // Stop camera and close modal
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
        }, 'image/jpeg', 0.9);
      };
      
      // Cancel button click
      cancelBtn.onclick = () => {
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(modal);
      };
      
    } catch (error) {
      console.error('Camera error:', error);
      if (error.name === 'NotAllowedError') {
        alert('Akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.');
      } else if (error.name === 'NotFoundError') {
        alert('Kamera tidak ditemukan. Pastikan perangkat Anda memiliki kamera.');
      } else if (error.name === 'NotSupportedError') {
        alert('Browser Anda tidak mendukung akses kamera melalui HTTP. Silakan gunakan HTTPS atau localhost.');
      } else {
        alert('Tidak dapat mengakses kamera: ' + error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Silakan upload gambar sampah terlebih dahulu!');
      return;
    }
    
    setLoading(true);
    
    // Simulasi upload & deteksi AI
    setTimeout(() => {
      setLoading(false);
      // Redirect ke halaman konfirmasi setelah deteksi selesai
      navigate('/konfirmasi-setoran');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 p-8 overflow-y-auto">
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
              <div className="w-10 h-10 bg-simgreen-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Ahmad Rizki</div>
                <div className="text-xs text-gray-500">Nasabah</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Image Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <img src={imagePreview} alt="Preview" className="mx-auto max-h-64 rounded-lg" />
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Hapus Gambar
                </button>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unggah Gambar Sampah</h3>
                <p className="text-sm text-gray-500 mb-6">Drag & drop gambar atau klik untuk memilih file</p>
                
                <div className="flex gap-4 justify-center">
                  <label className="px-6 py-3 bg-simgreen-600 text-white rounded-lg hover:bg-simgreen-700 cursor-pointer inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Unggah Gambar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Gunakan Kamera
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={loading || !imageFile}
            className="px-12 py-4 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Memproses...' : 'Setor Sampah'}
          </button>
        </div>
      </main>
    </div>
  );
}
