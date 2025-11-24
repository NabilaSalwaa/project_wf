import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-simgreen-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <div className="font-bold text-gray-800">BANGKIT</div>
              <div className="text-xs text-gray-500">Bank Sampah Digital</div>
            </div>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-simgreen-600">Tentang</a>
            <a href="#" className="text-gray-600 hover:text-simgreen-600">Layanan</a>
            <a href="#" className="text-gray-600 hover:text-simgreen-600">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-simgreen-600 leading-tight mb-6">
            Ubah Sampah<br />Jadi Tabungan!
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Kelola sampah Anda dengan bijak dan dapatkan manfaat ekonomi dari daur ulang. Bergabunglah dengan gerakan ekonomi sirkular untuk masa depan yang lebih bersih.
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="bg-simgreen-500 hover:bg-simgreen-600 text-white px-6 py-3 rounded-lg shadow-md font-medium mb-4"
          >
            Masuk Sekarang →
          </button>
          
          <p className="text-sm text-gray-500 mb-8">
            Belum punya akun?{' '}
            <a href="#" className="text-simgreen-600 underline">Daftar melalui Google Form</a>
          </p>

          <div className="flex gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-simgreen-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl">5000+</div>
                <div className="text-sm text-gray-500">Nasabah Aktif</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-simgreen-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl">50 Ton</div>
                <div className="text-sm text-gray-500">Sampah Terkelola</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 w-full max-w-md">
            <img 
              src="/assets/gambar1.png" 
              alt="Waste Management Illustration"
              className="w-full h-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-64 flex items-center justify-center text-green-600"><svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg></div>';
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-3">Kenali Lebih Dekat</h2>
          <p className="text-center text-gray-600 mb-12">
            Pelajari cara kerja dan manfaat bergabung dengan Bank Sampah
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-simgreen-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Edukasi Pengelolaan Sampah</h3>
              <p className="text-gray-600 text-sm mb-4">
                Pelajari cara memisah sampah dengan benar, mengenali jenis sampah yang dapat didaur ulang, dan pahami bagaimana...
              </p>
              <a href="#" className="text-simgreen-600 text-sm font-medium">Pelajari Lebih Lanjut →</a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-simgreen-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Cara Menabung Sampah</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ikuti langkah mudah untuk mulai menabung sampah ke bank sampah terdekat dan dapatkan saldo dari penjua...
              </p>
              <a href="#" className="text-simgreen-600 text-sm font-medium">Pelajari Lebih Lanjut →</a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-simgreen-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Manfaat Ekonomi Sirkular</h3>
              <p className="text-gray-600 text-sm mb-4">
                Dapatkan nilai ekonomi dari pengelolaan sampah, bantu mengurangi jejak karbon, dan ikut berkontribusi pada ekono...
              </p>
              <a href="#" className="text-simgreen-600 text-sm font-medium">Pelajari Lebih Lanjut →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-simgreen-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Hijau Anda?
          </h2>
          <p className="text-white/90 mb-8">
            Bergabunglah dengan ribuan nasabah lainnya yang telah merasakan manfaat menabung sampah. Daftar sekarang dan mulai berkontribusi untuk masa depan yang lebih baik.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-simgreen-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg"
            >
              Masuk Sekarang
            </button>
            <button className="bg-simgreen-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-simgreen-800 transition border border-white/20">
              Daftar Sekarang →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-simgreen-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <div className="font-bold text-white">BANGKIT</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Sistem Informasi Bank Sampah yang memudahkan pengelolaan daur ulang untuk masa depan berkelanjutan.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-simgreen-400">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-simgreen-400">Menabung Data</a></li>
              <li><a href="#" className="hover:text-simgreen-400">Tukar Reward</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-simgreen-400">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-simgreen-400">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-simgreen-400">FAQ</a></li>
              <li><a href="#" className="hover:text-simgreen-400">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                bangkit@email.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 BANGKIT. Semua hak dilindungi.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
