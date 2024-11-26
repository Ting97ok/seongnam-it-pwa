// lib/axios.ts
import axios from 'axios';

console.log('Current ENV:', process.env.NEXT_PUBLIC_ENV);
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: process.env.NEXT_PUBLIC_ENV === 'development' ? 5000 : 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false // CORS 설정과 일치하게 설정
});

// 개발환경에서만 요청/응답 로깅
if (process.env.NEXT_PUBLIC_ENV === 'development') {
  api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
  });

  api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  });
}