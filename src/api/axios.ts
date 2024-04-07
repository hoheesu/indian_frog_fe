import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || '';
    if (token) {
      config.headers['authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
