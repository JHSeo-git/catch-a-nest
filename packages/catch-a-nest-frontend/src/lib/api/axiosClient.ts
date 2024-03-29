import axios from 'axios';

const axiosClient = axios.create();

// test : ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com
axiosClient.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://api.seonest.net';
axiosClient.defaults.withCredentials = true;

export default axiosClient;
