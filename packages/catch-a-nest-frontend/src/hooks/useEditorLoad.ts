import {
  useEditorIsTempUseState,
  useEditorSync,
  useEditTargetSlugState,
} from '@src/states/editorState';
import { useTempPostUseModalState } from '@src/states/viewState';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import useGetLastTempPostQuery from './query/useGetLastTempPostQuery';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useEditorLoad() {
  const [slug] = useEditTargetSlugState();
  const [useIsTemp] = useEditorIsTempUseState();
  const [, setTempPostUseModal] = useTempPostUseModalState();
  const {
    data: postData,
    isError,
    isLoading: postQueryLoading,
  } = useGetPostBySlugQuery(slug!, {
    enabled: slug !== undefined && slug !== null,
  });
  const {
    data: tempData,
    isLoading: lastTempQueryLoading,
  } = useGetLastTempPostQuery(slug!, {
    enabled: slug !== undefined && slug !== null,
    cacheTime: 0,
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
    if (!postData) return;
    if (!tempData) return;
    if (postData.is_temp) return;
    setTempPostUseModal(true);
  }, [postData, tempData, setTempPostUseModal]);

  useEffect(() => {
    if (!data) return;
    sync(
      {
        title: data.title,
        body: data.body,
        shortDescription: data.short_description,
        thumbnail: data.thumbnail,
      },
      data.is_temp
    );
  }, [data, sync]);

  return {
    isLoading: postQueryLoading || lastTempQueryLoading,
  };
}
