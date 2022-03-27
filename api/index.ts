import axios from 'axios';

const instance: any = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.response.use(
  (response: any) => response,
  (error: Error) => {
    throw error;
  },
);

export default instance;
