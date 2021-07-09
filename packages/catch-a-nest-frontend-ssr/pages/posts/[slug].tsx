import { useRouter } from 'next/router';
import Post from '@/components/Post';
import FloatLinkButton from '@/components/FloatLinkButton';
import palette from '@/lib/styles/palette';
import AppLayout from '@/components/AppLayout';

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
