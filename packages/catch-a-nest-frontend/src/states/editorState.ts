import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';

export const editorMarkdown = atom<string | null>({
  key: 'editorMarkdown',
  default: null,
});

export const editorTitle = atom<string | null>({
  key: 'editorTitle',
  default: null,
});

export const editorShortDescription = atom<string | null>({
  key: 'editorShortDescription',
  default: null,
});

type EditorModeType = 'pre-detail' | 'pre-save';
export const editorMode = atom<EditorModeType>({
  key: 'editorMode',
  default: 'pre-detail',
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
    const title = get(editorTitle);
    const body = get(editorMarkdown);
    const shortDescription = get(editorShortDescription);
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
  const resetMarkdown = useResetRecoilState(editorMarkdown);
  const resetTitle = useResetRecoilState(editorTitle);
  const resetShortDesciprtion = useResetRecoilState(editorShortDescription);
  const reset = () => {
    resetMarkdown();
    resetTitle();
    resetShortDesciprtion();
  };

  return {
    reset,
  };
}

export function useEditorContentValue() {
  return useRecoilValue(editorContent);
}

export function useEditorMarkdownState() {
  return useRecoilState(editorMarkdown);
}

export function useEditorTitleState() {
  return useRecoilState(editorTitle);
}

export function useEditorModeState() {
  return useRecoilState(editorMode);
}

export function useEditorShortDescriptionState() {
  return useRecoilState(editorShortDescription);
}
