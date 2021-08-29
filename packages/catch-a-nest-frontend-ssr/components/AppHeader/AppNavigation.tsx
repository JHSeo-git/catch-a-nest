import { css } from '@emotion/react';
import { useThemeValue } from '@/lib/recoil/appState';
import { HeaderLinkStyle } from '@/lib/styles/mixins';
import ActiveLink from '../ActiveLink';

export type AppNavigationProps = {};

const AppNavigation = (props: AppNavigationProps) => {
  const theme = useThemeValue();

  return (
    <nav css={block}>
      <ActiveLink
        to="/about"
        css={HeaderLinkStyle(theme === 'DARK')}
        tabIndex={0}
      >
        About
      </ActiveLink>
    </nav>
  );
};

const block = css`
  display: flex;
  align-items: center;
`;

export default AppNavigation;
