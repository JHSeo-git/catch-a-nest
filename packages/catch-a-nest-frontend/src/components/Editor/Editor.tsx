import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { syntaxHighlightPlugIn } from '@src/lib/editor';
import useEditor from '@src/hooks/useEditor';
import TuiStyleWrapper from './TuiStyleWrapper';
import { useEditorMarkdownState } from '@src/states/editorState';
import { useEffect } from 'react';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const { editorRef, onChange } = useEditor();
  const [markdown] = useEditorMarkdownState();

  useEffect(() => {
    if (!markdown) return;
    if (!editorRef?.current) return;
    editorRef.current.getInstance().setMarkdown(markdown);
  }, [markdown, editorRef]);

  return (
    <TuiStyleWrapper>
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
        extendedAutolinks={true}
      />
    </TuiStyleWrapper>
  );
};

export default Editor;
