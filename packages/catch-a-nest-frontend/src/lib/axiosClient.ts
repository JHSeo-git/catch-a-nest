import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '' : 'https://api.seonest.io';

export default axiosClient;
