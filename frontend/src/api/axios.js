import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: BASE + '/api',
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 10000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Direct login function untuk bypass routing issue
export const loginDirect = async (email, password) => {
  try {
    console.log('🔵 loginDirect called with:', { email });
    
    // Path Apache: /api/login.php (pakai Alias tanpa spasi)
    const url = '/api/login.php';
    console.log('🔵 Request to:', url);
    
    const response = await axios.post(
      url,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true,
        timeout: 15000
      }
    );
    
    console.log('✅ Response received:', response.data);
    return response;
  } catch (error) {
    console.error('❌ loginDirect error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export default api;
