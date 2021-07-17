import { useRouter } from 'next/router';
import Post from '@/components/Post';
import FloatLinkButton from '@/components/FloatLinkButton';
import palette from '@/lib/styles/palette';
import AppLayout from '@/components/AppLayout';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { dehydrate } from 'react-query/hydration';
// import { useUserValue } from '@/lib/recoil/authState';
// import { prefetchGetPostBySlugQuery } from '@/hooks/query/useGetPostBySlugQuery';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slug } = context.query;

//   if (typeof slug !== 'string') {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/404',
//       },
//       props: {},
//     };
//   }

//   try {
//     const queryClient = await prefetchGetPostBySlugQuery(slug);
//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//         slug,
//       },
//     };
//   } catch (e) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/404',
//       },
//     };
//   }
// };

// const PostPage = ({
//   slug,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
export type PostPageProps = {};

const PostPage = (props: PostPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

  if (typeof slug !== 'string') return null;

  return (
    <AppLayout>
      <Post slug={slug} />
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
  );
};

export default PostPage;
