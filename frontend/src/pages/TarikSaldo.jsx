import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function TarikSaldo() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saldoVisible, setSaldoVisible] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaBank: '',
    nomorRekening: '',
    atasNama: '',
    jumlahPenarikan: ''
  });
  const [selectedAmount, setSelectedAmount] = useState(null);

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  const saldoTersedia = 1250000;
  const minPenarikan = 50000;
  const maxPenarikan = 1250000;

  const quickAmounts = [100000, 250000, 500000];

  const riwayatPenarikan = [
    {
      id: 1,
      bank: 'Bank BCA',
      rekening: '1234567890',
      tanggal: '10 Nov 2025, 14:35',
      jumlah: 500000,
      status: 'Berhasil',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
      icon: '✓'
    },
    {
      id: 2,
      bank: 'Bank Mandiri',
      rekening: '0876543210',
      tanggal: '15 Nov 2025, 10:20',
      jumlah: 250000,
      status: 'Diproses',
      statusColor: 'text-yellow-600',
      statusBg: 'bg-yellow-100',
      icon: '⏱'
    }
  ];

  const handleQuickAmount = (amount) => {
    setSelectedAmount(amount);
    setFormData({ ...formData, jumlahPenarikan: amount.toString() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'jumlahPenarikan') {
      setSelectedAmount(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const jumlah = parseInt(formData.jumlahPenarikan);
    
    if (!formData.namaBank || !formData.nomorRekening || !formData.atasNama || !formData.jumlahPenarikan) {
      alert('Harap lengkapi semua field!');
      return;
    }

    if (jumlah < minPenarikan) {
      alert(`Minimal penarikan Rp ${minPenarikan.toLocaleString()}`);
      return;
    }

    if (jumlah > saldoTersedia) {
      alert('Saldo tidak mencukupi!');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menarik saldo Rp ${jumlah.toLocaleString()}?`)) {
      alert('Permintaan penarikan berhasil dikirim! Akan diproses dalam 1-2 hari kerja.');
      setFormData({
        namaBank: '',
        nomorRekening: '',
        atasNama: '',
        jumlahPenarikan: ''
      });
      setSelectedAmount(null);
    }
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
            <h1 className="text-2xl font-bold text-gray-800">Penarikan Saldo</h1>
            <p className="text-sm text-gray-500">Tarik dana saldo ke rekening Anda untuk rekening bank</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Saldo Card */}
            <div className="bg-gradient-to-r from-simgreen-600 to-simgreen-500 rounded-lg mb-4 text-white overflow-hidden transition-all duration-300">
              <div 
                onClick={() => setSaldoVisible(!saldoVisible)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-simgreen-700/20 transition"
              >
                <div className="flex-1">
                  <div className="text-xs text-white/80 mb-1">Saldo Tersedia</div>
                  <div className={`font-bold transition-all duration-300 ${saldoVisible ? 'text-2xl' : 'text-lg'}`}>
                    {saldoVisible ? `Rp ${saldoTersedia.toLocaleString()}` : 'Rp ••••••••'}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    {saldoVisible ? 'Dapat ditarik kapan saja' : 'Klik untuk melihat saldo'}
                  </div>
                </div>
                <button 
                  type="button"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                >
                  {saldoVisible ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-simgreen-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-simgreen-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Form Penarikan Saldo</h2>
                  <p className="text-xs text-gray-500">Isi form rekening bank untuk pencairan saldo</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Bank */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nama Bank <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="namaBank"
                    value={formData.namaBank}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Pilih Bank</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BTN">Bank BTN</option>
                    <option value="Bank CIMB Niaga">Bank CIMB Niaga</option>
                    <option value="Bank Permata">Bank Permata</option>
                    <option value="Bank Danamon">Bank Danamon</option>
                  </select>
                </div>

                {/* Nomor Rekening */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nomor Rekening <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nomorRekening"
                    value={formData.nomorRekening}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor rekening"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Atas Nama */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Atas Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="atasNama"
                    value={formData.atasNama}
                    onChange={handleInputChange}
                    placeholder="Nama pemilik rekening"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Jumlah Penarikan */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Jumlah Penarikan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
                      Rp
                    </span>
                    <input
                      type="number"
                      name="jumlahPenarikan"
                      value={formData.jumlahPenarikan}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>Minimum Rp {minPenarikan.toLocaleString()}</span>
                    <span>Maximum Rp {maxPenarikan.toLocaleString()}</span>
                  </div>
                </div>

                {/* Jumlah Cepat */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Jumlah Cepat</label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAmount(amount)}
                        className={`px-3 py-2 text-sm rounded-lg border-2 font-semibold transition ${
                          selectedAmount === amount
                            ? 'bg-simgreen-600 border-simgreen-600 text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-simgreen-500'
                        }`}
                      >
                        Rp {(amount / 1000).toFixed(0)}K
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, jumlahPenarikan: saldoTersedia.toString() });
                        setSelectedAmount('all');
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border-2 font-semibold transition ${
                        selectedAmount === 'all'
                          ? 'bg-simgreen-600 border-simgreen-600 text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-simgreen-500'
                      }`}
                    >
                      Semua
                    </button>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-blue-800">
                    <span className="font-semibold">Biaya Admin:</span> Biaya transfer disesuaikan Rp 2.500 akan digunakan per untuk transaksi
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white text-sm font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Kirim Permintaan Tarik
                </button>
              </form>
            </div>
          </div>

          {/* Riwayat Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">Riwayat Penarikan Terakhir</h3>
                <button className="text-xs text-simgreen-600 hover:text-simgreen-700 font-semibold">
                  Lihat Semua
                </button>
              </div>

              <div className="space-y-2.5">
                {riwayatPenarikan.map((item) => (
                  <div key={item.id} className="p-3 border border-gray-200 rounded-lg hover:border-simgreen-300 transition">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 ${item.statusBg} rounded-lg flex items-center justify-center text-base`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-xs">{item.bank}</div>
                          <div className="text-xs text-gray-500">{item.rekening}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="text-gray-500">{item.tanggal}</div>
                      <div className={`font-semibold ${item.statusColor}`}>{item.status}</div>
                    </div>
                    <div className="mt-1.5 text-right font-bold text-gray-800 text-sm">
                      Rp {item.jumlah.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
