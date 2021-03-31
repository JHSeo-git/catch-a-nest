import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const editorMarkdown = atom<string | null>({
  key: 'editorMarkdown',
  default: null,
});

export const editorTitle = atom<string | null>({
  key: 'editorTitle',
  default: null,
});

type EditorContent = {
  title: string | null;
  body: string | null;
};

export const editorContent = selector<EditorContent>({
  key: 'editorContent',
  get: ({ get }) => {
    const title = get(editorTitle);
    const body = get(editorMarkdown);

    return {
      title,
      body,
    };
  },
});

export function useEditorContentValue() {
  return useRecoilValue(editorContent);
}

export function useEditorMarkdownState() {
  return useRecoilState(editorMarkdown);
}

export function useEditorTitleState() {
  return useRecoilState(editorTitle);
}
