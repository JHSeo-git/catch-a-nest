import { css } from '@emotion/react';
import { responsiveWidth } from '@/lib/styles/responsive';
import media from '@/lib/styles/media';
import Navigation from './Navigation';
import AppLogo from './AppLogo';

export type AppHeaderProps = {};

const AppHeader = (props: AppHeaderProps) => {
  return (
    <section css={sectionStyle}>
      <AppLogo />
      <Navigation />
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${responsiveWidth};
  ${media.custom(650)} {
    padding: 0 1rem;
  }
`;

export default AppHeader;
