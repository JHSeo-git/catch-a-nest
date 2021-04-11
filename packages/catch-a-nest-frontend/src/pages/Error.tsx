import { useLocation } from 'react-router';
import qs from 'qs';
import ErrorInfo from '@src/components/ErrorInfo';

export type ErrorProps = {};

type QuerystringParams = {
  status?: string;
} & qs.ParsedQs;

const Error = (props: ErrorProps) => {
  const location = useLocation();
  console.log(location);
  const query: QuerystringParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  console.log(query.status);

  return <ErrorInfo />;
};

export default Error;
