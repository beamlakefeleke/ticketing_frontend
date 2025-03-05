// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

// // Add a request interceptor
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Add a response interceptor
// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('role');
//             window.location.href = '/login'; // Redirect to login
//         }
//         return Promise.reject(error);
//     }
// );

// export default API;
