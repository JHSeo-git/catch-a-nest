import axiosClient from '@src/lib/api/axiosClient';
import { Post } from './types';

export default async function getPosts(userId?: number, cursor?: number) {
  const response = await axiosClient.get<Post[]>('/api/posts', {
    params: {
      user_id: userId,
      cursor,
    },
  });

  return response.data;
}
