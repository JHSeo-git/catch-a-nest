import MarkdownItViewer from '../Markdown/MarkdownItViewer';

export type PostBodyProps = {
  markdown: string;
};

const PostBody = ({ markdown }: PostBodyProps) => {
  return <MarkdownItViewer markdown={markdown} />;
};

export default PostBody;
