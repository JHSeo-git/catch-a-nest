import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { syntaxHighlightPlugIn } from '@src/lib/editor/tuiPlugins';
import useEditor from '@src/hooks/useEditor';
import TuiStyleWrapper from './TuiStyleWrapper';
import {
  useEditorIsTempUseState,
  useEditorMarkdownState,
} from '@src/states/editorState';
import useUploadImage from '@src/hooks/useUploadImage';
import useAppToast from '@src/hooks/useAppToast';
import { useEffect } from 'react';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const { editorRef, onChange, isEdit, onForceBodyUpdate } = useEditor();
  const [useIsTemp] = useEditorIsTempUseState();
  const [markdown] = useEditorMarkdownState();
  const { upload } = useUploadImage();
  const { notify } = useAppToast();

  useEffect(() => {
    if (!useIsTemp) return;
    if (!markdown) return;
    onForceBodyUpdate(markdown);
  }, [useIsTemp, markdown, onForceBodyUpdate]);

  if (isEdit && !markdown) return null;

  return (
    <TuiStyleWrapper>
      <ReactEditor
        ref={editorRef}
        height="100%"
        initialEditType="markdown"
        initialValue={markdown ?? undefined}
        previewStyle="vertical"
        hideModeSwitch
        events={{
          change: onChange,
        }}
        plugins={[syntaxHighlightPlugIn]}
        extendedAutolinks={true}
        usageStatistics={false}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const file = blob as File;
            try {
              const imageUrl = await upload({ file, type: 'post' });
              if (!imageUrl) return;
              callback(imageUrl, file.name);
            } catch (e) {
              notify(`Image Upload Fail: ${e.name}`, 'error');
            }
          },
        }}
      />
    </TuiStyleWrapper>
  );
};

export default Editor;
