import React from 'react';
import { css } from '@emotion/react';
import { useEffect, useMemo, useRef } from 'react';
import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';
import PostWriteButton from './PostWriteButton';
import { useHistory } from 'react-router';
import useGetTempPostsQuery from '@src/hooks/query/useGetTempPostsQuery';

export type TempPostListProps = {
  userId?: number;
};

const TempPostList = ({ userId }: TempPostListProps) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetTempPostsQuery(userId, { retry: 3 });
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const items = useMemo(() => {
    if (!data) return null;
    return data.pages.flat();
  }, [data]);

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

  if (isError) {
    history.push('/error?status=404');
  }

  return (
    <>
      <h1>Temp Posts</h1>
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

export default TempPostList;
