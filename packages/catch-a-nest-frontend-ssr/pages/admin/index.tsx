import React from 'react';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useUserValue } from '@/lib/recoil/authState';
import PageSEO from '@/components/SEO/PageSEO';
import AppLayout from '@/components/AppLayout';
import { styled } from '@stitches.js';

export type AdminProps = {};

function Admin(props: AdminProps) {
  const userState = useUserValue();

  if (userState) return null;

  return (
    <>
      <PageSEO title="Admin" description="admin page" noRobots={true} />
      <AppLayout>
        <Box>
          <GoogleLoginButton />
        </Box>
      </AppLayout>
    </>
  );
}

const Box = styled('div', {
  position: 'absolute',
  inset: 0,

  display: 'flex',
  jc: 'center',
  ai: 'center',
});

export default Admin;
