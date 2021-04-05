import 'highlight.js/styles/atom-one-light.css';

import { css } from '@emotion/react';
import React from 'react';

export type TuiStyleWrapperProps = {
  children?: React.ReactNode;
};

const TuiStyleWrapper = ({ children }: TuiStyleWrapperProps) => {
  return <div css={tuiStyle}>{children}</div>;
};

const tuiStyle = css`
  height: 100%;
`;

export default TuiStyleWrapper;
