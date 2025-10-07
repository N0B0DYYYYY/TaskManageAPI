import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: attaches the access token to every outgoing request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor: Handles expired tokens and refreshes them
api.interceptors.response.use(
  (response) => response, // return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and it's not a request to the token refresh endpoint itself
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've already tried to refresh
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // request a new access token using the refresh token
          const { data } = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          // update the stored access token
          localStorage.setItem('access_token', data.access);
          
          // update the authorization header for the original request and retry it
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);

        } catch (refreshError) {
          // ff the refresh token is also invalid clear storage and redirect to login
          console.error("Session expired. Please log in again.");
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // this triggers PrivateRoute redirect
          window.location.href = '/login'; 
          return Promise.reject(refreshError);
        }
      }
    }
    // for any other errors  reject the promise
    return Promise.reject(error);
  }
);


export default api;