import React from 'react';
import { css } from '@emotion/react';
import { useEffect, useMemo, useRef } from 'react';
import PostItemSkeleton from './PostItemSkeleton';
import PostWriteButton from './PostWriteButton';
import { useHistory } from 'react-router';
import useGetTempPostsQuery from '@src/hooks/query/useGetTempPostsQuery';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import TempPostItem from './TempPostItem';

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
      <h1 css={title}>Temp Posts</h1>
      <ul css={listStyle}>
        {items
          ? items.map((item) => <TempPostItem key={item.id} post={item} />)
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

const title = css`
  color: ${palette.blueGrey[900]};
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 3rem;
  ${media.sm} {
    font-size: 2rem;
  }
`;

export default TempPostList;
