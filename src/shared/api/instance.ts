import axios, { AxiosError } from 'axios';
import { getAccessToken } from '../lib/token';
import toast from 'react-hot-toast';

export const instance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (data) => {
    return data;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    // if (error.status === 403) {
    //   toast.error('Login failed');
    // }
    return Promise.reject(error);
  },
);
