import { css } from '@emotion/react';
import AppLayout from '@/components/AppLayout';
import palette from '@/lib/styles/palette';
import ThemeSwitch from '@/components/ThemeSwitch';
import { useThemeValue } from '@/lib/recoil/appState';

export type LabPageProps = {};

const LabPage = (props: LabPageProps) => {
  const theme = useThemeValue();

  return (
    <AppLayout>
      <h1 css={heading(theme === 'DARK')}>Laboratory</h1>
      <ul css={listStyle}>
        <li>
          <div css={themeSwitchBox(theme === 'DARK')}>
            <h2>Dark Mode</h2>
            <ThemeSwitch />
          </div>
        </li>
        <li></li>
      </ul>
    </AppLayout>
  );
};

const heading = (isDarkMode: boolean) => css`
  color: ${palette.lightBlue[700]};

  ${isDarkMode &&
  css`
    color: ${palette.lightBlue[500]};
  `}
`;

const listStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;

  display: block;

  li + li {
    margin-top: 1rem;
    border-top: 0.0625rem solid ${palette.blueGrey[300]};
  }
`;

const themeSwitchBox = (isDarkMode: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    ${isDarkMode &&
    css`
      color: ${palette.grey[50]};
    `}
  }
`;

export default LabPage;
