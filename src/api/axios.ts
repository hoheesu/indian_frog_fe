import axios from 'axios';
import { refreshToken } from './userAuthApi';

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

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `${newAccessToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
