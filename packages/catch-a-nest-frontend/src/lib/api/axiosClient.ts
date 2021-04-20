import axios from 'axios';

const axiosClient = axios.create();

// test : ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com
axiosClient.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com:5001'
    : 'ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com:5001';
axiosClient.defaults.withCredentials = true;

export default axiosClient;
