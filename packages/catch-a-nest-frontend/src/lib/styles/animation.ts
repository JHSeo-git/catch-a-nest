import { keyframes } from '@emotion/react';

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
    transform: translate3d(0, 100%, 0);,
  }
  to {
    transofmr: translate3d(0, 0, 0);,
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
