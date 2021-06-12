import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
  waitForAll,
} from 'recoil';

const editorMarkdownState = atom<string | null>({
  key: 'editorMarkdown',
  default: null,
});

const editorTitleState = atom<string | null>({
  key: 'editorTitle',
  default: null,
});

const editorShortDescriptionState = atom<string | null>({
  key: 'editorShortDescription',
  default: null,
});

const editorThumbnailState = atom<string | null>({
  key: 'editorThumbnailState',
  default: null,
});

export type EditorModeType = 'detail-page' | 'post-page';
const editorModeState = atom<EditorModeType>({
  key: 'editorModeState',
  default: 'post-page',
});

const isEditState = atom<boolean>({
  key: 'isEditState',
  default: false,
});

const editTargetSlugState = atom<string | null>({
  key: 'editTargetSlugState',
  default: null,
});

const observedHeadingIdState = atom<string | null>({
  key: 'observedHeadingIdState',
  default: null,
});

const observedHeadingIdsState = atom<string[]>({
  key: 'observedHeadingIdsState',
  default: [],
});

const editorTempPost = atom<boolean>({
  key: 'editorTempPost',
  default: false,
});

const editorIsTempUse = atom<boolean>({
  key: 'editorIsTempUse',
  default: false,
});

export type EditorContent = {
  title: string | null;
  body: string | null;
  shortDescription: string | null;
  thumbnail: string | null;
};

const editorContent = selector<EditorContent>({
  key: 'editorContent',
  get: ({ get }) => {
    const title = get(editorTitleState);
    const body = get(editorMarkdownState);
    const shortDescription = get(editorShortDescriptionState);
    const thumbnail = get(editorThumbnailState);

    return {
      title,
      body,
      shortDescription: shortDescription ?? '',
      thumbnail: thumbnail ?? '',
    };
  },
});

const editEditingInfo = selector({
  key: 'editEditingInfo',
  get: ({ get }) => {
    const isEdit = get(isEditState);
    const editTargetSlug = get(editTargetSlugState);

    return {
      isEdit,
      editTargetSlug,
    };
  },
});

export function useEditorContentActions() {
  const resetMarkdown = useResetRecoilState(editorMarkdownState);
  const resetTitle = useResetRecoilState(editorTitleState);
  const resetShortDesciprtion = useResetRecoilState(
    editorShortDescriptionState
  );
  const resetThumbnail = useResetRecoilState(editorThumbnailState);
  const resetMode = useResetRecoilState(editorModeState);
  const resetIsEdit = useResetRecoilState(isEditState);
  const resetEditorTargetSlug = useResetRecoilState(editTargetSlugState);

  const resetIsTempUse = useResetRecoilState(editorIsTempUse);

  const reset = useCallback(() => {
    resetShortDesciprtion();
    resetThumbnail();
    resetMarkdown();
    resetTitle();
    resetEditorTargetSlug();
    resetIsEdit();
    resetMode();
    resetIsTempUse();
  }, [
    resetShortDesciprtion,
    resetThumbnail,
    resetMarkdown,
    resetTitle,
    resetEditorTargetSlug,
    resetIsEdit,
    resetMode,
    resetIsTempUse,
  ]);

  return {
    reset,
  };
}

export function useEditorContentValue() {
  return useRecoilValue(editorContent);
}

export function useEditorMarkdownState() {
  return useRecoilState(editorMarkdownState);
}
export function useEditorMarkdownValue() {
  return useRecoilValue(editorMarkdownState);
}

export function useEditorTitleState() {
  return useRecoilState(editorTitleState);
}

export function useEditorTitleValue() {
  return useRecoilValue(editorTitleState);
}

export function useEditorModeState() {
  return useRecoilState(editorModeState);
}

export function useEditorShortDescriptionState() {
  return useRecoilState(editorShortDescriptionState);
}

export function useEditorThumbnailState() {
  return useRecoilState(editorThumbnailState);
}

export function useIsEditState() {
  return useRecoilState(isEditState);
}
export function useSetIsEditState() {
  return useSetRecoilState(isEditState);
}

export function useEditTargetSlugState() {
  return useRecoilState(editTargetSlugState);
}

export function useSetEditTargetSlug() {
  return useSetRecoilState(editTargetSlugState);
}

export function useEditingInfoValue() {
  return useRecoilValue(editEditingInfo);
}

export function useObservedHeadingIdState() {
  return useRecoilState(observedHeadingIdState);
}

export function useObservedHeadingIdsState() {
  return useRecoilState(observedHeadingIdsState);
}

export function useEditorIsTempUseState() {
  return useRecoilState(editorIsTempUse);
}

export function useEditorTempPost() {
  return useRecoilState(editorTempPost);
}

export function useEditorSync() {
  const setEditorTitle = useSetRecoilState(editorTitleState);
  const setMarkDown = useSetRecoilState(editorMarkdownState);
  const setShortDescription = useSetRecoilState(editorShortDescriptionState);
  const setThumbnail = useSetRecoilState(editorThumbnailState);
  const setTempPost = useSetRecoilState(editorTempPost);

  const sync = useCallback(
    (content: EditorContent, isTemp: boolean = false) => {
      setEditorTitle(content.title);
      setMarkDown(content.body);
      setShortDescription(content.shortDescription);
      setThumbnail(content.thumbnail);
      setTempPost(isTemp);
    },
    [
      setEditorTitle,
      setMarkDown,
      setShortDescription,
      setThumbnail,
      setTempPost,
    ]
  );

  return sync;
}
