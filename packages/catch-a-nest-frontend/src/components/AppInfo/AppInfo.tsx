import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { Link } from 'react-router-dom';

export type AppInfoProps = {};

function AppInfo(props: AppInfoProps) {
  return (
    <div css={block}>
      <p className="copywrite">&#169; 2021</p>
      <Link className="name" to="/" target="_blank">
        JHSeo
      </Link>
    </div>
  );
}

const block = css`
  height: 100%;
  ${responsiveWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${palette.blueGrey[500]};
  .copywrite {
    margin: 0;
    padding: 0;
    margin-right: 0.5rem;
  }
  .name {
    text-decoration: none;
    font-weight: bold;
    color: ${palette.blue[500]};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default AppInfo;
