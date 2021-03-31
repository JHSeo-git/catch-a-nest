import { css } from '@emotion/react';
import { rotateAnimation } from '@src/lib/styles/animation';
import zIndex from '@src/lib/styles/zIndex';
import { useFullScreenLoaderState } from '@src/states/appState';
import AppIcon from '../AppIcon';

export type FullscreenLoaderProps = {};

const FullscreenLoader = (props: FullscreenLoaderProps) => {
  const [view] = useFullScreenLoaderState();

  if (!view) return null;

  return (
    <div css={fullScreen}>
      <AppIcon name="spinner" />
    </div>
  );
};

const fullScreen = css`
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
`;

export default FullscreenLoader;
