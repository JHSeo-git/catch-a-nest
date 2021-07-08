import React from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useUserValue } from '@/lib/recoil/authState';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';

export type AdminProps = {};

function Admin(props: AdminProps) {
  const userState = useUserValue();

  if (userState) return null;

  return (
    <>
      <PageSEO title="Admin" description="admin page" noRobots={true} />
      <AppLayout>
        <div css={block}>
          <div css={box}>
            <GoogleLoginButton />
          </div>
        </div>
      </AppLayout>
    </>
  );
}

const block = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(
      117.37deg,
      #d8f0fa 13.43%,
      rgba(255, 255, 255, 0.64) 88.2%
    ),
    #158dfc; */
`;

const box = css`
  width: 20rem;
`;

export default Admin;
