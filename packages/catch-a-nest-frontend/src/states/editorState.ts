import { atom, useRecoilState } from 'recoil';

export const editorMarkdownValue = atom<string | null>({
  key: 'editorMarkdownValue',
  default: null,
});

export function useEditorMarkdownValueState() {
  return useRecoilState(editorMarkdownValue);
}
