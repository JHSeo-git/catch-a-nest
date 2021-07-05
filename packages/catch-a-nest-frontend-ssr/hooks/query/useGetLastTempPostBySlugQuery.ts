import { useQuery, UseQueryOptions } from 'react-query';
import getLastTempPost from '@/lib/api/posts/getLastTempPost';
import { Post } from '@/lib/api/posts/types';

export default function useGetLastTempPostBySlugQuery(
  slug: string,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  return useQuery(createKey(slug), () => getLastTempPost(slug), options);
}

const createKey = (slug: string) => ['tempPost', slug];
useGetLastTempPostBySlugQuery.createKey = createKey;
