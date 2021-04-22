import axiosClient from '@src/lib/api/axiosClient';
import { Post } from './types';

export default async function getTempPosts(userId?: number, cursor?: number) {
  const response = await axiosClient.get<Post[]>('/api/temps', {
    params: {
      user_id: userId,
      cursor,
    },
  });

  return response.data;
}
