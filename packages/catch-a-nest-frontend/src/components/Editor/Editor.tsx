import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { forwardRef, useEffect } from 'react';
import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { syntaxHighlightPlugIn } from '@src/lib/editor/tuiPlugins';
import TuiStyleWrapper from './TuiStyleWrapper';
import { useEditorMarkdownState } from '@src/states/editorState';
import useUploadImage from '@src/hooks/useUploadImage';
import useAppToast from '@src/hooks/useAppToast';
import { convertSpaceToEncodedString } from '@src/lib/utils/viewerUtils';

export type EditorProps = {
  onForceBodyUpdate(markdown: string): void;
  isEdit: boolean;
};

const Editor = (
  { onForceBodyUpdate, isEdit }: EditorProps,
  ref: React.Ref<ReactEditor>
) => {
  const [markdown] = useEditorMarkdownState();
  const { upload } = useUploadImage();
  const { notify } = useAppToast();

  useEffect(() => {
    if (!markdown) return;
    onForceBodyUpdate(markdown);
  }, [markdown, onForceBodyUpdate]);

  if (isEdit && !markdown) return null;

  return (
    <TuiStyleWrapper>
      <ReactEditor
        ref={ref}
        height="100%"
        initialEditType="markdown"
        initialValue={''}
        previewStyle="vertical"
        hideModeSwitch
        plugins={[syntaxHighlightPlugIn]}
        extendedAutolinks={true}
        usageStatistics={false}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const file = blob as File;
            try {
              const imageUrl = await upload({ file, type: 'post' });
              if (!imageUrl) return;
              callback(convertSpaceToEncodedString(imageUrl), file.name);
            } catch (e) {
              notify(`Image Upload Fail: ${e.name}`, 'error');
            }
          },
        }}
      />
    </TuiStyleWrapper>
  );
};

export default forwardRef<ReactEditor, EditorProps>(Editor);
