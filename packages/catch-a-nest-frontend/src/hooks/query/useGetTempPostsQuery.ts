import getTempPosts from '@src/lib/api/posts/getTempPosts';
import { Post } from '@src/lib/api/posts/types';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

export default function useGetTempPostsQuery(
  userId?: number,
  options: UseInfiniteQueryOptions<Post[], unknown, Post[], Post[]> = {}
) {
  return useInfiniteQuery(
    createKey(userId),
    ({ pageParam = undefined }) => getTempPosts(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].id : undefined,
      ...options,
    }
  );
}

const createKey = (userId?: number) => ['tempPosts', userId ?? 'all'];
useGetTempPostsQuery.createKey = createKey;
