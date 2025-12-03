import React from 'react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, title: 'Verifikasi Baru', message: 'Maya Putri mengirim data sampah untuk diverifikasi', time: '2 menit lalu', read: false },
  { id: 2, title: 'Transaksi Berhasil', message: 'Transaksi #TR-1234 senilai Rp 45.000 telah disetujui', time: '15 menit lalu', read: false },
  { id: 3, title: 'Deteksi Mencurigakan', message: 'Deteksi AI dengan confidence rendah (65%) perlu ditinjau', time: '1 jam lalu', read: false },
];

export default function AdminNotifications() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Notifikasi Admin</h1>
      <div className="space-y-4">
        {notifications.map(notif => (
          <div key={notif.id} className={`p-4 rounded-lg shadow bg-white border cursor-pointer hover:bg-blue-50 ${!notif.read ? 'border-blue-400' : 'border-gray-200'}`}
            onClick={() => navigate(`/admin/notifications/${notif.id}`)}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{notif.title}</div>
                <div className="text-gray-600">{notif.message}</div>
              </div>
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
