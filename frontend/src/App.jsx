import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SetorSampah from './pages/SetorSampah';
import KonfirmasiSetoran from './pages/KonfirmasiSetoran';
import SetoranBerhasil from './pages/SetoranBerhasil';
import TarikSaldo from './pages/TarikSaldo';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import ProfilPengguna from './pages/ProfilPengguna';
import RegisterForm from './pages/RegisterForm';
import TestPage from './pages/TestPage';

function Protected({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/setor-sampah"
        element={
          <Protected>
            <SetorSampah />
          </Protected>
        }
      />
      <Route
        path="/konfirmasi-setoran"
        element={
          <Protected>
            <KonfirmasiSetoran />
          </Protected>
        }
      />
      <Route
        path="/setoran-berhasil"
        element={
          <Protected>
            <SetoranBerhasil />
          </Protected>
        }
      />
      <Route
        path="/tarik-saldo"
        element={
          <Protected>
            <TarikSaldo />
          </Protected>
        }
      />
      <Route
        path="/riwayat-transaksi"
        element={
          <Protected>
            <RiwayatTransaksi />
          </Protected>
        }
      />
      <Route
        path="/profil-pengguna"
        element={
          <Protected>
            <ProfilPengguna />
          </Protected>
        }
      />
    </Routes>
  );
}
