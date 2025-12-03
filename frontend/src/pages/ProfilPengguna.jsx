import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function ProfilPengguna() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');
  const [photoPreview, setPhotoPreview] = useState(localStorage.getItem('profilePhoto') || '');
  
  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];
  
  // Profile data
  const [profileData, setProfileData] = useState({
    namaLengkap: 'Ahmad Rizki',
    email: 'ahmad.rizki@gmail.com',
    nomorTelepon: '+62 812 3458 7890',
    tanggalLahir: '1990-05-15',
    alamat: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110'
  });

  // Password data
  const [passwordData, setPasswordData] = useState({
    passwordLama: '',
    passwordBaru: '',
    konfirmasiPassword: ''
  });

  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: 'Bank Central Asia (BCA)',
      rekening: '**** **** **** 1234',
      atasNama: 'Sarah Johnson',
      status: 'Aktif',
      isActive: true
    },
    {
      id: 2,
      bank: 'Bank Mandiri',
      rekening: '**** **** **** 5678',
      atasNama: 'Sarah Johnson',
      status: 'Tidak Aktif',
      isActive: false
    }
  ]);

  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newBankData, setNewBankData] = useState({
    bank: '',
    rekening: '',
    atasNama: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simpan foto profil ke localStorage
    if (profilePhoto) {
      localStorage.setItem('profilePhoto', profilePhoto);
    }
    alert('Data profil berhasil diperbarui!');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }
      
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (confirm('Apakah Anda yakin ingin menghapus foto profil?')) {
      setProfilePhoto('');
      setPhotoPreview('');
      localStorage.removeItem('profilePhoto');
    }
  };

  const handleSavePhoto = () => {
    if (profilePhoto) {
      localStorage.setItem('profilePhoto', profilePhoto);
      alert('Foto profil berhasil disimpan!');
      // Refresh halaman agar foto langsung tampil di header
      window.location.reload();
    } else {
      alert('Silakan pilih foto terlebih dahulu!');
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.passwordBaru !== passwordData.konfirmasiPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }
    alert('Password berhasil diperbarui!');
    setPasswordData({ passwordLama: '', passwordBaru: '', konfirmasiPassword: '' });
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    const newBank = {
      id: bankAccounts.length + 1,
      bank: newBankData.bank,
      rekening: newBankData.rekening,
      atasNama: newBankData.atasNama,
      status: 'Tidak Aktif',
      isActive: false
    };
    setBankAccounts([...bankAccounts, newBank]);
    setShowAddBankModal(false);
    setNewBankData({ bank: '', rekening: '', atasNama: '' });
    alert('Rekening bank berhasil ditambahkan!');
  };

  const handleDeleteBank = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus rekening ini?')) {
      setBankAccounts(bankAccounts.filter(bank => bank.id !== id));
    }
  };

  const handleToggleActiveBank = (id) => {
    setBankAccounts(bankAccounts.map(bank => ({
      ...bank,
      isActive: bank.id === id,
      status: bank.id === id ? 'Aktif' : 'Tidak Aktif'
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 px-8 pt-8 pb-20 overflow-y-auto max-h-screen">
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
            <h1 className="text-2xl font-bold text-gray-800">Kelola Profil</h1>
            <p className="text-sm text-gray-500">Perbarui informasi pribadi dan pengaturan akun Anda</p>
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
              {photoPreview ? (
                <img 
                  src={photoPreview} 
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

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === 'profile'
                    ? 'border-simgreen-600 text-simgreen-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Data Diri
                </div>
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === 'password'
                    ? 'border-simgreen-600 text-simgreen-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Ganti Password
                </div>
              </button>
              <button
                onClick={() => setActiveTab('bank')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === 'bank'
                    ? 'border-simgreen-600 text-simgreen-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Kelola Rekening Bank
                </div>
              </button>
              <button
                onClick={() => setActiveTab('photo')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === 'photo'
                    ? 'border-simgreen-600 text-simgreen-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Foto Profil
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Edit Data Diri Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-simgreen-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Edit Data Diri</h3>
                    <p className="text-sm text-gray-500">Perbarui informasi pribadi Anda</p>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={profileData.namaLengkap}
                        onChange={(e) => setProfileData({ ...profileData, namaLengkap: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={profileData.nomorTelepon}
                        onChange={(e) => setProfileData({ ...profileData, nomorTelepon: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={profileData.tanggalLahir}
                        onChange={(e) => setProfileData({ ...profileData, tanggalLahir: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={profileData.alamat}
                      onChange={(e) => setProfileData({ ...profileData, alamat: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      placeholder="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Ganti Password Tab */}
            {activeTab === 'password' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Ganti Password</h3>
                    <p className="text-sm text-gray-500">Pastikan password Anda kuat dan aman</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Lama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={passwordData.passwordLama}
                      onChange={(e) => setPasswordData({ ...passwordData, passwordLama: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Baru <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={passwordData.passwordBaru}
                      onChange={(e) => setPasswordData({ ...passwordData, passwordBaru: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={passwordData.konfirmasiPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, konfirmasiPassword: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Kelola Rekening Bank Tab */}
            {activeTab === 'bank' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Kelola Rekening Bank</h3>
                      <p className="text-sm text-gray-500">Tambah, edit, atau hapus rekening untuk penarikan saldo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className="px-4 py-2 bg-simgreen-600 hover:bg-simgreen-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Rekening
                  </button>
                </div>

                <div className="space-y-4">
                  {bankAccounts.map((bank) => (
                    <div key={bank.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-simgreen-300 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{bank.bank}</div>
                          <div className="text-sm text-gray-500">{bank.rekening}</div>
                          <div className="text-xs text-gray-400">{bank.atasNama}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          bank.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {bank.status}
                        </span>
                        {!bank.isActive && (
                          <button
                            onClick={() => handleToggleActiveBank(bank.id)}
                            className="p-2 text-simgreen-600 hover:bg-simgreen-50 rounded-lg transition"
                            title="Aktifkan"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBank(bank.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Foto Profil Tab */}
            {activeTab === 'photo' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Foto Profil</h3>
                    <p className="text-sm text-gray-500">Upload foto profil Anda</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8">
                  {/* Preview Foto */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-simgreen-100 to-simgreen-200 flex items-center justify-center">
                          <svg className="w-16 h-16 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-0 right-0 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition"
                        title="Hapus Foto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Tombol Upload */}
                  <div className="flex gap-3">
                    <label className="px-6 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition cursor-pointer flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleSavePhoto}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Simpan Foto
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Panduan Upload Foto:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Format yang didukung: JPG, PNG, GIF</li>
                          <li>Ukuran maksimal: 5MB</li>
                          <li>Gunakan foto dengan latar belakang jelas</li>
                          <li>Foto akan otomatis tersimpan di browser Anda</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Bank Modal */}
      {showAddBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Tambah Rekening Bank</h3>
              <button
                onClick={() => setShowAddBankModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddBank} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Bank <span className="text-red-500">*</span>
                </label>
                <select
                  value={newBankData.bank}
                  onChange={(e) => setNewBankData({ ...newBankData, bank: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Pilih Bank</option>
                  <option value="Bank Central Asia (BCA)">Bank Central Asia (BCA)</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank BRI">Bank BRI</option>
                  <option value="Bank BNI">Bank BNI</option>
                  <option value="Bank BTN">Bank BTN</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBankData.rekening}
                  onChange={(e) => setNewBankData({ ...newBankData, rekening: e.target.value })}
                  placeholder="1234567890"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atas Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBankData.atasNama}
                  onChange={(e) => setNewBankData({ ...newBankData, atasNama: e.target.value })}
                  placeholder="Ahmad Rizki"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition"
                >
                  Tambah Rekening
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddBankModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
