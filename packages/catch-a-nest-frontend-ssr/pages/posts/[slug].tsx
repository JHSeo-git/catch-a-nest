import React, { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { dehydrate } from 'react-query/hydration';
import Post from '@/components/Post';
import FloatLinkButton from '@/components/FloatLinkButton';
import palette from '@/lib/styles/palette';
import AppLayout from '@/components/AppLayout';
import getAllPostSlug from '@/lib/api/posts/getAllPostSlug';
import useGetPostBySlugQuery, {
  prefetchGetPostBySlugQuery,
} from '@/hooks/query/useGetPostBySlugQuery';
import Container from '@/components/common/Container';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  if (typeof params.slug !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  const queryClient = await prefetchGetPostBySlugQuery(params.slug);

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getAllPostSlug();
  const paths = postSlugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

type PostPageProps = {
  slug: string;
};

function PostPage({ slug }: PostPageProps) {
  const { data } = useGetPostBySlugQuery(slug);
  const post = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppLayout>
        <Container>
          <Post post={post} />
        </Container>
        <FloatLinkButton
          //
          iconName="write"
          to={`/write`}
          position="first"
        />
        <FloatLinkButton
          iconName="fix"
          to={`/write/${slug}`}
          color={palette.indigo[500]}
          position="second"
        />
      </AppLayout>
    </>
  );
}

export default PostPage;
