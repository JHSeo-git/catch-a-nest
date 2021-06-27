import client from '../client';
import { Post } from './types';

export default async function getPostBySlug(slug: string) {
  const response = await client.get<Post>(`/api/posts/${slug}`);

  return response.data;
}
