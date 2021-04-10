import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { syntaxHighlightPlugIn } from '@src/lib/editor';
import useEditor from '@src/hooks/useEditor';
import TuiStyleWrapper from './TuiStyleWrapper';
import { useEditorMarkdownState } from '@src/states/editorState';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const { editorRef, onChange, isEdit } = useEditor();
  const [markdown] = useEditorMarkdownState();

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
      />
    </TuiStyleWrapper>
  );
};

export default Editor;
