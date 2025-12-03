import React from 'react';
import { useNavigate } from 'react-router-dom';

const messages = [
  { id: 1, sender: 'Maya Putri', subject: 'Pertanyaan tentang verifikasi', preview: 'Halo Admin, saya ingin menanyakan tentang status verifikasi data sampah saya...', time: '10 menit lalu', read: false },
  { id: 2, sender: 'Budi Santoso', subject: 'Konfirmasi Transaksi', preview: 'Selamat siang, saya sudah melakukan transaksi tukar sampah dengan poin...', time: '1 jam lalu', read: false },
];

export default function AdminMessages() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Pesan Masuk Admin</h1>
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`p-4 rounded-lg shadow bg-white border cursor-pointer hover:bg-green-50 ${!msg.read ? 'border-green-400' : 'border-gray-200'}`}
            onClick={() => navigate(`/admin/messages/${msg.id}`)}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{msg.sender}</div>
                <div className="text-gray-600">{msg.subject}</div>
                <div className="text-gray-500 text-sm">{msg.preview}</div>
              </div>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
