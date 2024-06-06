import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.example.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
