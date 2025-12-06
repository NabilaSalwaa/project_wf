import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nim_nip: '', // NIM untuk mahasiswa atau NIP untuk dosen/staff
    email: '',
    noTelepon: '',
    fakultas: '',
    prodi_unit: '', // Program Studi untuk mahasiswa atau Unit Kerja untuk dosen/staff
    jenisKelamin: '',
    statusCivitas: '', // Mahasiswa, Dosen, atau Staff
    angkatan: '', // Untuk mahasiswa
    password: '',
    konfirmasiPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi password
    if (formData.password !== formData.konfirmasiPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }

    setLoading(true);

    try {
      // Kirim data registrasi ke backend
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: formData.namaLengkap,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.konfirmasiPassword,
        nim_nip: formData.nim_nip,
        phone: formData.noTelepon,
        fakultas: formData.fakultas,
        prodi_unit: formData.prodi_unit,
        jenis_kelamin: formData.jenisKelamin,
        status_civitas: formData.statusCivitas,
        angkatan: formData.angkatan
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.user && response.data.token) {
        // Simpan token dan user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect ke halaman sukses dengan data user setelah loading 3 detik (untuk screenshot)
        setTimeout(() => {
          navigate('/registrasi-sukses', { 
            state: { 
              userData: response.data.user 
            },
            replace: true
          });
        }, 3000); // 3 detik delay untuk screenshot
      } else {
        alert('Pendaftaran gagal, silakan coba lagi.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error registrasi:', error);
      const message = error.response?.data?.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
      alert(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 py-12 px-4 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="w-16 h-16 border-4 border-simgreen-200 border-t-simgreen-600 rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-gray-800">Memproses Pendaftaran...</h3>
            <p className="text-gray-600 text-center text-sm">
              Mohon tunggu, kami sedang mendaftarkan akun Anda
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="white" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-2xl">BANGKIT</div>
                <div className="text-sm opacity-90">Bank Sampah Digital</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Formulir Pendaftaran Civitas Akademika</h1>
            <p className="text-white/90">Lengkapi data diri Anda untuk bergabung dengan BANGKIT</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {/* Data Pribadi */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-simgreen-500">
                Data Pribadi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Civitas <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="statusCivitas"
                    value={formData.statusCivitas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Pilih status</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Staff">Staff/Karyawan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.statusCivitas === 'Mahasiswa' ? 'NIM' : 'NIP'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nim_nip"
                    value={formData.nim_nip}
                    onChange={handleChange}
                    placeholder={formData.statusCivitas === 'Mahasiswa' ? 'Nomor Induk Mahasiswa' : 'Nomor Induk Pegawai'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Kampus <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@kampus.ac.id"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="noTelepon"
                    value={formData.noTelepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data Akademik */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-simgreen-500">
                Data Akademik
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fakultas <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fakultas"
                    value={formData.fakultas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Pilih fakultas</option>
                    <option value="Teknik">Fakultas Teknik</option>
                    <option value="Ekonomi dan Bisnis">Fakultas Ekonomi dan Bisnis</option>
                    <option value="MIPA">Fakultas MIPA</option>
                    <option value="Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                    <option value="Hukum">Fakultas Hukum</option>
                    <option value="Kedokteran">Fakultas Kedokteran</option>
                    <option value="Pertanian">Fakultas Pertanian</option>
                    <option value="Keguruan dan Ilmu Pendidikan">Fakultas Keguruan dan Ilmu Pendidikan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.statusCivitas === 'Mahasiswa' ? 'Program Studi' : 'Unit Kerja'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prodi_unit"
                    value={formData.prodi_unit}
                    onChange={handleChange}
                    placeholder={formData.statusCivitas === 'Mahasiswa' ? 'Contoh: Teknik Informatika' : 'Contoh: Bagian Akademik'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {formData.statusCivitas === 'Mahasiswa' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Angkatan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="angkatan"
                      value={formData.angkatan}
                      onChange={handleChange}
                      placeholder="Contoh: 2024"
                      min="2000"
                      max="2030"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      required={formData.statusCivitas === 'Mahasiswa'}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Keamanan Akun */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-simgreen-500">
                Keamanan Akun
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="konfirmasiPassword"
                    value={formData.konfirmasiPassword}
                    onChange={handleChange}
                    placeholder="Ketik ulang password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Persetujuan */}
            <div className="bg-green-50 border-2 border-simgreen-200 rounded-lg p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-simgreen-600 focus:ring-simgreen-500 mt-1"
                  required
                />
                <span className="text-sm text-gray-700">
                  Saya menyetujui <span className="font-semibold">Syarat dan Ketentuan</span> yang berlaku di BANGKIT Bank Sampah Digital dan bersedia mengikuti seluruh prosedur yang ditetapkan.
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </div>
          </div>
        </form>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-simgreen-600 hover:text-simgreen-700 font-semibold"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
