import { css } from '@emotion/react';
import usePostDetail from '@src/hooks/usePostDetail';
import palette from '@src/lib/palette';

export type NewPostDetailInputProps = {};

const NewPostDetailInput = (props: NewPostDetailInputProps) => {
  const {
    editorShortDescriptionValue,
    onChangeEditorShortDescription,
  } = usePostDetail();

  return (
    <textarea
      maxLength={160}
      tabIndex={0}
      css={textareaStyle}
      value={editorShortDescriptionValue ?? ''}
      onChange={onChangeEditorShortDescription}
      placeholder="Please write short description"
    />
  );
};

const textareaStyle = css`
  font-family: inherit;
  resize: none;
  border: 0.0625rem solid ${palette.blueGrey[300]};
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  height: 5.25rem;
  padding: 0.75rem;
  color: ${palette.blueGrey[900]};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  &::placeholder {
    color: ${palette.blueGrey[300]};
  }
`;

export default NewPostDetailInput;
