import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleGuest = async () => {
    setLoading(true);
    try {
      const res = await api.post('/guest-login');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Guest login gagal');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-simgreen-50 to-white p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-2">
        <div className="p-10 bg-gradient-to-b from-simgreen-600 to-simgreen-500 text-white left-decor">
          <div className="flex items-center gap-3 mb-8">
            <div className="brand-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8H9L12 2Z" fill="white" opacity="0.9"/></svg>
            </div>
            <div>
              <div className="font-bold text-lg">BANGKIT</div>
              <div className="text-xs opacity-80">Bank Sampah Digital</div>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold mb-2">Selamat Datang Kembali!</h2>
          <p className="opacity-90 mb-6">Masuk ke akun Anda untuk mengelola sampah, memantau tabungan, dan berkontribusi pada lingkungan yang lebih bersih.</p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-12 rounded flex items-center justify-center"> 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div className="font-semibold">Pantau Tabungan</div>
                <div className="text-xs opacity-90">Lihat saldo dan riwayat transaksi sampah Anda</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-12 rounded flex items-center justify-center"> 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/></svg>
              </div>
              <div>
                <div className="font-semibold">Dampak Lingkungan</div>
                <div className="text-xs opacity-90">Lacak kontribusi Anda untuk bumi yang lebih hijau</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-12 rounded flex items-center justify-center"> 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="1.5"/></svg>
              </div>
              <div>
                <div className="font-semibold">Tukar Reward</div>
                <div className="text-xs opacity-90">Dapatkan hadiah menarik dari tabungan sampah</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-10 bg-white">
          <h3 className="text-xl font-semibold mb-4">Login Nasabah</h3>
          <p className="text-sm text-gray-500 mb-6">Masukkan kredensial Anda untuk melanjutkan</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="contoh@email.com" className="mt-1 input" required />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <div className="relative">
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Masukkan password" className="mt-1 input pr-10" required />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"> 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Ingat saya</label>
              <a className="text-sm text-simgreen-600" href="#">Lupa password?</a>
            </div>

            <div className="flex gap-3 items-center">
              <button type="submit" disabled={loading} className="flex-1 btn-primary">{loading ? 'Loading...' : 'Login'}</button>
              <button type="button" onClick={handleGuest} disabled={loading} className="px-4 py-2 border rounded">Guest</button>
            </div>
          </form>

          <div className="mt-6 text-center text-gray-400">ATAU</div>

          <div className="mt-4 border rounded p-4 text-center">
            <div className="text-sm">Belum punya akun?</div>
            <a className="text-simgreen-600 text-sm" href="#">Klik di sini untuk daftar melalui Google Form</a>
          </div>
        </div>
      </div>
    </div>
  );
}
