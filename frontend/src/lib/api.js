import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 30 * 3,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await apiClient.post('/auths/refresh');
        const newToken = res.data.accessToken;

        localStorage.setItem('access_token', newToken);
        apiClient.defaults.headers.common.Authorization =
          `Bearer ${newToken}`;

        processQueue(null, newToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('access_token');
        return Promise.reject({
          message: 'Unauthorized: Invalid or expired token',
          code: 401,
          custom: true,
        });
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      return Promise.reject({
        message: 'No access to HR system',
        code: 403,
        custom: true,
      });
    }

    if (status === 404) {
      return Promise.reject({
        message: 'Not Found',
        code: 404,
        custom: true,
        data: error.response?.data,
      });
    }

    if (status === 500) {
      return Promise.reject({
        message: 'Internal Server Error',
        code: 500,
        custom: true,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  },
);
