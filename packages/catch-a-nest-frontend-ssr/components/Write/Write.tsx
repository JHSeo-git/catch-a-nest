import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Editor } from '@toast-ui/react-editor';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { pageFadeInStyle } from '@/lib/styles/animation';
import {
  PostAllContentType,
  useExistsTempPostValue,
  useResetAllState,
  useSetLoadTempPost,
  useSetVisiblePublishScreen,
} from '@/lib/recoil/writeState';
import useSavePost from '@/hooks/useSavePost';
import WriteButtons from './WriteButtons';
import WriteTitle from './WriteTitle';
import TuiEditor from '../Markdown/TuiEditor';
import PublishScreen from './PublishScreen';
import PopupConfirm from '../Popup/PopupConfirm';
import PreviewScreen from './PreviewScreen';
import useWarnIfUnsavedChanges from '@/hooks/useWarnIfUnsavedChanges';

export type WriteProps = {
  slug?: string;
};

export type WriteInputs = {
  title: string;
  shortDescription?: string;
  thumbnailUrl?: string;
};

const Write = ({ slug }: WriteProps) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reset = useResetAllState();

  const existsTempPost = useExistsTempPostValue();
  const setLoadTempPost = useSetLoadTempPost();

  // publish prepare
  const { register, handleSubmit, setValue } = useForm<WriteInputs>();
  const handleThumbnailUrl = (url: string) => {
    setValue('thumbnailUrl', url);
  };
  const validateTextRequired = (text?: string) => {
    if (text && text.trim().length > 0) return true;
    return false;
  };

  // popup hook
  const setVisiblePublishScreen = useSetVisiblePublishScreen();
  const [visiblePopup, setVisiblePopup] = useState(existsTempPost);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // save post hook
  const { savePost, saveTempPost, error } = useSavePost();

  // submit
  const onPublish = async (data: WriteInputs, isTemp = false) => {
    try {
      const { title, shortDescription, thumbnailUrl } = data;
      const markdown = editorRef?.current?.getInstance().getMarkdown();

      if (!validateTextRequired(title)) {
        setAlertMessage('Please type title!');
        setVisibleAlert(true);
        return;
      }
      if (!validateTextRequired(markdown)) {
        setAlertMessage('Please type markdown!');
        setVisibleAlert(true);
        return;
      }

      const publishPost: PostAllContentType = {
        title: title,
        markdown: markdown!,
        shortDescription: shortDescription ?? '',
        thumbnailUrl: thumbnailUrl ?? '',
      };

      if (isTemp) {
        await saveTempPost({ slug, post: publishPost });
      } else {
        await savePost({ slug, post: publishPost });
        router.replace('/posts');
      }
      toast.success('👍 Success Save!');
    } catch (e) {}
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
  const onPostClick: SubmitHandler<WriteInputs> = (data) => {
    const { title } = data;
    const markdown = editorRef?.current?.getInstance().getMarkdown();

    if (!validateTextRequired(title)) {
      setAlertMessage('Please type title!');
      setVisibleAlert(true);
      return;
    }
    if (!validateTextRequired(markdown)) {
      setAlertMessage('Please type markdown!');
      setVisibleAlert(true);
      return;
    }

    setVisiblePublishScreen(true);
  };

  // 페이지 unmount될 때 write editor와 관련된 state 모두 reset
  useEffect(() => {
    return () => reset();
  }, [reset]);

  // preview
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [previewMarkdown, setPreviewMarkdown] = useState('');
  const onPreviewClick = () => {
    const markdown = editorRef?.current?.getInstance().getMarkdown();
    if (!validateTextRequired(markdown)) {
      setAlertMessage('Please type markdown!');
      setVisibleAlert(true);
      return;
    }

    setPreviewMarkdown(markdown!);
    setVisiblePreview(true);
  };
  const onPreviewClose = () => {
    setVisiblePreview(false);
  };

  // alert when exit page with unsavedChanges
  useWarnIfUnsavedChanges(true);

  return (
    <>
      <div css={formStyle}>
        <WriteTitle
          ref={titleRef}
          register={register}
          placeholder="Please write title"
        />
        <div css={editorWrapper}>
          <TuiEditor ref={editorRef} />
        </div>
        <WriteButtons
          onBackClick={onBackClick}
          onTempClick={handleSubmit(
            async (data) => await onPublish(data, true)
          )}
          onPreviewClick={onPreviewClick}
          onPostClick={handleSubmit(onPostClick)}
        />
        <PublishScreen
          handleThumbnailUrl={handleThumbnailUrl}
          register={register}
          onPublish={handleSubmit(async (data) => await onPublish(data))}
        />
        <PreviewScreen
          markdown={previewMarkdown}
          onClose={onPreviewClose}
          visible={visiblePreview}
        />
      </div>
      <PopupConfirm
        visible={visiblePopup}
        title="Load Temp Post?"
        onCancel={onCancel}
        onOK={onOK}
        openDelay={true}
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
