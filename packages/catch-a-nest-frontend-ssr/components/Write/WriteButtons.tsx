import { css } from '@emotion/react';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import AppButton from '../AppButton';
import { useIsEditPostValue } from '@/lib/recoil/writeState';

export type WriteButtonsProps = {
  onBackClick(): void;
  onTempClick(): void;
  onPostClick(): void;
};

const WriteButtons = ({
  onBackClick,
  onTempClick,
  onPostClick,
}: WriteButtonsProps) => {
  const isEditPost = useIsEditPostValue();

  return (
    <div css={buttonBox}>
      <AppButton
        type="normal"
        text="BACK"
        onClick={onBackClick}
        preIconName="arrowLeft"
      />
      <AppButton
        type="secondary"
        text="TEMP"
        onClick={onTempClick}
        preIconName="plus"
        preIconColor={palette.white}
      />
      <AppButton
        type="primary"
        text={isEditPost ? 'UPDATE' : 'POST'}
        onClick={onPostClick}
        preIconName="arrowUp"
        preIconColor={palette.white}
        hoverAnimationDirect="up"
      />
    </div>
  );
};

const buttonBox = css`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  padding-left: 1rem;

  ${media.sm} {
    padding: 0;
    button {
      border-radius: 0;
      height: 100%;
      width: 100%;
    }
  }
`;

export default WriteButtons;
