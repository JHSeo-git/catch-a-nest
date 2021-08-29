import { UseFormRegister } from 'react-hook-form';
import { css } from '@emotion/react';
import { usePostTitleState } from '@/lib/recoil/writeState';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { WriteInputs } from './Write';
import { forwardRef } from 'react';
import { useThemeValue } from '@/lib/recoil/appState';

export type WriteTitleProps = {
  register: UseFormRegister<WriteInputs>;
  placeholder?: string;
};

const WriteTitle = forwardRef<HTMLTextAreaElement, WriteTitleProps>(
  ({ register, placeholder }, ref) => {
    const [postTitle, setPostTitle] = usePostTitleState();
    const theme = useThemeValue();

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
          {...register('title')}
          ref={ref}
          css={textareaStyle(theme === 'DARK')}
          rows={1}
          placeholder={placeholder}
          value={postTitle ?? ''}
          onChange={onChange}
          autoFocus
        />
      </div>
    );
  }
);

WriteTitle.displayName = 'WriteTitle';

const wrapper = css`
  display: flex;
  align-items: center;
  & > * {
    width: 100%;
  }
`;

const textareaStyle = (isDarkMode: boolean) => css`
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
  ${isDarkMode &&
  css`
    color: ${palette.grey[100]};
    background: ${palette.blueGrey[900]};
  `}
  &::placeholder {
    color: ${palette.blueGrey[200]};
    ${isDarkMode &&
    css`
      color: ${palette.grey[600]};
    `}
  }
  ${media.md} {
    font-size: 2.25rem;
  }
`;

export default WriteTitle;
