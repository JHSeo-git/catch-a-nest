import React from 'react';
import Head from 'next/head';
import PostList from '@/components/PostList';

export type PostsPageProps = {};

// TODO: 구조 변경 고민
// - ssg, ssr 할 수 없는 구조 인 것 같다
// - 1. loggin 된 userId를 이용해 cache key를 구성하는 점
// - 2. createKey 함수를 hook에서 관리하는 점
// - 이러한 이유로 인해 ssg, ssr는 현재 적용하지 않고 기존 csr 방식대로 한다
// - 다만, 구조를 변경할 시점이 오게 되면 최우선적으로 ssg, ssr을 고려한다
// export const getStaticProps: GetStaticProps = async (context) => {
//   console.log(context);
//   // FIXME: userId test
//   // 문제는 prefetch 할 때 userId가 필요한데 state를 통해서 가져올 수 있나?
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery('posts');

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

const PostsPage = (props: PostsPageProps) => {
  return (
    <>
      <Head>
        <title>Posts – Seo Nest</title>
      </Head>
      <PostList />
    </>
  );
};

export default PostsPage;
