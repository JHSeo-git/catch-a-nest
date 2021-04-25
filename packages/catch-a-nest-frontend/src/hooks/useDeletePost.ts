import deletePostBySlug from '@src/lib/api/posts/deletePostBySlug';
import { useUserState } from '@src/states/authState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetPostsQueryUpdator } from './query/useGetPostsQuery';
import { useGetTempPostsQueryUpdator } from './query/useGetTempPostsQuery';

export default function useDeletePost() {
  const [user] = useUserState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { remove: removePosts } = useGetPostsQueryUpdator();
  const { remove: removeTempPosts } = useGetTempPostsQueryUpdator();
  const history = useHistory();

  const onDelete = useCallback(
    async (slug: string, isBack: boolean = false) => {
      try {
        setLoading(true);
        const isSuccess = await deletePostBySlug(slug);
        if (!isSuccess) {
          throw new Error(`Fail delete post: ${slug}`);
        }
        setDeleteModal(false);

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
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [history, setDeleteModal, removePosts, removeTempPosts, user]
  );

  const onDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, [setDeleteModal]);

  const onCancelModal = useCallback(() => {
    setDeleteModal(false);
  }, [setDeleteModal]);

  return {
    onDelete,
    loading,
    error,
    deleteModal,
    onDeleteModal,
    onCancelModal,
  };
}
