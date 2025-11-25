import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar({ sidebarOpen, setSidebarOpen }){
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Gunakan prop jika ada, fallback ke state lokal
  const open = sidebarOpen !== undefined ? sidebarOpen : isOpen;
  const setOpen = setSidebarOpen || setIsOpen;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white h-screen shadow-lg flex flex-col fixed md:static top-0 left-0 z-40 transform md:transform-none transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      {/* Logo Section */}
      <div className="p-6 pt-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-simgreen-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-gray-800">BANGKIT</div>
            <div className="text-xs text-gray-500">Bank Sampah Digital</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link 
          to='/dashboard' 
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
            location.pathname === '/dashboard' 
              ? 'bg-simgreen-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          onClick={() => setOpen(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </Link>

        <Link 
          to="/setor-sampah" 
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
            location.pathname === '/setor-sampah' 
              ? 'bg-simgreen-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          onClick={() => setOpen(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
          Setor Sampah
        </Link>

        <Link 
          to="/tarik-saldo" 
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
            location.pathname === '/tarik-saldo' 
              ? 'bg-simgreen-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          onClick={() => setOpen(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Tarik Saldo
        </Link>

        <Link 
          to="/riwayat-transaksi" 
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
            location.pathname === '/riwayat-transaksi' 
              ? 'bg-simgreen-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          onClick={() => setOpen(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Riwayat Transaksi
        </Link>

        <Link 
          to="/profil-pengguna" 
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
            location.pathname === '/profil-pengguna' 
              ? 'bg-simgreen-500 text-white' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          onClick={() => setOpen(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Profil Pengguna
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition w-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
    </>
  )
}
