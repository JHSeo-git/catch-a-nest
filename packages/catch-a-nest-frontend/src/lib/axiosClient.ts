import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '' : 'https://api.seofol.io';

export default axiosClient;
