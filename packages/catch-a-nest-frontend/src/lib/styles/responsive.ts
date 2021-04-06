import { css } from '@emotion/react';
import media from './media';

export const responsiveWidth = css`
  margin-left: auto;
  margin-right: auto;
  // margin-left + margin-right: 800px;
  width: 69rem;
  ${media.xxl} {
    width: 50rem;
  }
  ${media.md} {
    width: 36rem;
  }
  ${media.xs} {
    width: 100%;
    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const writePostDetailResponsiveWidth = css`
  width: 40rem;
  ${media.sm} {
    width: 100%;
  }
`;
