import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/posts');
  }, [router]);

  return <h1>This page is redirect to '/posts'</h1>;
}
