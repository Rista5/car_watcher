import axios from 'axios';

const API_URL = 'http://localhost:3001';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default instance;