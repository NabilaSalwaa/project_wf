import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nik: '',
    email: '',
    noTelepon: '',
    alamat: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: 'Tangerang',
    provinsi: 'Banten',
    kodePos: '',
    jenisKelamin: '',
    tanggalLahir: '',
    pekerjaan: '',
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

    // Simulasi submit (nanti bisa diganti dengan API call)
    setTimeout(() => {
      alert('Pendaftaran berhasil! Akun Anda akan diverifikasi oleh admin dalam 1x24 jam.');
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 py-12 px-4">
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
            <h1 className="text-3xl font-bold mb-2">Formulir Pendaftaran Nasabah</h1>
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
                    NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="16 digit NIK"
                    maxLength="16"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Telepon/WhatsApp <span className="text-red-500">*</span>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    placeholder="Masukkan pekerjaan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-simgreen-500">
                Alamat Lengkap
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Jalan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Jalan, RT/RW, Nomor Rumah"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelurahan/Desa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleChange}
                    placeholder="Nama kelurahan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleChange}
                    placeholder="Nama kecamatan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kabupaten"
                    value={formData.kabupaten}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Pos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kodePos"
                    value={formData.kodePos}
                    onChange={handleChange}
                    placeholder="15xxx"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
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
