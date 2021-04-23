import {
  useEditorIsTempUseState,
  useEditorSync,
  useEditTargetSlugState,
} from '@src/states/editorState';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import useGetLastTempPostQuery from './query/useGetLastTempPostQuery';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useEditorLoad() {
  const [slug] = useEditTargetSlugState();
  const [useIsTemp] = useEditorIsTempUseState();
  const { data: postData, isLoading, isError } = useGetPostBySlugQuery(slug!, {
    enabled: slug !== undefined && slug !== null,
  });
  const { data: tempData } = useGetLastTempPostQuery(slug!, {
    enabled: slug !== undefined && slug !== null,
  });
  const history = useHistory();
  const sync = useEditorSync();

  if (isError) {
    history.push('/error?status=404');
  }

  const data = useMemo(() => {
    if (useIsTemp) return tempData;
    return postData;
  }, [postData, tempData, useIsTemp]);

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
