import axiosClient from '@src/lib/api/axiosClient';
import { Post } from './types';

export default async function getLastTempPost(slug: string) {
  const response = await axiosClient.get<Post>(`/api/temps/${slug}`);

  return response.data;
}
