import axiosClient from '@src/lib/axiosClient';

export default async function uploadImage() {
  const response = await axiosClient.post('/api/upload/image', {});
}
