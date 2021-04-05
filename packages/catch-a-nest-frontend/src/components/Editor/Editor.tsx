import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor as ReactEditor } from '@toast-ui/react-editor';
import { syntaxHighlightPlugIn } from '@src/lib/editor';
import useEditor from '@src/hooks/useEditor';
import TuiStyleWrapper from './TuiStyleWrapper';

export type EditorProps = {};

const Editor = (props: EditorProps) => {
  const { editorRef, onChange } = useEditor();
  // TODO: custom style
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
      />
    </TuiStyleWrapper>
  );
};

export default Editor;
