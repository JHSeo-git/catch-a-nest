import React from 'react';
import { css } from '@emotion/react';
import useGetPostsQuery from '@src/hooks/query/useGetPostsQuery';
import { useEffect, useMemo, useRef } from 'react';
import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';
import PostWriteButton from './PostWriteButton';
import { undrawEmpty } from '@src/assets/images';
import palette from '@src/lib/palette';
import { isAxiosError } from '@src/lib/utils/isAxiosError';
import { useHistory } from 'react-router';

export type PostListProps = {
  userId?: number;
};

const PostList = ({ userId }: PostListProps) => {
  const { data, hasNextPage, fetchNextPage, error } = useGetPostsQuery(userId, {
    retry: 3,
  });
  const history = useHistory();

  const items = useMemo(() => {
    if (!data) return null;
    return data.pages.flat();
  }, [data]);

  const ref = useRef<HTMLDivElement>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      }),
    [fetchNextPage]
  );

  useEffect(() => {
    if (!items) return;
    if (!ref.current) return;
    const el = ref.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [items, observer]);

  if (items && items.length === 0) {
    return (
      <div css={emptyStyle}>
        <img src={undrawEmpty} alt="empty" />
        <p>Well... Not published yet</p>
      </div>
    );
  }

  // TODO: Refactoring to appBoundary
  if (error) {
    if (isAxiosError(error)) {
      const errorUrl = error.response?.status
        ? `/error?status=${error.response.status}`
        : `/error`;
      history.push(errorUrl);
    } else {
      throw error;
    }
  }

  return (
    <>
      <ul css={listStyle}>
        {items
          ? items.map((item) => <PostItem key={item.id} post={item} />)
          : Array.from({ length: 10 }).map((_, i) => (
              <PostItemSkeleton key={i} />
            ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <PostItemSkeleton key={i} ref={i === 0 ? ref : undefined} />
          ))}
      </ul>
      <PostWriteButton />
    </>
  );
};

const listStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const emptyStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 25rem;
  }
  p {
    margin-top: 2.5rem;
    font-size: 1.5rem;
    color: ${palette.blueGrey[700]};
  }
`;

export default PostList;
