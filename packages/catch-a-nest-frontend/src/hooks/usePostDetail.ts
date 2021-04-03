import { useEditorShortDescriptionState } from '@src/states/editorState';
import React from 'react';

export default function usePostDetail() {
  const [
    editorShortDescriptionValue,
    setEditorShortDescription,
  ] = useEditorShortDescriptionState();
  const onChangeEditorShortDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditorShortDescription(e.target.value);

  return {
    editorShortDescriptionValue,
    onChangeEditorShortDescription,
  };
}
