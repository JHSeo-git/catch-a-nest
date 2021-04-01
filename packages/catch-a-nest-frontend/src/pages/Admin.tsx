import React from 'react';
import SignPanel from '@src/components/SignPanel';
import { useUserState } from '@src/states/authState';

export type AdminProps = {};

const Admin = (props: AdminProps) => {
  const [user] = useUserState();

  if (user) return null;
  return <SignPanel />;
};

export default Admin;
