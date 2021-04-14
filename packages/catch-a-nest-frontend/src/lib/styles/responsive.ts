import { css } from '@emotion/react';
import media from './media';

export const responsiveWidth = css`
  margin-left: auto;
  margin-right: auto;
  // margin-left + margin-right: 800px;
  width: 64rem;
  ${media.xxxl} {
    width: 48rem;
  }
  ${media.sm} {
    width: 100%;
    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const responsiveModalWidth = css`
  width: 40rem;
  ${media.sm} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const responsiveReadPostToc = css`
  ${media.custom(1550)} {
    display: none;
  }
`;
