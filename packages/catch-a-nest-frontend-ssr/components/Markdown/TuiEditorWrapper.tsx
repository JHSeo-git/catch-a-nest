import { Editor, EditorProps } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { convertSpaceToEncodedString } from '@/lib/utils/viewerUtils';
import useUploadImage from '@/hooks/useUploadImage';

export type TuiEditorWithForwardedProps = EditorProps & {
  forwardedRef?: React.MutableRefObject<Editor>;
};

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => {
  const { upload } = useUploadImage();
  return (
    <Editor
      {...props}
      ref={props.forwardedRef}
      previewStyle="vertical"
      hideModeSwitch
      autofocus={false}
      initialEditType="markdown"
      extendedAutolinks={true}
      usageStatistics={false}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      hooks={{
        addImageBlobHook: async (blob, callback) => {
          const file = blob as File;
          try {
            const imageUrl = await upload({ file, type: 'post' });
            if (!imageUrl) return;
            callback(convertSpaceToEncodedString(imageUrl), file.name);
          } catch (e) {
            // notify(`Image Upload Fail: ${e.name}`, 'error');
          }
        },
      }}
    />
  );
};

export default TuiEditorWrapper;
