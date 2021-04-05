import { css } from '@emotion/react';
import WritePostTitleInput from './WritePostTitleInput';

export type WritePostTitleProps = {};

const WritePostTitle = (props: WritePostTitleProps) => {
  return (
    <div css={wrapper}>
      <WritePostTitleInput />
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

export default WritePostTitle;
