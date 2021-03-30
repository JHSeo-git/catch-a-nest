import React from 'react';
import { useUserState } from '@src/states/authState';
import SignPanel from '@src/components/SignPanel';
import NewPost from '@src/components/NewPost';

export type AdminProps = {};

const Admin = (props: AdminProps) => {
  const [user] = useUserState();

  return <>{user ? <NewPost /> : <SignPanel />}</>;
};

export default Admin;
