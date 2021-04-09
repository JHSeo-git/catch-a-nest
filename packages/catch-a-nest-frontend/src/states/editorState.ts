import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

export const editorMarkdownState = atom<string | null>({
  key: 'editorMarkdown',
  default: null,
});

export const editorTitleState = atom<string | null>({
  key: 'editorTitle',
  default: null,
});

export const editorShortDescriptionState = atom<string | null>({
  key: 'editorShortDescription',
  default: null,
});

export const editorThumbnailState = atom<string | null>({
  key: 'editorThumbnailState',
  default: null,
});

type EditorModeType = 'detail-page' | 'post-page';
export const editorModeState = atom<EditorModeType>({
  key: 'editorMode',
  default: 'post-page',
});

export type EditorContent = {
  title: string | null;
  body: string | null;
  shortDescription: string | null;
  thumbnail: string | null;
};

export const editorContent = selector<EditorContent>({
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

export function useEditorContentActions() {
  const resetMarkdown = useResetRecoilState(editorMarkdownState);
  const resetTitle = useResetRecoilState(editorTitleState);
  const resetShortDesciprtion = useResetRecoilState(
    editorShortDescriptionState
  );
  const resetThumbnail = useResetRecoilState(editorThumbnailState);
  const resetMode = useResetRecoilState(editorModeState);

  const reset = useCallback(() => {
    resetMarkdown();
    resetTitle();
    resetShortDesciprtion();
    resetMode();
    resetThumbnail();
  }, [
    resetMarkdown,
    resetTitle,
    resetShortDesciprtion,
    resetMode,
    resetThumbnail,
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
