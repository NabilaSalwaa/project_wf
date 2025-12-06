import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function RiwayatTransaksi() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua Transaksi');
  const [filterPeriode, setFilterPeriode] = useState('30 Hari Terakhir');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');

  const notifications = [
    { id: 1, type: 'success', title: 'Setoran Berhasil', message: 'Setoran sampah 2.5 kg telah diterima', time: '5 menit lalu', unread: true },
    { id: 2, type: 'info', title: 'Poin Ditambahkan', message: 'Anda mendapat 125 poin dari setoran terakhir', time: '1 jam lalu', unread: true },
    { id: 3, type: 'warning', title: 'Penarikan Diproses', message: 'Penarikan saldo Rp 150.000 sedang diproses', time: '3 jam lalu', unread: false },
    { id: 4, type: 'info', title: 'Tips Pemilahan', message: 'Pisahkan sampah organik dan anorganik untuk poin lebih', time: '1 hari lalu', unread: false },
  ];

  // Data transaksi - gabungkan dummy + localStorage
  const getTransaksiData = () => {
    const dummyTransaksi = [
      {
        id: 'TRX-2025-001247',
        idNumber: '1247',
        jenis: 'Setor',
        tanggal: '15 Nov 2025',
        waktu: '14:30 WIB',
        jumlah: 2500000,
        status: 'Berhasil',
        statusColor: 'text-green-600',
        statusBg: 'bg-green-100',
        icon: 'setor',
        kategori: 'Anorganik',
        beratSampah: '15 kg',
        jenisSampah: 'Plastik, Kardus',
        poin: 250
      },
      {
        id: 'TRX-2025-001246',
        idNumber: '1246',
        jenis: 'Tarik',
        tanggal: '14 Nov 2025',
        waktu: '09:15 WIB',
        jumlah: 1000000,
        status: 'Berhasil',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
      icon: 'tarik'
    },
    {
      id: 'TRX-2025-001245',
      idNumber: '1245',
      jenis: 'Setor',
      tanggal: '13 Nov 2025',
      waktu: '16:45 WIB',
      jumlah: 750000,
      status: 'Pending',
      statusColor: 'text-yellow-600',
      statusBg: 'bg-yellow-100',
      icon: 'setor',
      kategori: 'Organik',
      beratSampah: '10 kg',
      jenisSampah: 'Daun Kering, Sisa Makanan',
      poin: 150
    },
    {
      id: 'TRX-2025-001244',
      idNumber: '1244',
      jenis: 'Tarik',
      tanggal: '12 Nov 2025',
      waktu: '11:20 WIB',
      jumlah: 500000,
      status: 'Gagal',
      statusColor: 'text-red-600',
      statusBg: 'bg-red-100',
      icon: 'tarik'
    },
    {
      id: 'TRX-2025-001243',
      idNumber: '1243',
      jenis: 'Setor',
      tanggal: '11 Nov 2025',
      waktu: '08:30 WIB',
      jumlah: 3200000,
      status: 'Berhasil',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
      icon: 'setor',
      kategori: 'Anorganik',
      beratSampah: '25 kg',
      jenisSampah: 'Botol Kaca, Kaleng, Besi',
      poin: 320
    }
  ];

    // Ambil transaksi dari localStorage
    const localTransaksi = JSON.parse(localStorage.getItem('riwayatTransaksi') || '[]');
    
    // Format transaksi dari localStorage agar sesuai dengan struktur dummy
    const formattedLocalTransaksi = localTransaksi.map(trx => ({
      ...trx,
      idNumber: trx.id.split('-').pop(),
      statusColor: trx.status === 'Diproses' || trx.status === 'Pending' ? 'text-yellow-600' : trx.status === 'Berhasil' ? 'text-green-600' : 'text-red-600',
      statusBg: trx.status === 'Diproses' || trx.status === 'Pending' ? 'bg-yellow-100' : trx.status === 'Berhasil' ? 'bg-green-100' : 'bg-red-100',
      icon: trx.jenis === 'Setor' ? 'setor' : 'tarik'
    }));
    
    // Gabungkan dan urutkan berdasarkan timestamp
    return [...formattedLocalTransaksi, ...dummyTransaksi].sort((a, b) => {
      return (b.timestamp || 0) - (a.timestamp || 0);
    });
  };

  const allTransaksi = getTransaksiData();

  // Filter transaksi
  const filteredTransaksi = allTransaksi.filter(trx => {
    const matchSearch = trx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchJenis = filterJenis === 'Semua Transaksi' || trx.jenis === filterJenis;
    const matchStatus = filterStatus === 'Semua Status' || trx.status === filterStatus;
    return matchSearch && matchJenis && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransaksi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransaksi = filteredTransaksi.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLihatDetail = (trxId) => {
    const transaction = allTransaksi.find(t => t.id === trxId);
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleExportData = () => {
    // Convert data to CSV
    const headers = ['Nomor Referensi', 'ID', 'Jenis Transaksi', 'Tanggal', 'Waktu', 'Jumlah', 'Status'];
    const csvData = filteredTransaksi.map(trx => [
      trx.id,
      trx.idNumber,
      trx.jenis,
      trx.tanggal,
      trx.waktu,
      trx.jumlah,
      trx.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `riwayat-transaksi-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCetakStruk = (transaction) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    const strukHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Struk Transaksi - ${transaction.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Courier New', monospace;
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
          }
          .struk {
            border: 2px dashed #333;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #333;
            padding-bottom: 15px;
            margin-bottom: 15px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #16a34a;
          }
          .subtitle {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
          .content {
            margin-bottom: 15px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 14px;
          }
          .label {
            color: #666;
          }
          .value {
            font-weight: bold;
            text-align: right;
          }
          .divider {
            border-top: 1px dashed #999;
            margin: 15px 0;
          }
          .total {
            text-align: center;
            padding: 15px 0;
            border-top: 2px dashed #333;
            border-bottom: 2px dashed #333;
            margin: 15px 0;
          }
          .total-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
          }
          .total-amount {
            font-size: 28px;
            font-weight: bold;
            color: ${transaction.icon === 'setor' ? '#16a34a' : '#dc2626'};
          }
          .status {
            text-align: center;
            padding: 10px;
            margin: 15px 0;
            background: ${transaction.status === 'Berhasil' ? '#dcfce7' : transaction.status === 'Pending' ? '#fef9c3' : '#fee2e2'};
            border-radius: 8px;
          }
          .status-text {
            font-weight: bold;
            color: ${transaction.status === 'Berhasil' ? '#16a34a' : transaction.status === 'Pending' ? '#ca8a04' : '#dc2626'};
            font-size: 16px;
          }
          .footer {
            text-align: center;
            font-size: 11px;
            color: #666;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px dashed #333;
          }
          .footer-note {
            margin-top: 10px;
            font-style: italic;
          }
          @media print {
            body {
              padding: 0;
            }
            .struk {
              border: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="struk">
          <div class="header">
            <div class="logo">🏦 BANGKIT</div>
            <div class="subtitle">Bank Sampah Digital</div>
            <div class="subtitle">Jl. Contoh No. 123, Kota</div>
          </div>

          <div class="status">
            <div class="status-text">${transaction.status === 'Berhasil' ? '✓ TRANSAKSI BERHASIL' : transaction.status === 'Pending' ? '⏱ SEDANG DIPROSES' : '✗ TRANSAKSI GAGAL'}</div>
          </div>

          <div class="content">
            <div class="row">
              <span class="label">No. Referensi</span>
              <span class="value">${transaction.id}</span>
            </div>
            <div class="row">
              <span class="label">ID Transaksi</span>
              <span class="value">${transaction.idNumber}</span>
            </div>
            <div class="row">
              <span class="label">Tanggal</span>
              <span class="value">${transaction.tanggal}</span>
            </div>
            <div class="row">
              <span class="label">Waktu</span>
              <span class="value">${transaction.waktu}</span>
            </div>
            <div class="row">
              <span class="label">Jenis Transaksi</span>
              <span class="value">${transaction.jenis} Sampah</span>
            </div>
          </div>

          ${transaction.icon === 'setor' ? `
            <div class="divider"></div>
            <div class="content">
              <div class="row">
                <span class="label">Kategori Sampah</span>
                <span class="value">${transaction.kategori || 'Anorganik'}</span>
              </div>
              <div class="row">
                <span class="label">Berat Sampah</span>
                <span class="value">${transaction.beratSampah || '15 kg'}</span>
              </div>
              <div class="row">
                <span class="label">Jenis Sampah</span>
                <span class="value">${transaction.jenisSampah || 'Plastik, Kardus'}</span>
              </div>
              <div class="row">
                <span class="label">Poin Didapat</span>
                <span class="value" style="color: #16a34a;">+${transaction.poin || 250} Poin</span>
              </div>
            </div>
          ` : `
            <div class="divider"></div>
            <div class="content">
              <div class="row">
                <span class="label">Bank Tujuan</span>
                <span class="value">Bank BCA</span>
              </div>
              <div class="row">
                <span class="label">No. Rekening</span>
                <span class="value">1234567890</span>
              </div>
              <div class="row">
                <span class="label">Atas Nama</span>
                <span class="value">Ahmad Rizki</span>
              </div>
              <div class="row">
                <span class="label">Biaya Admin</span>
                <span class="value" style="color: #dc2626;">-Rp 2.500</span>
              </div>
            </div>
          `}

          <div class="total">
            <div class="total-label">Total ${transaction.icon === 'setor' ? 'Setoran' : 'Penarikan'}</div>
            <div class="total-amount">
              ${transaction.icon === 'setor' ? '+' : '-'}Rp ${transaction.jumlah.toLocaleString()}
            </div>
          </div>

          <div class="footer">
            <div>Dicetak pada: ${new Date().toLocaleString('id-ID')}</div>
            <div class="footer-note">Terima kasih telah menggunakan BANGKIT</div>
            <div class="footer-note">Simpan struk ini sebagai bukti transaksi</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
          
          window.onafterprint = function() {
            window.close();
          };
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(strukHTML);
    printWindow.document.close();
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
            <h1 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
            <p className="text-sm text-gray-500">Pantau semua aktivitas keuangan Anda dalam satu tempat</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-simgreen-600 hover:bg-simgreen-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
            
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
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
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

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan nomor referensi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Jenis Transaksi */}
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
            >
              <option>Semua Transaksi</option>
              <option>Setor</option>
              <option>Tarik</option>
            </select>

            {/* Periode */}
            <select
              value={filterPeriode}
              onChange={(e) => setFilterPeriode(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
            >
              <option>30 Hari Terakhir</option>
              <option>7 Hari Terakhir</option>
              <option>3 Bulan Terakhir</option>
              <option>6 Bulan Terakhir</option>
              <option>1 Tahun Terakhir</option>
            </select>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-simgreen-500 focus:border-transparent outline-none"
            >
              <option>Semua Status</option>
              <option>Berhasil</option>
              <option>Pending</option>
              <option>Gagal</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Daftar Transaksi</h3>
            <p className="text-sm text-gray-500">Menampilkan {currentTransaksi.length} dari {filteredTransaksi.length} transaksi</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nomor Referensi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jenis Transaksi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransaksi.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{trx.id}</div>
                      <div className="text-xs text-gray-500">ID: {trx.idNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          trx.icon === 'setor' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {trx.icon === 'setor' ? (
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l5 5m0 0l5-5m-5 5V6" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{trx.jenis}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800">{trx.tanggal}</div>
                      <div className="text-xs text-gray-500">{trx.waktu}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-bold ${trx.icon === 'setor' ? 'text-green-600' : 'text-red-600'}`}>
                        {trx.icon === 'setor' ? '+' : '-'}Rp {trx.jumlah.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${trx.statusBg} ${trx.statusColor}`}>
                        {trx.status === 'Berhasil' && '● Berhasil'}
                        {trx.status === 'Pending' && '⏱ Pending'}
                        {trx.status === 'Diproses' && '⏱ Diproses'}
                        {trx.status === 'Gagal' && '✕ Gagal'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleLihatDetail(trx.id)}
                        className="flex items-center gap-1 text-simgreen-600 hover:text-simgreen-700 text-sm font-semibold"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Menampilkan</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-simgreen-500 outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>dari {filteredTransaksi.length} transaksi</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Sebelumnya
              </button>

              <div className="flex gap-1">
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      1
                    </button>
                    {currentPage > 3 && <span className="px-2 py-1 text-gray-400">...</span>}
                  </>
                )}

                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (page === currentPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm rounded ${
                          page === currentPage
                            ? 'bg-simgreen-600 text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span className="px-2 py-1 text-gray-400">...</span>}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Detail Transaksi</h3>
                <p className="text-sm text-gray-500">Informasi lengkap transaksi Anda</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${selectedTransaction.statusBg}`}>
                  {selectedTransaction.status === 'Berhasil' && (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {selectedTransaction.status === 'Pending' && (
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {selectedTransaction.status === 'Gagal' && (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className={`text-lg font-bold ${selectedTransaction.statusColor}`}>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              {/* Transaction Type */}
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                  selectedTransaction.icon === 'setor' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {selectedTransaction.icon === 'setor' ? (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l5 5m0 0l5-5m-5 5V6" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-gray-500 mb-1">Jenis Transaksi</div>
                <div className="text-xl font-bold text-gray-800">{selectedTransaction.jenis} Sampah</div>
              </div>

              {/* Amount */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500 mb-1">Jumlah</div>
                <div className={`text-3xl font-bold ${
                  selectedTransaction.icon === 'setor' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.icon === 'setor' ? '+' : '-'}Rp {selectedTransaction.jumlah.toLocaleString()}
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Informasi Transaksi</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Nomor Referensi</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedTransaction.id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">ID Transaksi</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedTransaction.idNumber}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Tanggal</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedTransaction.tanggal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Waktu</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedTransaction.waktu}</span>
                    </div>

                    {selectedTransaction.icon === 'setor' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Kategori Sampah</span>
                          <span className="text-sm font-semibold text-gray-800">{selectedTransaction.kategori || 'Anorganik'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Berat Sampah</span>
                          <span className="text-sm font-semibold text-gray-800">{selectedTransaction.beratSampah || '15 kg'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Jenis Sampah</span>
                          <span className="text-sm font-semibold text-gray-800">{selectedTransaction.jenisSampah || 'Plastik, Kardus'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Poin Didapat</span>
                          <span className="text-sm font-semibold text-green-600">+{selectedTransaction.poin || 250} Poin</span>
                        </div>
                      </>
                    )}

                    {selectedTransaction.icon === 'tarik' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Bank Tujuan</span>
                          <span className="text-sm font-semibold text-gray-800">Bank BCA</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">No. Rekening</span>
                          <span className="text-sm font-semibold text-gray-800">1234567890</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Atas Nama</span>
                          <span className="text-sm font-semibold text-gray-800">Ahmad Rizki</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Biaya Admin</span>
                          <span className="text-sm font-semibold text-red-600">-Rp 2.500</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleCetakStruk(selectedTransaction);
                  }}
                  className="flex-1 px-4 py-2.5 bg-simgreen-600 hover:bg-simgreen-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Cetak Struk
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
