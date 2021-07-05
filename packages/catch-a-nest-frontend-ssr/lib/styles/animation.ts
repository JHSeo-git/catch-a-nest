import { css, keyframes } from '@emotion/react';

export const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const slideUp = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transofmr: translate3d(0, 0, 0);,
  }
`;

export const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const zoomOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

export const shining = keyframes`
  0%{
    opacity : 0.5;
  }
  50%{
    opacity : 1;
  }
  100%{
    opacity : 0.5;
  }
`;

export const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity :1;
  }
`;

export const pageFadeInStyle = css`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const pageZoomInStyle = (runTime = 500, delayTime = 0) => css`
  animation: ${zoomIn} ${runTime / 1000}s cubic-bezier(0.165, 0.84, 0.44, 1)
    forwards;
  animation-delay: ${delayTime / 1000}s;
`;
export const pageZoomOutStyle = (runTime = 500, delayTime = 0) => css`
  animation: ${zoomOut} ${runTime / 1000}s cubic-bezier(0.165, 0.84, 0.44, 1)
    forwards;
  animation-delay: ${delayTime}s;
`;
