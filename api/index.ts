import axios from 'axios';

const instance: any = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
