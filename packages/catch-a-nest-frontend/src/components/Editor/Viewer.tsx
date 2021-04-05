import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { syntaxHighlightPlugInForViewer } from '@src/lib/editor';
import { Viewer as ReactViewer } from '@toast-ui/react-editor';
import TuiStyleWrapper from './TuiStyleWrapper';

export type ViewerProps = {
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

const Viewer = ({ markdown }: ViewerProps) => {
  return (
    <TuiStyleWrapper>
      <ReactViewer
        initialValue={markdown}
        plugins={[syntaxHighlightPlugInForViewer]}
      />
    </TuiStyleWrapper>
  );
};

export default Viewer;
