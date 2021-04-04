import getPosts from '@src/lib/api/posts/getPosts';
import { Post } from '@src/lib/api/posts/types';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

export default function useGetPostsQuery(
  userId?: number,
  options: UseInfiniteQueryOptions<Post[], unknown, Post[], Post[]> = {}
) {
  return useInfiniteQuery(
    createKey(userId),
    ({ pageParam = undefined }) => getPosts(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].id : undefined,
      ...options,
    }
  );
}

const createKey = (userId?: number) => ['posts', userId ?? 'all'];
useGetPostsQuery.createKey = createKey;
