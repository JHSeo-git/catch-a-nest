import { css } from '@emotion/react';
import { responsiveWidth } from '@/lib/styles/responsive';
import media from '@/lib/styles/media';
import UserNavigation from './UserNavigation';
import AppLogo from './AppLogo';
import AppNavigation from './AppNavigation';

export type AppHeaderProps = {};

const AppHeader = (props: AppHeaderProps) => {
  return (
    <section css={sectionStyle}>
      <AppLogo />
      <AppNavigation />
      <UserNavigation />
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  ${responsiveWidth};
  ${media.custom(650)} {
    padding: 0 1rem;
  }
`;

export default AppHeader;
