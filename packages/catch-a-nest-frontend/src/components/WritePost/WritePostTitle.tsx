import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { useEditorTitleValue } from '@src/states/editorState';
import React, { forwardRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type WritePostTitleProps = {
  placeholder?: string;
};

const isRefObject = (
  r: React.Ref<HTMLTextAreaElement>
): r is React.RefObject<HTMLTextAreaElement> => {
  return r !== undefined;
};

const WritePostTitle = (
  { placeholder = 'Please write title' }: WritePostTitleProps,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  const editorTitle = useEditorTitleValue();

  useEffect(() => {
    if (!editorTitle) return;
    if (!isRefObject(ref)) return;
    if (!ref?.current) return;
    ref.current.value = editorTitle;
  }, [ref, editorTitle]);

  return (
    <div css={wrapper}>
      <TextareaAutosize
        ref={ref}
        css={inputStyle}
        rows={1}
        placeholder={placeholder}
        autoFocus
      />
    </div>
  );
};

const wrapper = css`
  min-height: 5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  & > * {
    width: 100%;
  }
`;

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

export default forwardRef<HTMLTextAreaElement, WritePostTitleProps>(
  WritePostTitle
);
