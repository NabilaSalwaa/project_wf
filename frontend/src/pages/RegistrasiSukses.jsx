import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiMail, FiUser, FiArrowRight } from 'react-icons/fi';

export default function RegistrasiSukses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(30); // 30 detik untuk screenshot
  const userData = location.state?.userData || {};

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Redirect when countdown reaches 0
    if (countdown === 0) {
      navigate('/', { replace: true });
    }
  }, [countdown, navigate]);

  const handleLoginNow = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
          {/* Header dengan Icon Success */}
          <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce">
              <FiCheckCircle className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-white/90 text-lg">
              Selamat datang di BANGKIT Bank Sampah Digital
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Info Akun */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-simgreen-300 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-simgreen-200">
                <div className="p-2 bg-simgreen-100 rounded-lg">
                  <FiUser className="text-simgreen-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Informasi Akun Anda
                </h3>
              </div>
              <div className="space-y-4">
                {userData.name && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-simgreen-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-simgreen-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Nama:</p>
                        <p className="text-base font-bold text-gray-800">{userData.name}</p>
                      </div>
                    </div>
                  </div>
                )}
                {userData.email && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiMail className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Email:</p>
                        <p className="text-base font-bold text-gray-800 break-all">{userData.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instruksi */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📋</span>
                <h3 className="text-xl font-bold text-gray-800">Langkah Selanjutnya</h3>
              </div>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-simgreen-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <span className="pt-0.5">Akun Anda sudah aktif dan siap digunakan</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-simgreen-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <span className="pt-0.5">Login menggunakan email dan password yang telah didaftarkan</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-simgreen-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <span className="pt-0.5">Mulai menabung sampah dan dapatkan saldo digital</span>
                </li>
              </ol>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl mb-2">♻️</div>
                <h4 className="font-semibold text-gray-800 text-sm">Setor Sampah</h4>
                <p className="text-xs text-gray-600 mt-1">Kelola sampah dengan mudah</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-800 text-sm">Saldo Digital</h4>
                <p className="text-xs text-gray-600 mt-1">Pantau tabungan real-time</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold text-gray-800 text-sm">Ramah Lingkungan</h4>
                <p className="text-xs text-gray-600 mt-1">Berkontribusi untuk bumi</p>
              </div>
            </div>

            {/* Auto Redirect Info */}
            <div className="text-center py-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                Anda akan diarahkan ke halaman login dalam{' '}
                <span className="font-bold text-simgreen-600 text-xl">{countdown}</span> detik
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleLoginNow}
                className="flex-1 px-8 py-4 bg-simgreen-600 hover:bg-simgreen-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Login Sekarang
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Butuh bantuan?{' '}
            <a href="mailto:support@bangkit.com" className="text-simgreen-600 hover:text-simgreen-700 font-semibold">
              Hubungi Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
