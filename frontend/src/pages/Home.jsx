import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-simgreen-600">Home Page</h1>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 btn-primary"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
