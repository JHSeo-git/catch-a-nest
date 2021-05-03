import { useAppModalActions } from '@src/states/appModalState';
import {
  useEditorIsTempUseState,
  useEditorSync,
  useEditTargetSlugState,
} from '@src/states/editorState';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import useGetLastTempPostQuery from './query/useGetLastTempPostQuery';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useEditorLoad() {
  const [slug] = useEditTargetSlugState();
  const [useTemp, setTempUse] = useEditorIsTempUseState();
  const [loading, setLoading] = useState(true);
  const { open } = useAppModalActions();
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
    if (useTemp) return tempData;
    return postData;
  }, [postData, tempData, useTemp]);

  useEffect(() => {
    if (!postData) return;
    if (!tempData) return;
    if (postData.is_temp) return;
    open({
      title: 'Exists Temp Post',
      message: 'Could you get temp post?',
      onConfirm: () => {
        setTempUse(true);
      },
    });
  }, [postData, tempData, open, setTempUse]);

  useEffect(() => {
    try {
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
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }, [data, sync]);

  return {
    isLoading: postQueryLoading || lastTempQueryLoading || loading,
  };
}
