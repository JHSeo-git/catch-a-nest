import { css } from '@emotion/react';
import media from './media';

export const responsiveWidth = css`
  margin-left: auto;
  margin-right: auto;
  // margin-left + margin-right: 800px;
  width: 80rem;
  ${media.xxl} {
    width: 58rem;
  }
  ${media.md} {
    width: 36rem;
  }
  ${media.xs} {
    width: 100%;
    margin: 0;
  }
`;
