import React from 'react';

export default function TestPage() {
  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1 style={{color: 'green', fontSize: '48px'}}>✅ ROUTING WORKS!</h1>
      <p>Kalau halaman ini muncul, berarti React Router berfungsi.</p>
      <a href="/login" style={{color: 'blue', fontSize: '24px'}}>Coba ke /login</a>
    </div>
  );
}
