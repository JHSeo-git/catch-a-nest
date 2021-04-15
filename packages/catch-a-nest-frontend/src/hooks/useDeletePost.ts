import deletePostBySlug from '@src/lib/api/posts/deletePostBySlug';
import {
  useDeleteModalValue,
  useSetDeleteModalState,
} from '@src/states/viewState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

export default function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const deleteModal = useDeleteModalValue();
  const setDeleteModal = useSetDeleteModalState();
  const history = useHistory();

  const onDelete = useCallback(
    async (slug: string) => {
      if (!slug) return;
      try {
        setLoading(true);
        const isSuccess = await deletePostBySlug(slug);
        if (!isSuccess) {
          throw new Error(`Fail delete post: ${slug}`);
        }
        setDeleteModal(false);
        history.replace('/');
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [history, setDeleteModal]
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
