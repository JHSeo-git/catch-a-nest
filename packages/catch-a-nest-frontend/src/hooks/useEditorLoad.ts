import { useEditorSync } from '@src/states/editorState';
import { useEffect } from 'react';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useEditorLoad(slug: string) {
  const { data, isLoading } = useGetPostBySlugQuery(slug);
  const sync = useEditorSync();

  useEffect(() => {
    if (!data) return;
    sync({
      title: data.title,
      body: data.body,
      shortDescription: data.short_description,
      thumbnail: data.thumbnail,
    });
  }, [data, sync]);

  return {
    isLoading,
  };
}
