import WritePost from '@src/components/WritePost';
import EditPost from '@src/components/WritePost/EditPost';
import { useUserState } from '@src/states/authState';
import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';

export type WriteProps = {};

type ParamsType = {
  slug?: string;
};

const Write = (props: WriteProps) => {
  const [user] = useUserState();
  // const params = useParams();
  const {
    path,
    params: { slug },
  } = useRouteMatch<ParamsType>();

  const isEdit = useMemo(() => {
    return path.startsWith('/edit');
  }, [path]);

  if (!user) return null;
  if (isEdit && !slug) return null;

  return isEdit ? <EditPost slug={slug!} /> : <WritePost />;
};

export default Write;
