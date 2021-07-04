import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { pageFadeInStyle } from '@/lib/styles/animation';
import WriteButtons from './WriteButtons';
import { useResetAllState } from '@/lib/recoil/writeState';
import WriteTitle from './WriteTitle';
import TuiEditor from '../Markdown/TuiEditor';

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reset = useResetAllState();

  // Buttons props
  const onBackClick = () => {
    // TODO: 첫 페이지로 이 페이지를 들어왔을 때, push 기능
    router.back();
  };
  const onTempClick = () => {
    console.log('temp click');
    console.log({ editorRef });
  };
  const onPostClick = () => {
    console.log('post click');
  };

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <section css={formStyle}>
      <WriteTitle ref={titleRef} placeholder="Please write title" />
      <div css={editorWrapper}>
        <TuiEditor ref={editorRef} />
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
