import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { dehydrate } from 'react-query/hydration';
import Post from '@/components/Post';
import FloatLinkButton from '@/components/FloatLinkButton';
import palette from '@/lib/styles/palette';
import AppLayout from '@/components/AppLayout';
import getAllPostSlug from '@/lib/api/posts/getAllPostSlug';
import { prefetchGetPostBySlugQuery } from '@/hooks/query/useGetPostBySlugQuery';

// SSR
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
//   const queryClient = await prefetchGetPostBySlugQuery(slug);
//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       slug,
//     },
//   };
// };

// SSG
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

// SSR
// const PostPage = ({
//   slug,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

// CSR
// const PostPage = () => {

// SSG
const PostPage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const router = useRouter();
  // const { slug } = router.query;

  // if (typeof slug !== 'string') return null;

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
