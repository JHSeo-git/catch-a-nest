import { css } from '@emotion/react';
import useGetPostsQuery from '@src/hooks/query/useGetPostsQuery';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { useEffect, useMemo, useRef } from 'react';
import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';

export type PostListProps = {
  userId?: number;
};

const PostList = ({ userId }: PostListProps) => {
  const { data, hasNextPage, fetchNextPage } = useGetPostsQuery(userId);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
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
  );
};

const listStyle = css`
  margin: 0;
  padding: 0;
  ${responsiveWidth};
  list-style: none;
  padding: 2rem 1rem;
`;

export default PostList;
