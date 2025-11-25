import { FaBookOpen, FaPiggyBank, FaRecycle } from "react-icons/fa";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaListAlt, FaPhoneAlt } from 'react-icons/fa';

export default function SplashScreen() {
  const navigate = useNavigate();

  // Scroll to section by id
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-green-300 via-white to-green-100 font-sans">
      {/* Header & Logo */}
      <header className="flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-md">
            <svg className="w-8 h-8 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-3xl text-simgreen-700 tracking-wide">BANGKIT</div>
            <div className="text-base text-simgreen-600 font-medium">Bank Sampah Digital</div>
          </div>
        </div>
        <div className="flex gap-10 text-simgreen-600 font-semibold text-lg">
          <button className="flex items-center gap-2 hover:text-simgreen-700 transition" onClick={() => scrollToSection('tentang')}>
            <FaInfoCircle className="text-xl" />
            <span>Tentang</span>
          </button>
          <button className="flex items-center gap-2 hover:text-simgreen-700 transition" onClick={() => scrollToSection('layanan')}>
            <FaListAlt className="text-xl" />
            <span>Layanan</span>
          </button>
          <button className="flex items-center gap-2 hover:text-simgreen-700 transition" onClick={() => scrollToSection('kontak')}>
            <FaPhoneAlt className="text-xl" />
            <span>Kontak</span>
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full max-w-5xl mt-12 relative">
          {/* Left: Title & Button */}
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-simgreen-700 leading-tight mb-2">
              Ubah Sampah <br />Jadi Tabungan!
            </h1>
            <p className="text-gray-700 text-xl mb-4">
              Kelola sampah Anda dengan bijak dan dapatkan manfaat ekonomi dari daur ulang. Bergabunglah dengan gerakan ekonomi sirkular untuk masa depan yang lebih hijau.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-simgreen-600 text-white font-bold px-10 py-3 rounded-2xl shadow-xl hover:bg-simgreen-700 transition-all duration-200 w-fit mb-2 hover:scale-105"
            >
              Masuk Sekarang
            </button>
            <a
              href="https://forms.gle/your-google-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-simgreen-600 text-base font-semibold underline hover:text-simgreen-700 transition"
            >
              Daftar melalui Google Form
            </a>
            <div className="flex gap-12 mt-8">
              <div className="flex flex-col items-center bg-white rounded-xl shadow-md px-6 py-3 hover:scale-105 transition-all duration-200">
                <span className="text-3xl font-extrabold text-simgreen-700">5000+</span>
                <span className="text-base text-simgreen-600 font-medium">Nasabah Aktif</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-xl shadow-md px-6 py-3 hover:scale-105 transition-all duration-200">
                <span className="text-3xl font-extrabold text-simgreen-700">50 Ton</span>
                <span className="text-base text-simgreen-600 font-medium">Sampah Terolah</span>
              </div>
            </div>
          </div>
          {/* Right: Illustration + Card Rp 25 Juta+ */}
          <div className="flex items-center justify-center relative">
            <img src="/assets/gambar1.png" alt="Ilustrasi Sampah" className="w-full max-w-xs rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300" />
            <div className="absolute -bottom-10 right-0">
              <div className="bg-green-100 rounded-2xl shadow-xl px-8 py-5 flex items-center gap-4 hover:scale-105 transition-all duration-200">
                <div className="w-12 h-12 bg-simgreen-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-simgreen-600 font-semibold">Total Setoran</div>
                  <div className="font-extrabold text-simgreen-700 text-xl">Rp 25 Juta+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Section Info */}
        <section id="tentang" className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-extrabold text-simgreen-700 mb-8 text-center tracking-wide">Kenali Lebih Dekat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FaBookOpen className="text-3xl text-simgreen-600" />
              </div>
              <div className="font-bold text-xl mb-2 text-simgreen-700">Edukasi Pengelolaan Sampah</div>
              <div className="text-base text-simgreen-600 mb-6">Pelajari cara mengolah sampah dengan benar, sehingga sampah dapat didaur ulang dan dimanfaatkan secara optimal.</div>
              <a href="#" className="text-simgreen-600 text-base font-semibold hover:text-simgreen-700 transition">Pelajari Lebih Lanjut →</a>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FaPiggyBank className="text-3xl text-simgreen-600" />
              </div>
              <div className="font-bold text-xl mb-2 text-simgreen-700">Cara Menabung Sampah</div>
              <div className="text-base text-simgreen-600 mb-6">Ikuti langkah mudah untuk mulai menabung sampah, dan raih manfaat ekonomi serta lingkungan yang lebih baik untuk masa depan Anda.</div>
              <a href="#" className="text-simgreen-600 text-base font-semibold hover:text-simgreen-700 transition">Pelajari Lebih Lanjut →</a>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FaRecycle className="text-3xl text-simgreen-600" />
              </div>
              <div className="font-bold text-xl mb-2 text-simgreen-700">Manfaat Ekonomi Sirkular</div>
              <div className="text-base text-simgreen-600 mb-6">Dapatkan pengetahuan tentang manfaat ekonomi sirkular dan bagaimana sampah dapat menjadi sumber pendapatan baru.</div>
              <a href="#" className="text-simgreen-600 text-base font-semibold hover:text-simgreen-700 transition">Pelajari Lebih Lanjut →</a>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section id="layanan" className="w-full max-w-5xl mx-auto mt-16 mb-12">
          <div className="bg-green-200 rounded-3xl p-10 text-simgreen-700 shadow-2xl flex flex-col items-center">
            <h3 className="text-3xl font-extrabold mb-4 text-center">Siap Memulai Perjalanan Hijau Anda?</h3>
            <p className="text-simgreen-700 mb-8 text-center text-lg">Bergabunglah dengan ribuan nasabah lainnya yang telah merasakan manfaat menabung sampah. Daftar sekarang dan mulai berkontribusi untuk lingkungan yang lebih baik!</p>
            <div className="flex gap-6">
              <button
                onClick={() => navigate('/login')}
                className="bg-simgreen-600 text-white font-bold px-10 py-3 rounded-2xl shadow-xl hover:bg-simgreen-700 transition-all duration-200 hover:scale-105"
              >
                Masuk Sekarang
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-simgreen-600 font-bold px-10 py-3 rounded-2xl shadow-xl hover:bg-green-100 transition-all duration-200 hover:scale-105"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer id="kontak" className="bg-black py-10 px-6 text-white mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="font-extrabold text-xl mb-3">BANGKIT</div>
            <div className="text-base mb-2">Bank Sampah Digital</div>
            <div className="text-base">Aplikasi pengelolaan sampah yang membantu masyarakat menabung dan mengelola sampah secara finansial.</div>
          </div>
          <div>
            <div className="font-bold mb-3">Layanan</div>
            <div className="text-base">Setor Sampah</div>
            <div className="text-base">Penarikan Saldo</div>
            <div className="text-base">Transaksi</div>
          </div>
          <div>
            <div className="font-bold mb-3">Informasi</div>
            <div className="text-base">FAQ</div>
            <div className="text-base">Kebijakan Privasi</div>
            <div className="text-base">Riwayat Transaksi</div>
          </div>
          <div>
            <div className="font-bold mb-3">Kontak</div>
            <div className="text-base">Whatsapp: +62-812-3456-7890</div>
            <div className="text-base">Instagram: @banksampahdigital</div>
            <div className="text-base">Email: info@banksampah.id</div>
          </div>
        </div>
        <div className="mt-10 text-center text-base text-simgreen-600">
          © 2025 BANGKIT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
