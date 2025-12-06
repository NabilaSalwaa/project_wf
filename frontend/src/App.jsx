import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import DashboardAdmin from './pages/DashboardAdmin';
import DataNasabah from './pages/DataNasabah';
import DataSampah from './pages/DataSampah';
import DetailDeteksi from './pages/DetailDeteksi';
import VerifikasiDeteksi from './pages/VerifikasiDeteksi';
import Transaksi from './pages/Transaksi';
import Laporan from './pages/Laporan';
import Pengaturan from './pages/Pengaturan';
import SetorSampah from './pages/SetorSampah';
import KonfirmasiSetoran from './pages/KonfirmasiSetoran';
import SetoranBerhasil from './pages/SetoranBerhasil';
import TarikSaldo from './pages/TarikSaldo';
import PenarikanBerhasil from './pages/PenarikanBerhasil';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import ProfilPengguna from './pages/ProfilPengguna';
import RegisterForm from './pages/RegisterForm';
import RegistrasiSukses from './pages/RegistrasiSukses';
import TestPage from './pages/TestPage';

import AdminNotifications from './pages/AdminNotifications';
import AdminMessages from './pages/AdminMessages';
import DaftarSetoran from './pages/admin/DaftarSetoran';

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
      <Route path="/registrasi-sukses" element={<RegistrasiSukses />} />
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/data-nasabah" element={<DataNasabah />} />
      <Route path="/admin/data-sampah" element={<DataSampah />} />
      <Route path="/admin/detail-deteksi/:id" element={<DetailDeteksi />} />
      <Route path="/admin/verifikasi" element={<VerifikasiDeteksi />} />
      <Route path="/admin/transaksi" element={<Transaksi />} />
      <Route path="/admin/laporan" element={<Laporan />} />
      <Route path="/admin/pengaturan" element={<Pengaturan />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
      <Route path="/admin/daftar-setoran" element={<DaftarSetoran />} />
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
        path="/penarikan-berhasil"
        element={
          <Protected>
            <PenarikanBerhasil />
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
