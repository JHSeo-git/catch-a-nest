import { useMemo } from 'react';
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQueryClient,
} from 'react-query';
import produce from 'immer';
import getTempPosts from '@/lib/api/posts/getTempPosts';
import { Post } from '@/lib/api/posts/types';

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

export async function prefetchGetTempPostsQuery(
  userId?: number,
  options: UseInfiniteQueryOptions<Post[], unknown, Post[], Post[]> = {}
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    createKey(userId),
    ({ pageParam = undefined }) => getTempPosts(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].id : undefined,
      ...options,
    }
  );
  return queryClient;
}

export function useGetTempPostsQueryUpdator() {
  const queryClient = useQueryClient();
  return useMemo(() => {
    const remove = (slug: string, userId?: number) => {
      queryClient.setQueryData<InfiniteData<Post[]> | undefined>(
        createKey(userId),
        (prevData) =>
          produce(prevData, (draft) => {
            const page = draft?.pages.find((page) =>
              page.find((post) => post.url_slug === slug)
            );
            if (!page) return;
            const index = page.findIndex((post) => post.url_slug === slug);
            page.splice(index);
          })
      );
    };

    return { remove };
  }, [queryClient]);
}

const createKey = (userId?: number) => ['tempPosts', userId ?? 'all'];
useGetTempPostsQuery.createKey = createKey;
