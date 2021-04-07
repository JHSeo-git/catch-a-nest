import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useEditorLoad from '@src/hooks/useEditorLoad';
import FullscreenLoader from '../FullscreenLoader';

export type EditPostProps = {
  slug: string;
};

const EditPost = ({ slug }: EditPostProps) => {
  const { editorMode, reset } = useEditor();
  const { isLoading } = useEditorLoad(slug);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      {isLoading ? (
        <FullscreenLoader />
      ) : (
        <section css={panelStyle}>
          <WritePostTitle />
          <Editor />
          <WritePostFooter />
        </section>
      )}
      {editorMode === 'detail-page' && <WritePostDetail />}
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default EditPost;
