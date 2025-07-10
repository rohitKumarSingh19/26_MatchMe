import axios from 'axios';
const API = axios.create({
  //baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});
// Add user token to headers
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('matchme-user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
