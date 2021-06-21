import hljs from 'highlight.js';
import Editor from '@toast-ui/editor';
// import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

export const syntaxHighlightPlugIn = () => {
  const languages = hljs.listLanguages();
  languages.forEach((type) => {
    const convertor = (codeText: string) =>
      hljs.highlight(codeText, { language: type }).value;
    const aliases = hljs.getLanguage(type)?.aliases || [];
    const langTypes = [type, ...aliases];

    // langTypes.forEach((lang) => {
    //   Editor.codeBlockManager.setReplacer(lang, convertor);
    // });
  });
};

export const syntaxHighlightPlugInForViewer = () => {
  const languages = hljs.listLanguages();
  languages.forEach((type) => {
    const convertor = (codeText: string) =>
      hljs.highlight(codeText, { language: type }).value;
    const aliases = hljs.getLanguage(type)?.aliases || [];
    const langTypes = [type, ...aliases];

    // langTypes.forEach((lang) => {
    //   Viewer.codeBlockManager.setReplacer(lang, convertor);
    // });
  });
};
