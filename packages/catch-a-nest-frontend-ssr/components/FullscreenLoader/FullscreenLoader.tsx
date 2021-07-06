import { css } from '@emotion/react';
import { useScreenLoadingValue } from '@/lib/recoil/appState';
import zIndex from '@/lib/styles/zIndex';
import { pageFadeInStyle, rotateAnimation } from '@/lib/styles/animation';
import useLazyClose from '@/hooks/useLazyClose';
import AppIcon from '../AppIcon';

export type FullscreenLoaderProps = {};

const FullscreenLoader = (props: FullscreenLoaderProps) => {
  const screenLoading = useScreenLoadingValue();
  const { lazyClosed } = useLazyClose(screenLoading, 500);

  if (!screenLoading && lazyClosed) return null;

  return (
    <div css={fullScreen(lazyClosed)}>
      <AppIcon name="spinner" />
    </div>
  );
};

const fullScreen = (visible: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  ${zIndex.fullScreenLoader};

  svg {
    width: 5rem;
    height: 5rem;
    color: white;

    animation: ${rotateAnimation} 1s ease-in-out infinite;
  }
  ${visible
    ? css`
        ${pageFadeInStyle()};
      `
    : css`
        ${pageFadeInStyle(500)}
      `}
`;

export default FullscreenLoader;
