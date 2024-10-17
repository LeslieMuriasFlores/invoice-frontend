//src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://nemon-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
      },
});

export default instance;
