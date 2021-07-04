import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { pageFadeInStyle } from '@/lib/styles/animation';
import WriteButtons from './WriteButtons';

const WriteTitle = dynamic(() => import('./WriteTitle'), { ssr: false });
const TuiEditor = dynamic(() => import('../Markdown/TuiEditor'), {
  ssr: false,
  // loading: function Loading() {
  //   return <div>Loading...</div>;
  // },
});

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  // Editor props
  const onForceUpdate = (markdown: string) => {
    if (!editorRef?.current) return;
    editorRef.current.getInstance().setMarkdown(markdown, true);
  };

  // Buttons props
  const onBackClick = () => {
    // TODO: 첫 페이지로 이 페이지를 들어왔을 때, push 기능
    router.back();
  };
  const onTempClick = () => {
    console.log('temp click');
  };
  const onPostClick = () => {
    console.log('post click');
  };

  console.log('re=render write');

  return (
    <section css={formStyle}>
      <WriteTitle ref={titleRef} placeholder="Please write title" />
      <div css={editorWrapper}>
        <TuiEditor ref={editorRef} onForceUpdate={onForceUpdate} />
      </div>
      <WriteButtons
        onBackClick={onBackClick}
        onTempClick={onTempClick}
        onPostClick={onPostClick}
      />
    </section>
  );
};

const formStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${pageFadeInStyle};
`;

const editorWrapper = css`
  flex: 1;
`;

export default Write;
