import MarkdownItViewer from '../Markdown/MarkdownItViewer';
import MarkdownMDXRemote from '../Markdown/MarkdownMDXRemote';

export type PostBodyProps = {
  markdown: string;
};

const PostBody = ({ markdown }: PostBodyProps) => {
  // return <MarkdownItViewer markdown={markdown} />;
  return <MarkdownMDXRemote markdown={markdown} />;
};

export default PostBody;
