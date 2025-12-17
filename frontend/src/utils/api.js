import axios from 'axios';

// Determine the API URL based on the environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://task-manager-backend.vercel.app' 
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }, // <--- This closing brace and comma were missing
});

// Add token to requests (This part is critical for login!)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
