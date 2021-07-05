import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { forwardRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import MarkdownStyleWrapper from './MarkdownStyleWrapper';
import { usePostMarkdownValue } from '@/lib/recoil/writeState';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
// import { convertSpaceToEncodedString } from '@/lib/utils/viewerUtils';
// import {
//   useEditorIsTempUseState,
//   useEditorMarkdownState,
// } from '@src/states/editorState';
// import useUploadImage from '@src/hooks/useUploadImage';
// import useAppToast from '@src/hooks/useAppToast';
const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./TuiEditorWrapper'),
  { ssr: false }
);

export type TuiEditorProps = EditorProps & {};

const TuiEditor = forwardRef<EditorType | undefined, TuiEditorProps>(
  ({ ...props }, ref) => {
    const markdown = usePostMarkdownValue();

    return (
      <MarkdownStyleWrapper>
        <Editor
          {...props}
          forwardedRef={ref as React.MutableRefObject<EditorType>}
          height="100%"
          initialEditType="markdown"
          initialValue={markdown ?? ''}
          previewStyle="vertical"
          hideModeSwitch
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
  }
);
TuiEditor.displayName = 'TuiEditor';

export default TuiEditor;

// const TuiEditor = forwardRef(props: TuiEditorProps, ref: React.Ref<EditorType>) => {
//   // const [isTempUse, setIsTempUse] = useEditorIsTempUseState();
//   // const [markdown] = useEditorMarkdownState();
//   // const { upload } = useUploadImage();
//   // const { notify } = useAppToast();

//   // useEffect(() => {
//   //   if (!markdown) return;
//   //   if (isTempUse) {
//   //     onForceBodyUpdate(markdown);
//   //   }
//   // }, [markdown, isTempUse, setIsTempUse, onForceBodyUpdate]);
//   // Editor props
//   const markdown = usePostMarkdownValue();
//   // const forceUpdateEditor = useCallback(
//   //   (markdown: string) => {
//   //     const editorRef = ref as React.MutableRefObject<Editor>;
//   //     console.log({ editorRef });
//   //     if (!editorRef?.current) return;
//   //     editorRef.current.getInstance().setMarkdown(markdown, true);
//   //   },
//   //   [ref]
//   // );

//   return (
//     <MarkdownStyleWrapper>
//       <Editor
//         ref={editorRef}
//         height="100%"
//         initialEditType="markdown"
//         previewStyle="vertical"
//         hideModeSwitch
//         plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
//         extendedAutolinks={true}
//         usageStatistics={false}
//         hooks={{
//           addImageBlobHook: async (blob, callback) => {
//             // const file = blob as File;
//             // try {
//             //   const imageUrl = await upload({ file, type: 'post' });
//             //   if (!imageUrl) return;
//             //   callback(convertSpaceToEncodedString(imageUrl), file.name);
//             // } catch (e) {
//             //   notify(`Image Upload Fail: ${e.name}`, 'error');
//             // }
//           },
//         }}
//         onChange={(editor) => {
//           console.log({ editor, ref });
//         }}
//       />
//     </MarkdownStyleWrapper>
//   );
// };
