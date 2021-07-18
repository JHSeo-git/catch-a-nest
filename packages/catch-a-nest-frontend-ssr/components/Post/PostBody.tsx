// import MarkdownItViewer from '../Markdown/MarkdownItViewer';

import dynamic from 'next/dynamic';

const MarkdownItViewer = dynamic(() => import('../Markdown/MarkdownItViewer'), {
  ssr: false,
});

export type PostBodyProps = {
  markdown: string;
};

const PostBody = ({ markdown }: PostBodyProps) => {
  return <MarkdownItViewer markdown={markdown} />;
};

export default PostBody;
