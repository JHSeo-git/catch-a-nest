import { Editor, EditorProps } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

export type TuiEditorWithForwardedProps = EditorProps & {
  forwardedRef?: React.MutableRefObject<Editor>;
};

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => {
  console.log('rerender');
  return (
    <Editor
      {...props}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      ref={props.forwardedRef}
    />
  );
};

export default TuiEditorWrapper;
