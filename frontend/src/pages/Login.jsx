import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login gagal');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Green Panel */}
        <div className="p-12 bg-gradient-to-br from-simgreen-600 to-simgreen-500 text-white flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="white" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-xl">BANGKIT</div>
              <div className="text-sm opacity-90">Bank Sampah Digital</div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Selamat Datang Kembali!
          </h2>
          <p className="text-white/90 mb-10 leading-relaxed">
            Masuk ke akun Anda untuk mengelola sampah, memantau tabungan, dan berkontribusi pada lingkungan yang lebih bersih.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">Pantau Tabungan</div>
                <div className="text-sm text-white/80">Lihat saldo dan riwayat transaksi sampah Anda</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">Dampak Lingkungan</div>
                <div className="text-sm text-white/80">Lacak kontribusi Anda untuk bumi yang lebih hijau</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">Tukar Reward</div>
                <div className="text-sm text-white/80">Dapatkan hadiah menarik dari tabungan sampah</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Nasabah</h3>
          <p className="text-sm text-gray-500 mb-8">Masukkan kredensial Anda untuk melanjutkan</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  type="email" 
                  placeholder="contoh@email.com" 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none transition"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password" 
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none transition"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-simgreen-600 focus:ring-simgreen-500"
                />
                Ingat saya
              </label>
              <a className="text-sm text-simgreen-600 hover:text-simgreen-700 font-medium" href="#">
                Lupa password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Loading...' : 'Login'}
              {!loading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-400 mb-3">ATAU</div>
            <div className="border-t pt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <svg className="w-5 h-5 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <span>Belum punya akun?</span>
              </div>
              <a 
                href="#" 
                className="text-simgreen-600 hover:text-simgreen-700 text-sm font-medium inline-flex items-center gap-1"
              >
                Klik di sini untuk daftar melalui Google Form
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Butuh bantuan?</p>
            <a href="#" className="text-sm text-simgreen-600 hover:text-simgreen-700 font-medium">
              Hubungi support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
