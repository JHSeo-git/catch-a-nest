import React from 'react';
import SignPanel from '@src/components/SignPanel';
import { useUserState } from '@src/states/authState';
import { Helmet } from 'react-helmet-async';

export type AdminProps = {};

const Admin = (props: AdminProps) => {
  const [user] = useUserState();

  if (user) return null;
  return (
    <>
      <Helmet>
        <title>Login (Admin) – Seo Nest</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SignPanel />
    </>
  );
};

export default Admin;
