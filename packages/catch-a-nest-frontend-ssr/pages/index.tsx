import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  // TODO: main 화면 추가?
  // 일단 posts 화면으로 redirect
  useEffect(() => {
    router.push('/posts');
  }, [router]);

  return null;
}
