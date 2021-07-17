// import MarkdownItViewer from '../Markdown/MarkdownItViewer';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { SSRMarkdownItViewer } from '../Markdown/MarkdownItViewer';

const MarkdownItViewer = dynamic(() => import('../Markdown/MarkdownItViewer'), {
  ssr: false,
});

export type PostBodyProps = {
  markdown: string;
};

const PostBody = ({ markdown }: PostBodyProps) => {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    // client loaded
    ref.current = true;
  }, [ref]);

  if (ref?.current) {
    return <MarkdownItViewer markdown={markdown} />;
  }

  return <SSRMarkdownItViewer markdown={markdown} />;
};

export default PostBody;
