import { redirect } from '@tanstack/react-router';
import axios from 'axios';
import { queryClient } from './queryClient';

const BASE_URL = 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      queryClient.setQueryData(['user'], null);
      redirect({ to: '/auth/login' });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
