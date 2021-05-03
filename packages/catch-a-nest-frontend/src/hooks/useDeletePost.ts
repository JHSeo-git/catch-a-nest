import deletePostBySlug from '@src/lib/api/posts/deletePostBySlug';
import { isAxiosError } from '@src/lib/utils/isAxiosError';
import { useAppModalActions } from '@src/states/appModalState';
import { useUserState } from '@src/states/authState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetPostsQueryUpdator } from './query/useGetPostsQuery';
import { useGetTempPostsQueryUpdator } from './query/useGetTempPostsQuery';

export default function useDeletePost() {
  const [user] = useUserState();
  const [loading, setLoading] = useState(false);
  const { remove: removePosts } = useGetPostsQueryUpdator();
  const { remove: removeTempPosts } = useGetTempPostsQueryUpdator();
  const history = useHistory();
  const { open } = useAppModalActions();

  const onDelete = useCallback(
    async (slug: string, isBack: boolean = false) => {
      try {
        setLoading(true);

        const isSuccess = await deletePostBySlug(slug);
        if (!isSuccess) {
          throw new Error(`Fail delete post: ${slug}`);
        }

        removePosts(slug);
        removePosts(slug, user?.id);
        removeTempPosts(slug);
        removeTempPosts(slug, user?.id);

        if (isBack) {
          history.goBack();
        } else {
          history.go(0);
        }
      } catch (e) {
        if (isAxiosError(e)) {
          const statusCode = e.response?.status;
          const message = (() => {
            if (statusCode === 401) {
              return 'Please sign in...';
            }
            return 'Failed delete post...';
          })();

          open({
            title: 'Error',
            message,
          });
        } else {
          // for global boundary
          throw e;
        }
      } finally {
        setLoading(false);
      }
    },
    [history, removePosts, removeTempPosts, user, open]
  );

  return {
    loading,
    onDelete,
  };
}
