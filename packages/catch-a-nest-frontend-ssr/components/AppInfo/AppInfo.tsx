import { useThemeValue } from '@/lib/recoil/appState';
import palette from '@/lib/styles/palette';
import { responsiveWidth } from '@/lib/styles/responsive';
import { css } from '@emotion/react';

export type AppInfoProps = {};

function AppInfo(props: AppInfoProps) {
  const theme = useThemeValue();

  return (
    <div css={block(theme === 'DARK')}>
      <p className="copywrite">&#169; 2021</p>
      <a
        rel="noreferrer"
        className="name"
        href="https://github.com/JHSeo-git"
        target="_blank"
      >
        JHSeo
      </a>
    </div>
  );
}

const block = (isDarkMode: boolean) => css`
  height: 100%;
  ${responsiveWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${palette.blueGrey[500]};

  ${isDarkMode &&
  css`
    color: ${palette.grey[100]};
  `}

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

    ${isDarkMode &&
    css`
      color: ${palette.lightBlue[400]};
    `}
  }
`;

export default AppInfo;
