import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
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

type EditorModeType = 'detail-page' | 'post-page';
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
    const thumbnail = '';

    return {
      title,
      body,
      shortDescription,
      thumbnail,
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

  const reset = useCallback(() => {
    resetMarkdown();
    resetTitle();
    resetShortDesciprtion();
    resetMode();
    resetThumbnail();
    resetIsEdit();
    resetEditorTargetSlug();
  }, [
    resetMarkdown,
    resetTitle,
    resetShortDesciprtion,
    resetMode,
    resetThumbnail,
    resetIsEdit,
    resetEditorTargetSlug,
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

export function useEditorTitleState() {
  return useRecoilState(editorTitleState);
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

export function useEditTargetSlugState() {
  return useRecoilState(editTargetSlugState);
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

export function useEditorSync() {
  const setEditorTitle = useSetRecoilState(editorTitleState);
  const setMarkDown = useSetRecoilState(editorMarkdownState);
  const setShortDescription = useSetRecoilState(editorShortDescriptionState);
  const setThumbnail = useSetRecoilState(editorThumbnailState);

  const sync = useCallback(
    (content: EditorContent) => {
      setEditorTitle(content.title);
      setMarkDown(content.body);
      setShortDescription(content.shortDescription);
      setThumbnail(content.thumbnail);
    },
    [setEditorTitle, setMarkDown, setShortDescription, setThumbnail]
  );

  return sync;
}
