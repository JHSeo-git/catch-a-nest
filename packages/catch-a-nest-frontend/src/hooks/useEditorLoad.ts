import { useEditorSync, useEditTargetSlugState } from '@src/states/editorState';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useEditorLoad() {
  const [slug] = useEditTargetSlugState();
  const { data, isLoading, isError } = useGetPostBySlugQuery(slug!, {
    enabled: slug !== undefined && slug !== null,
  });
  const history = useHistory();
  const sync = useEditorSync();

  if (isError) {
    history.push('/error?status=404');
  }

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
