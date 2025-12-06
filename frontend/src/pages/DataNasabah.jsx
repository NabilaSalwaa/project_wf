import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiPlus,
  FiEdit2,
  FiEye,
  FiTrash,
} from 'react-icons/fi';

const sidebarMenu = [
  {
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
    path: '/dashboard-admin'
  },
  {
    label: 'Data Nasabah',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
    path: '/admin/data-nasabah'
  },
  {
    label: 'Data Sampah + Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/data-sampah'
  },
  {
    label: 'Verifikasi Deteksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/verifikasi'
  },
  {
    label: 'Transaksi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
      </svg>
    ),
    path: '/admin/transaksi'
  },
  {
    label: 'Laporan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/laporan'
  },
  {
    label: 'Pengaturan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    path: '/admin/pengaturan'
  },
];

// Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 animate-fadeIn" 
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slideUp">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Data dummy nasabah
const initialNasabahData = [
  {
    id: 'N68001',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    phone: '+62 812-3456-7890',
    saldo: 15250000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=10B981&color=fff'
  },
  {
    id: 'N68002',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '+62 813-4567-8901',
    saldo: 8750000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=10B981&color=fff'
  },
  {
    id: 'N68003',
    name: 'Dewi Kusuma',
    email: 'dewi.kusuma@email.com',
    phone: '+62 814-5678-9012',
    saldo: 22500000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Dewi+Kusuma&background=10B981&color=fff'
  },
  {
    id: 'N68004',
    name: 'Ahmad Yani',
    email: 'ahmad.yani@email.com',
    phone: '+62 815-6789-0123',
    saldo: 5200000,
    status: 'Pending',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Yani&background=F59E0B&color=fff'
  },
  {
    id: 'N68005',
    name: 'Rina Wijaya',
    email: 'rina.wijaya@email.com',
    phone: '+62 816-7890-1234',
    saldo: 12800000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Rina+Wijaya&background=10B981&color=fff'
  },
  {
    id: 'N68006',
    name: 'Eko Prasetyo',
    email: 'eko.prasetyo@email.com',
    phone: '+62 817-8901-2345',
    saldo: 18950000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Eko+Prasetyo&background=10B981&color=fff'
  },
  {
    id: 'N68007',
    name: 'Lestari Indah',
    email: 'lestari.indah@email.com',
    phone: '+62 818-9012-3456',
    saldo: 3450000,
    status: 'Tidak Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Lestari+Indah&background=EF4444&color=fff'
  },
  {
    id: 'N68008',
    name: 'Fajar Setiawan',
    email: 'fajar.setiawan@email.com',
    phone: '+62 819-0123-4567',
    saldo: 28300000,
    status: 'Aktif',
    avatar: 'https://ui-avatars.com/api/?name=Fajar+Setiawan&background=10B981&color=fff'
  },
];

export default function DataNasabah() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(1); // Set Data Nasabah as active
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [sortFilter, setSortFilter] = useState('Urutkan Terbaru');
  const [nasabahData, setNasabahData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNasabah, setSelectedNasabah] = useState(null);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    saldo: 0,
    status: 'Aktif'
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch data nasabah dari backend
  useEffect(() => {
    fetchNasabahData();
    
    // Auto-refresh setiap 3 detik untuk real-time update
    const intervalId = setInterval(() => {
      fetchNasabahData();
    }, 3000); // 3 detik

    // Cleanup interval saat component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchNasabahData = async () => {
    try {
      // Only show loading spinner on first load
      if (isFirstLoad) {
        setLoading(true);
      }
      
      const response = await axios.get('http://127.0.0.1:8000/api/users/all');
      
      console.log('🔄 Data Nasabah refresh:', new Date().toLocaleTimeString());
      
      if (response.data.success) {
        // Transform data from backend to match frontend format
        const transformedData = response.data.users
          .filter(user => user.role !== 'admin') // Filter out admin users
          .map((user) => {
            return {
              id: `N${String(68000 + user.id).padStart(5, '0')}`,
              name: user.name,
              email: user.email,
              phone: user.phone || '-',
              saldo: parseFloat(user.saldo) || 0,
              status: 'Aktif',
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10B981&color=fff`
            };
          });
        
        console.log('📊 Total nasabah:', transformedData.length);
        transformedData.forEach(user => {
          if (user.email === 'ahmadrizki@gmail.com') {
            console.log('💰 Saldo Ahmad Rizki:', user.saldo);
          }
        });
        
        setNasabahData(transformedData);
        setLastUpdate(new Date()); // Update timestamp
      }
    } catch (error) {
      console.error('❌ Error fetching nasabah data:', error);
      setNasabahData([]);
    } finally {
      if (isFirstLoad) {
        setLoading(false);
        setIsFirstLoad(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login-admin');
  };

  const handleMenuClick = (index, path) => {
    setActiveMenu(index);
    navigate(path);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle Edit Nasabah
  const handleEditNasabah = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showNotification('Mohon lengkapi semua data!', 'error');
      return;
    }

    setNasabahData(nasabahData.map(n => 
      n.id === selectedNasabah.id 
        ? { ...n, ...formData, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=22C55E&color=fff` }
        : n
    ));
    setShowEditModal(false);
    setSelectedNasabah(null);
    setFormData({ name: '', email: '', phone: '', saldo: 0, status: 'Aktif' });
    showNotification('Data nasabah berhasil diperbarui!');
  };

  // Handle Delete Nasabah
  const handleDeleteNasabah = () => {
    setNasabahData(nasabahData.filter(n => n.id !== selectedNasabah.id));
    setShowDeleteModal(false);
    setSelectedNasabah(null);
    showNotification('Data nasabah berhasil dihapus!');
  };

  // Open Edit Modal
  const openEditModal = (nasabah) => {
    setSelectedNasabah(nasabah);
    setFormData({
      name: nasabah.name,
      email: nasabah.email,
      phone: nasabah.phone,
      saldo: nasabah.saldo,
      status: nasabah.status
    });
    setShowEditModal(true);
  };

  // Open Delete Modal
  const openDeleteModal = (nasabah) => {
    setSelectedNasabah(nasabah);
    setShowDeleteModal(true);
  };

  // Open Detail Modal
  const openDetailModal = (nasabah) => {
    setSelectedNasabah(nasabah);
    setShowDetailModal(true);
  };

  // Filter data
  const filteredData = nasabahData.filter(nasabah => {
    const matchesSearch = 
      nasabah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nasabah.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nasabah.phone.includes(searchQuery) ||
      nasabah.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'Semua Status' || nasabah.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortFilter) {
      case 'Urutkan Terlama':
        return a.id.localeCompare(b.id);
      case 'Nama A-Z':
        return a.name.localeCompare(b.name);
      case 'Nama Z-A':
        return b.name.localeCompare(a.name);
      case 'Saldo Tertinggi':
        return b.saldo - a.saldo;
      case 'Saldo Terendah':
        return a.saldo - b.saldo;
      default: // Urutkan Terbaru
        return b.id.localeCompare(a.id);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(currentItems.map(n => n.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle select item
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      showNotification('Pilih data yang ingin dihapus!', 'error');
      return;
    }
    setNasabahData(nasabahData.filter(n => !selectedItems.includes(n.id)));
    setSelectedItems([]);
    showNotification(`${selectedItems.length} data nasabah berhasil dihapus!`);
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-700 ring-1 ring-inset ring-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-200';
      case 'Tidak Aktif':
        return 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-200';
      default:
        return 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg animate-slideDown ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center gap-3`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {notification.type === 'success' ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            )}
          </svg>
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-10 py-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-gray-800 text-xl">BANGKIT</div>
                <div className="text-[10px] text-gray-500">Bank Sampah Digital</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="px-10 pb-3 border-b-2 border-gray-200"></div>

          {/* Menu */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarMenu.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(i, item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-all text-left text-sm
                  ${activeMenu === i 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all text-sm border border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Data Nasabah</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="font-medium text-green-600">Real-time Update</span>
                </span>
                <span className="text-gray-400">•</span>
                <span>Terakhir update: {lastUpdate.toLocaleTimeString('id-ID')}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <button className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Mail Icon */}
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Admin User Profile */}
              <div className="flex items-center gap-2.5">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=22C55E&color=fff&size=36" 
                  alt="Admin User" 
                  className="w-9 h-9 rounded-full"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-[11px] text-gray-500">admin@bangkit.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Search and Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari nama, email, atau nomor HP"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white transition-all duration-200"
                />
              </div>

              {/* Filters */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white cursor-pointer transition-all duration-200"
              >
                <option>Semua Status</option>
                <option>Aktif</option>
                <option>Pending</option>
                <option>Tidak Aktif</option>
              </select>

              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white cursor-pointer transition-all duration-200"
              >
                <option>Urutkan Terbaru</option>
                <option>Urutkan Terlama</option>
                <option>Nama A-Z</option>
                <option>Nama Z-A</option>
                <option>Saldo Tertinggi</option>
                <option>Saldo Terendah</option>
              </select>

              <button
                onClick={fetchNasabahData}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm ml-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memuat...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Data
                  </>
                )}
              </button>

              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <FiTrash className="w-4 h-4" />
                  Hapus ({selectedItems.length})
                </button>
              )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-12 px-6 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Nama
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Nomor HP
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Saldo
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 border-4 border-simgreen-200 border-t-simgreen-600 rounded-full animate-spin mb-3"></div>
                          <p className="text-gray-500">Memuat data nasabah...</p>
                        </div>
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        Tidak ada data nasabah
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((nasabah, index) => (
                    <tr 
                      key={nasabah.id} 
                      className="hover:bg-gray-50 transition-all duration-150"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(nasabah.id)}
                          onChange={() => handleSelectItem(nasabah.id)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                            {nasabah.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{nasabah.name}</div>
                            <div className="text-[11px] text-gray-400">ID: {nasabah.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {nasabah.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {nasabah.phone}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        {formatCurrency(nasabah.saldo)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold ${getStatusStyle(nasabah.status)}`}>
                          {nasabah.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {/* Edit Button */}
                          <button 
                            onClick={() => openEditModal(nasabah)}
                            className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-[18px] h-[18px]" />
                          </button>
                          
                          {/* View Button */}
                          <button 
                            onClick={() => openDetailModal(nasabah)}
                            className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Lihat Detail"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={() => openDeleteModal(nasabah)}
                            className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                            title="Hapus"
                          >
                            <FiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredData.length === 0 && (
                <div className="py-20 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">Tidak ada data</h3>
                  <p className="mt-1 text-sm text-gray-500">Data nasabah tidak ditemukan</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`w-9 h-9 text-[13px] font-semibold rounded-lg transition-colors ${
                            currentPage === index + 1
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-5 px-8">
          <p className="text-sm text-gray-500 text-center">
            © 2025 BANGKIT – Bank Sampah Digital. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Edit Nasabah Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Data Nasabah">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Saldo</label>
            <input
              type="number"
              value={formData.saldo}
              onChange={(e) => setFormData({ ...formData, saldo: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
            >
              <option>Aktif</option>
              <option>Pending</option>
              <option>Tidak Aktif</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Batal
            </button>
            <button
              onClick={handleEditNasabah}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail Nasabah Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Nasabah">
        {selectedNasabah && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <img src={selectedNasabah.avatar} alt={selectedNasabah.name} className="w-20 h-20 rounded-full ring-4 ring-gray-100" />
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedNasabah.name}</h4>
                <p className="text-sm text-gray-500">{selectedNasabah.id}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                <p className="text-gray-900 font-medium">{selectedNasabah.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Nomor HP</label>
                <p className="text-gray-900 font-medium">{selectedNasabah.phone}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Saldo</label>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedNasabah.saldo)}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(selectedNasabah.status)}`}>
                    {selectedNasabah.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Konfirmasi Hapus">
        {selectedNasabah && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-semibold text-red-900">Peringatan!</h4>
                <p className="text-sm text-red-700 mt-1">
                  Anda yakin ingin menghapus data nasabah <strong>{selectedNasabah.name}</strong>? 
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteNasabah}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
