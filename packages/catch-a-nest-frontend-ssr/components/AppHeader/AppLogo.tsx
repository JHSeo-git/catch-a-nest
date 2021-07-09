import Link from 'next/link';
import { css } from '@emotion/react';
import Logo from '@/assets/images/logo.svg';

export type AppLogoProps = {};

const AppLogo = (props: AppLogoProps) => {
  return (
    <Link href="/" passHref={true}>
      <a css={logoStyle}>
        <Logo className="logo" alt="logo" />
      </a>
    </Link>
  );
};

const logoStyle = css`
  display: flex;
  align-items: center;
  .logo {
    width: auto;
    height: 2.5rem;
  }
`;

export default AppLogo;
