import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { pageFadeInStyle } from '@/lib/styles/animation';
import WriteButtons from './WriteButtons';
import {
  useExistsTempPostValue,
  usePostAllContentValue,
  usePostShortDescriptionValue,
  usePostThumbnailUrlValue,
  usePostTitleValue,
  useResetAllState,
  useSetLoadTempPost,
  useSetPostAllContent,
  useSetVisiblePublishScreen,
} from '@/lib/recoil/writeState';
import WriteTitle from './WriteTitle';
import TuiEditor from '../Markdown/TuiEditor';
import PublishScreen from './PublishScreen';
import PopupConfirm from '../Popup/PopupConfirm';
import useSavePost from '@/hooks/useSavePost';

export type WriteProps = {
  slug?: string;
};

const Write = ({ slug }: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reset = useResetAllState();
  const setPostAllContent = useSetPostAllContent();

  const existsTempPost = useExistsTempPostValue();
  const setLoadTempPost = useSetLoadTempPost();
  const setVisiblePublishScreen = useSetVisiblePublishScreen();
  const postAllContent = usePostAllContentValue();

  const [visiblePopup, setVisiblePopup] = useState(existsTempPost);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // save prepare
  const title = usePostTitleValue();

  // save post hook
  const { savePost, saveTempPost, error } = useSavePost();
  const onSave = () => {
    savePost({ slug, post: postAllContent });
  };

  // load Temp post Popup OK handler
  const onOK = () => {
    setLoadTempPost(true);
    setVisiblePopup(false);
  };

  const onCancel = () => {
    setVisiblePopup(false);
  };

  // alert Popup OK handler
  const onAlertOK = () => {
    setVisibleAlert(false);
  };

  // Buttons props
  const onBackClick = () => {
    // TODO: 첫 페이지로 이 페이지를 들어왔을 때, push 기능
    router.back();
  };
  const onTempClick = () => {
    if (!title || title.trim().length === 0) {
      setAlertMessage('Title is Required');
      setVisibleAlert(true);
      return;
    }
    if (
      !editorRef.current?.getInstance().getMarkdown() ||
      editorRef.current?.getInstance().getMarkdown().trim().length === 0
    ) {
      setAlertMessage('Markdown is Required');
      setVisibleAlert(true);
      return;
    }

    setPostAllContent(
      {
        title,
        markdown: editorRef.current?.getInstance().getMarkdown() ?? '',
        shortDescription: postAllContent.shortDescription,
        thumbnailUrl: postAllContent.thumbnailUrl,
      },
      false
    );

    saveTempPost({ slug, post: postAllContent });
  };
  const onPostClick = () => {
    setVisiblePublishScreen(true);
  };

  // 페이지 unmount될 때 write editor와 관련된 state 모두 reset
  useEffect(() => {
    return () => reset();
  }, [reset]);

  // FIXME: error 처리
  if (error) console.log(error);

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
        <PublishScreen onSave={onSave} />
      </div>
      <PopupConfirm
        visible={visiblePopup}
        title="Could you Load Temp Post?"
        onCancel={onCancel}
        onOK={onOK}
      />
      <PopupConfirm
        visible={visibleAlert}
        title="Alert"
        message={alertMessage}
        onOK={onAlertOK}
      />
    </>
  );
};

const formStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${pageFadeInStyle()};
`;

const editorWrapper = css`
  flex: 1;
`;

export default Write;
