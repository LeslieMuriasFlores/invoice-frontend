//src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://nemon.test:80/api',
    headers: {
        'Content-Type': 'application/json',
      },
});

export default instance;
