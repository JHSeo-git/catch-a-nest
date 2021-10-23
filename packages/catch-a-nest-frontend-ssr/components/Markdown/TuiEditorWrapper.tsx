// import 'prismjs/themes/prism.css';
// import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor, EditorProps } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { convertSpaceToEncodedString } from '@/lib/utils/viewerUtils';
import useUploadImage from '@/hooks/useUploadImage';
import { styled } from '@stitches.js';

export type TuiEditorWithForwardedProps = EditorProps & {
  forwardedRef?: React.MutableRefObject<Editor>;
};

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => {
  const { upload } = useUploadImage();
  return (
    <Box>
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
    </Box>
  );
};

/**
 * @see https://github.com/nhn/tui.editor/blob/master/apps/editor/src/css
 * contents.css
 * editor.css
 * md-syntax-highlighting.css
 * preview-highlighting.css
 */
const Box = styled('div', {
  height: '100%',

  // layout
  '.toastui-editor-defaultUI, .toastui-editor-defaultUI .toastui-editor-defaultUI-toolbar':
    {
      br: 0,
    },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor': {
    width: '100%',
    '@sm': {
      width: '50%',
    },
  },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-splitter':
    {
      display: 'none',
      '@sm': {
        display: 'block',
      },
    },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-preview':
    {
      display: 'none',
      p: 0,
      width: 0,
      '@sm': {
        display: 'block',
        p: '0 25px',
        width: '50%',
      },
    },

  // ProseMirror
  '.ProseMirror': {
    fontFamily: 'inherit',
    fontSize: '$base',
    color: '$hiContrast',
    bc: '$loContrast',
  },

  '.ProseMirror .placeholder': {
    color: '$mauve9',
  },

  '.ProseMirror-selectednode': {
    outlineColor: '$sky6',
  },
  'li.ProseMirror-selectednode:after': {
    outlineColor: '$sky6',
  },
  'table.ProseMirror-selectednode, .html-block.ProseMirror-selectednode': {
    outlineColor: '$sky6',
  },

  '.ProseMirror .toastui-editor-md-code-block': {
    fontFamily: '$code',
    fontSize: '$sm',
  },

  // TODO: editor override style
  // toastui-editor
  '.toastui-editor-main': {
    bc: '$loContrast',
  },
  '.toastui-editor-main-container': {
    color: '$hiContrast',
  },
  '.toastui-editor-defaultUI': {
    borderColor: '$mauve6',
    fontFamily: '$base',
    br: 0,
  },
  '.toastui-editor-defaultUI button': {
    color: '$hiContrast',
  },
});

export default TuiEditorWrapper;
