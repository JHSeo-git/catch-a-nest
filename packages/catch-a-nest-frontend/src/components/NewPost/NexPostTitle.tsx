import { css } from '@emotion/react';
import NewPostTitleInput from './NewPostTitleInput';

export type NexPostTitleProps = {};

const NexPostTitle = (props: NexPostTitleProps) => {
  return (
    <div css={wrapper}>
      <NewPostTitleInput />
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

export default NexPostTitle;
