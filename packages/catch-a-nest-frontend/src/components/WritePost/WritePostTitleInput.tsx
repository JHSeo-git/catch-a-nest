import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { useEditorTitleState } from '@src/states/editorState';
import TextareaAutosize from 'react-textarea-autosize';

export type WritePostTitleInputProps = {
  placeholder?: string;
};

const WritePostTitleInput = ({
  placeholder = 'Please write title',
}: WritePostTitleInputProps) => {
  const [editorTitle, setEditorTitle] = useEditorTitleState();

  return (
    <TextareaAutosize
      css={inputStyle}
      rows={1}
      placeholder={placeholder}
      autoFocus
      value={editorTitle ?? ''}
      onChange={(e) => setEditorTitle(e.target.value)}
    />
  );
};

const inputStyle = css`
  outline: none;
  border: none;
  font-family: inherit;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 2.5rem;
  font-weight: bold;
  resize: none;
  line-height: 1.5;
  &::placeholder {
    color: ${palette.blueGrey[200]};
  }
  ${media.md} {
    font-size: 2.25rem;
  }
`;

export default WritePostTitleInput;
