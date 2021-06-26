import { css } from '@emotion/react';
import Logo from '@/assets/images/logo.svg';
import Link from 'next/link';
import { responsiveWidth } from '@/lib/styles/responsive';
import media from '@/lib/styles/media';

export type AppHeaderProps = {};

const AppHeader = (props: AppHeaderProps) => {
  return (
    <section css={sectionStyle}>
      {/* <AppLink css={logoStyle} to="/"> */}
      <Link href="/" passHref={true}>
        <a css={logoStyle}>
          <Logo className="logo" alt="logo" />
        </a>
      </Link>
      {/* </AppLink> */}
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

const logoStyle = css`
  display: flex;
  align-items: center;
  .logo {
    width: auto;
    height: 2.5rem;
  }
`;

export default AppHeader;
