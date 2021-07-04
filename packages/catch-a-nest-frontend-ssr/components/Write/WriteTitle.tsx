import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { usePostTitleState } from '@/lib/recoil/writeState';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';

export type WriteTitleProps = {
  placeholder?: string;
};

const WriteTitle = (
  { placeholder }: WriteTitleProps,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  const [postTitle, setPostTitle] = usePostTitleState();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAutoHeight(e);
    setPostTitle(e.target.value);
  };

  const handleAutoHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <div css={wrapper}>
      <textarea
        // ref={ref}
        css={textareaStyle}
        rows={1}
        placeholder={placeholder}
        value={postTitle ?? ''}
        onChange={onChange}
        autoFocus
      />
      {/* {ref && (
        <TextareaAutosize
          ref={ref}
          css={textareaStyle}
          rows={1}
          placeholder={placeholder}
          // value={title ?? ''}
          // onChange={(e) => setTitle(e.target.value)}
        />
      )} */}
    </div>
  );
};

const wrapper = css`
  display: flex;
  align-items: center;
  & > * {
    width: 100%;
  }
`;

const textareaStyle = css`
  max-height: 32rem;
  outline: none;
  border: none;
  display: block;
  padding: 0.5rem 2rem;
  height: 100%;
  font-family: inherit;
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

export default forwardRef<HTMLTextAreaElement, WriteTitleProps>(WriteTitle);
