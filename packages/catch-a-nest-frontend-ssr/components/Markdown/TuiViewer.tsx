import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import { Viewer } from '@toast-ui/react-editor';
import MarkdownStyleWrapper from './MarkdownStyleWrapper';

export type TuiViewerProps = {
  markdown: string;
};

// el: HTMLElement;
// initialValue?: string;
// events?: EventMap;
// hooks?: ViewerHookMap;
// plugins?: Plugin[];
// useDefaultHTMLSanitizer?: boolean;
// extendedAutolinks?: ExtendedAutolinks;
// customConvertor?: ConvertorClass;
// linkAttribute?: LinkAttribute;
// customHTMLRenderer?: CustomHTMLRenderer;
// referenceDefinition?: boolean;
// customHTMLSanitizer?: CustomHTMLSanitizer;
// frontMatter?: boolean

const TuiViewer = ({ markdown }: TuiViewerProps) => {
  return (
    <MarkdownStyleWrapper>
      <Viewer
        initialValue={markdown}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        extendedAutolinks={true}
        referenceDefinition={true}
      />
    </MarkdownStyleWrapper>
  );
};

export default TuiViewer;
