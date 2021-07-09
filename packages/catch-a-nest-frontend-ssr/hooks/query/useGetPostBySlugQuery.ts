import getPostBySlug from '@/lib/api/posts/getPostBySlug';
import { Post } from '@/lib/api/posts/types';
import { useQuery, UseQueryOptions } from 'react-query';

export default function useGetPostBySlugQuery(
  slug: string,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  return useQuery(createKey(slug), () => getPostBySlug(slug), options);
}

const createKey = (slug: string) => ['post', slug];
useGetPostBySlugQuery.createKey = createKey;
