import { useEffect, useMemo, useRef } from 'react';
import useGetPostsQuery from './query/useGetPostsQuery';
import useIntersectionObserver from './useIntersectionObserver';

export default function useGetPosts(userId?: number) {
  const {
    //
    data,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetPostsQuery(userId);

  const elementRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(elementRef, data ? true : false);

  const posts = useMemo(() => {
    if (!data) return null;
    return data.pages.flat();
  }, [data]);

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return {
    posts,
    hasNextPage,
    error,
    elementRef,
  };
}
