import axios from 'axios';

// Emulador Android → 10.0.2.2
// Celular físico   → IP da sua máquina (ex: 192.168.0.10)
const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
