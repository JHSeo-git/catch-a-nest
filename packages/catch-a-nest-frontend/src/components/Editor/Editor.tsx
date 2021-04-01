import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { css } from '@emotion/react';
import { useRef } from 'react';
import { useEditorMarkdownState } from '@src/states/editorState';
import { syntaxHighlightPlugIn } from '@src/lib/editor';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<ReactEditor>(null);
  const [, setEditorMarkdownValue] = useEditorMarkdownState();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdownValue(editorRef.current.getInstance().getMarkdown());
  };

  // TODO: custom style
  return (
    <div css={editorWrapper}>
      <ReactEditor
        ref={editorRef}
        height="100%"
        initialEditType="markdown"
        previewStyle="vertical"
        hideModeSwitch
        events={{
          change: onChange,
        }}
        plugins={[syntaxHighlightPlugIn]}
      />
    </div>
  );
};

const editorWrapper = css`
  flex: 1;
`;

export default Editor;
