import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { forwardRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import MarkdownStyleWrapper from './MarkdownStyleWrapper';
// import { convertSpaceToEncodedString } from '@/lib/utils/viewerUtils';
// import {
//   useEditorIsTempUseState,
//   useEditorMarkdownState,
// } from '@src/states/editorState';
// import useUploadImage from '@src/hooks/useUploadImage';
// import useAppToast from '@src/hooks/useAppToast';

export type TuiEditorProps = {
  onForceBodyUpdate(markdown: string): void;
  isEdit: boolean;
};

const TuiEditor = (
  { onForceBodyUpdate, isEdit }: TuiEditorProps,
  ref: React.Ref<Editor>
) => {
  // const [isTempUse, setIsTempUse] = useEditorIsTempUseState();
  // const [markdown] = useEditorMarkdownState();
  // const { upload } = useUploadImage();
  // const { notify } = useAppToast();

  // useEffect(() => {
  //   if (!markdown) return;
  //   if (isTempUse) {
  //     onForceBodyUpdate(markdown);
  //   }
  // }, [markdown, isTempUse, setIsTempUse, onForceBodyUpdate]);

  // if (isEdit && !markdown) return null;

  const markdown = '';

  return (
    <MarkdownStyleWrapper>
      <Editor
        ref={ref}
        height="100%"
        initialEditType="markdown"
        initialValue={markdown ?? ''}
        previewStyle="vertical"
        hideModeSwitch
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        extendedAutolinks={true}
        usageStatistics={false}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            // const file = blob as File;
            // try {
            //   const imageUrl = await upload({ file, type: 'post' });
            //   if (!imageUrl) return;
            //   callback(convertSpaceToEncodedString(imageUrl), file.name);
            // } catch (e) {
            //   notify(`Image Upload Fail: ${e.name}`, 'error');
            // }
          },
        }}
      />
    </MarkdownStyleWrapper>
  );
};

export default forwardRef<Editor, TuiEditorProps>(TuiEditor);
