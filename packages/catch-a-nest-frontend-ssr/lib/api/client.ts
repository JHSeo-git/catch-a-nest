import axios from 'axios';

const client = axios.create();

// test : ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com
// client.defaults.baseURL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5001'
//     : 'https://api.seonest.net';
client.defaults.baseURL = 'http://localhost:5001';
client.defaults.withCredentials = true;

console.log('NODE_ENV =', process.env.NODE_ENV);

export default client;
