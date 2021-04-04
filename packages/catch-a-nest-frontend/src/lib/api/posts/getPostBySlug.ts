import axiosClient from '@src/lib/axiosClient';
import { Post } from './types';

export default async function getPostBySlug(slug: string) {
  const response = await axiosClient.get<Post>(`/api/posts/${slug}`);

  return response.data;
}
