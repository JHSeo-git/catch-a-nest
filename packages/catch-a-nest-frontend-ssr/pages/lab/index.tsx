import { css } from '@emotion/react';
import AppLayout from '@/components/AppLayout';
import palette from '@/lib/styles/palette';
import ThemeSwitch from '@/components/ThemeSwitch';

export type LabPageProps = {};

const LabPage = (props: LabPageProps) => {
  return (
    <AppLayout>
      <h1 css={heading}>Labatory</h1>
      <ul css={listStyle}>
        <li>
          <div css={themeSwitchBox}>
            <h2>Dark Mode</h2>
            <ThemeSwitch />
          </div>
        </li>
        <li></li>
      </ul>
    </AppLayout>
  );
};

const heading = css`
  color: ${palette.lightBlue[700]};
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

const themeSwitchBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default LabPage;
