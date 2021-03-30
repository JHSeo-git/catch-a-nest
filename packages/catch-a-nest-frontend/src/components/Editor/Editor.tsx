import { Editor as ToastEditor } from '@toast-ui/react-editor';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { css } from '@emotion/react';
import { useRef } from 'react';
import { useEditorMarkdownValueState } from '@src/states/editorState';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<ToastEditor>(null);
  const [, setEditorMarkdownValue] = useEditorMarkdownValueState();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdownValue(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <div css={editorWrapper}>
      <ToastEditor
        ref={editorRef}
        height="100%"
        initialEditType="markdown"
        previewStyle="vertical"
        hideModeSwitch
        events={{
          change: onChange,
        }}
      />
    </div>
  );
};

const editorWrapper = css`
  flex: 1;
`;

export default Editor;
