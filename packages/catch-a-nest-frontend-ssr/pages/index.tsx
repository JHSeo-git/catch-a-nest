import React, { useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import useGetPostsByLatestQuery, {
  prefetchGetPostsByLatestQuery,
} from '@/hooks/query/useGetPostsByLatestQuery';
import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import PostItem from '@/components/PostList/PostItem';
import ActiveLink from '@/components/ActiveLink';
import AppIcon from '@/components/AppIcon';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetPostsByLatestQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const HomePage = () => {
  const { data, error } = useGetPostsByLatestQuery();

  const posts = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  if (error) {
  }

  return (
    <>
      <PageSEO title="Posts" description="Seo's honest nest" />
      <AppLayout>
        <section css={hero}>
          <h1>
            &lt;<em className="highlight">S</em>
            <em> / </em>&gt;
          </h1>
          <h2>Latest posts</h2>
        </section>
        <ul css={list}>
          {posts?.map((post) => (
            <PostItem key={post.id} post={post} viewThumbnail={false} />
          ))}
        </ul>
        <div css={linkBox}>
          <ActiveLink to="/posts" tabIndex={0}>
            All Posts
            <AppIcon name="arrowRight" />
          </ActiveLink>
        </div>
      </AppLayout>
    </>
  );
};

const hero = css`
  h1 {
    color: ${palette.blueGrey[400]};
    .highlight {
      color: #56ccf2;
    }
    font-size: 4rem;
    text-align: center;
  }
  h2 {
    color: ${palette.blueGrey[400]};
    font-size: 2rem;
  }
`;

const list = css`
  margin: 0;
  padding: 0;
  list-style: none;

  li + li {
    margin-top: 1rem;
  }
`;

const linkBox = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  a {
    color: ${palette.blueGrey[800]};
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-left: 0.25rem;
      color: ${palette.blue[500]};
      width: 1rem;
      height: 1rem;

      transition: all 0.1s ease;
    }

    &:hover {
      color: ${palette.blueGrey[600]};

      svg {
        color: ${palette.blue[300]};
        transform: translate3d(0.25rem, 0, 0);
      }
    }
  }
`;

export default HomePage;
