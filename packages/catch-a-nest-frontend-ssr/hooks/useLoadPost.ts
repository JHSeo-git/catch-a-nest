import { useSetPostAllContent } from '@/lib/recoil/writeState';
import { useEffect, useMemo, useState } from 'react';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useLoadPost(slug: string) {
  const [loaded, setLoaded] = useState(false);
  const set = useSetPostAllContent();
  const { data, error, isLoading } = useGetPostBySlugQuery(slug, {
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const post = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (!post) return;

    set({
      title: post.title,
      markdown: post.body,
      shortDescription: post.short_description,
      thumbnailUrl: post.thumbnail,
    });

    setLoaded(true);
    console.log('set time');
  }, [isLoading, post, set]);

  return {
    loaded,
    error,
  };
}
