import React from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';
import ErrorInfo from '@src/components/ErrorInfo';
import { Helmet } from 'react-helmet-async';

export type ErrorProps = {};

type QuerystringParams = {
  status?: string;
} & qs.ParsedQs;

const Error = (props: ErrorProps) => {
  const location = useLocation();
  const { status }: QuerystringParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <>
      <Helmet>
        <title>Error – Seo Nest</title>
      </Helmet>
      <ErrorInfo
        errorType={status && status === '404' ? 'NotFound' : 'NotAuthorized'}
      />
    </>
  );
};

export default Error;
