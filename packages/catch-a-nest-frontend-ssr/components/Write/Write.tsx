import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { pageFadeInStyle } from '@/lib/styles/animation';
import WriteButtons from './WriteButtons';
import {
  useResetAllState,
  useSetVisiblePublishScreen,
} from '@/lib/recoil/writeState';
import WriteTitle from './WriteTitle';
import TuiEditor from '../Markdown/TuiEditor';
import PublishScreen from './PublishScreen';

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reset = useResetAllState();

  const setVisiblePublishScreen = useSetVisiblePublishScreen();

  // Buttons props
  const onBackClick = () => {
    // TODO: 첫 페이지로 이 페이지를 들어왔을 때, push 기능
    router.back();
  };
  const onTempClick = () => {
    console.log('temp click');
  };
  const onPostClick = () => {
    setVisiblePublishScreen(true);
  };

  // 페이지 unmount될 때 write editor와 관련된 state 모두 reset
  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <div css={formStyle}>
      <WriteTitle ref={titleRef} placeholder="Please write title" />
      <div css={editorWrapper}>
        <TuiEditor ref={editorRef} />
      </div>
      <WriteButtons
        onBackClick={onBackClick}
        onTempClick={onTempClick}
        onPostClick={onPostClick}
      />
      <PublishScreen />
    </div>
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
