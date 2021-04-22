import getLastTempPost from '@src/lib/api/posts/getLastTempPost';
import { Post } from '@src/lib/api/posts/types';
import { useQuery, UseQueryOptions } from 'react-query';

export default function useGetLastTempPostQuery(
  slug: string,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  return useQuery(createKey(slug), () => getLastTempPost(slug), options);
}

const createKey = (slug: string) => ['tempPost', slug];
useGetLastTempPostQuery.createKey = createKey;
