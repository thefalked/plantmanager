import axios from 'axios';

const api = axios.create({
  baseURL: "http://172.26.112.1:3333",
});

export default api;
