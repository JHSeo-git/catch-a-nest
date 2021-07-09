import { useMemo } from 'react';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useGetPostBySlug(slug: string) {
  const { data, error, isLoading } = useGetPostBySlugQuery(slug);

  const post = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  return {
    post,
    error,
    isLoading,
  };
}
