import React from 'react';
import useAppInitializeEffect from '@/hooks/useAppInitializeEffect';

export type RecoilInitializerProps = {};

const RecoilInitializer = (props: RecoilInitializerProps) => {
  useAppInitializeEffect();

  return <></>;
};

export default RecoilInitializer;
