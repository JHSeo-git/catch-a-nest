import { useLocation } from 'react-router';
import qs from 'qs';
import ErrorInfo from '@src/components/ErrorInfo';

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
    <ErrorInfo
      errorType={status && status === '404' ? 'NotFound' : 'NotAuthorized'}
    />
  );
};

export default Error;
