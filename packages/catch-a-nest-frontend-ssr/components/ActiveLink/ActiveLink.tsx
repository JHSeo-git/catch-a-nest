import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export type ActiveLinkProps = {
  to: string;
  scroll?: boolean;
  exact?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ClassAttributes<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ActiveLink = ({
  to,
  scroll = true,
  exact,
  children,
  className,
  ...props
}: ActiveLinkProps) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === to : pathname.startsWith(to);

  if (isActive) {
    className += ' current';
  }

  return (
    <Link href={to} scroll={scroll}>
      <a className={className} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
