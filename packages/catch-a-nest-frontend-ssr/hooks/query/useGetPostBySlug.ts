import { useQuery, UseQueryOptions } from 'react-query';
import { Post } from '@/lib/api/posts/types';
import getPostBySlug from '@/lib/api/posts/getPostBySlug';

export default function useGetPostBySlugQuery(
  slug: string,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  return useQuery(createKey(slug), () => getPostBySlug(slug), options);
}

const createKey = (slug: string) => ['post', slug];
useGetPostBySlugQuery.createKey = createKey;
