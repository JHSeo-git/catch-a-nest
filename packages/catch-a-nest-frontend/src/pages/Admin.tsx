import React from 'react';
import Layout from '@src/components/Layout';
import SignPanel from '@src/components/SignPanel';
import { useUserState } from '@src/states/authState';
import Header from '@src/components/Header';

export type AdminProps = {};

const Admin = (props: AdminProps) => {
  const [user] = useUserState();
  return (
    <>
      {user ? (
        <Layout>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.Side>side</Layout.Side>
          <Layout.Main>main</Layout.Main>
        </Layout>
      ) : (
        <SignPanel />
      )}
    </>
  );
};

export default Admin;
