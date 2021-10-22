import MarkdownRender from '../Markdown/MarkdownRender';

export type PostBodyProps = {
  markdown: string;
};

const PostBody = ({ markdown }: PostBodyProps) => {
  return <MarkdownRender markdown={markdown} />;
};

export default PostBody;
