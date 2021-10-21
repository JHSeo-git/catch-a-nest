import React, { useMemo } from 'react';
import FloatLinkButton from '@/components/FloatLinkButton';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import PostList from '@/components/PostList';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import useGetPostsQuery, {
  prefetchGetPostsQuery,
} from '@/hooks/query/useGetPostsQuery';
import Container from '@/components/common/Container';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetPostsQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function PostsPage() {
  const { data, hasNextPage, fetchNextPage } = useGetPostsQuery();
  const posts = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.pages.flat();
  }, [data]);

  const fetchNext = () => {
    fetchNextPage();
  };

  return (
    <>
      <PageSEO title="Posts" description="Seo's honest posts" />
      <AppLayout>
        <Container>
          <PostList
            posts={posts}
            hasNextPage={hasNextPage}
            fetchNext={fetchNext}
          />
        </Container>
        <FloatLinkButton iconName="write" to="/write" />
      </AppLayout>
    </>
  );
}

export default PostsPage;
