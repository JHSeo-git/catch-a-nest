import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { pageFadeInStyle } from '@/lib/styles/animation';
import WriteButtons from './WriteButtons';
import {
  useExistsTempPostValue,
  useResetAllState,
  useSetLoadTempPost,
  useSetVisiblePublishScreen,
} from '@/lib/recoil/writeState';
import WriteTitle from './WriteTitle';
import TuiEditor from '../Markdown/TuiEditor';
import PublishScreen from './PublishScreen';
import PopupConfirm from '../Popup/PopupConfirm';

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reset = useResetAllState();

  const existsTempPost = useExistsTempPostValue();
  const [visiblePopup, setVisiblePopup] = useState(existsTempPost);
  const setLoadTempPost = useSetLoadTempPost();
  const setVisiblePublishScreen = useSetVisiblePublishScreen();

  // load Temp post Popup OK handler
  const onOK = () => {
    setLoadTempPost(true);
    setVisiblePopup(false);
  };

  const onCancel = () => {
    setVisiblePopup(false);
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
    setVisiblePublishScreen(true);
  };

  // 페이지 unmount될 때 write editor와 관련된 state 모두 reset
  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <>
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
      <PopupConfirm
        visible={visiblePopup}
        title="Could you Load Temp Post?"
        onCancel={onCancel}
        onOK={onOK}
      />
    </>
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
