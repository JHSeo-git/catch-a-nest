import hljs from 'highlight.js';
import Editor from '@toast-ui/editor';

export const syntaxHighlightPlugIn = () => {
  const languages = hljs.listLanguages();
  languages.forEach((type) => {
    const convertor = (codeText: string) =>
      hljs.highlight(codeText, { language: type }).value;
    const aliases = hljs.getLanguage(type)?.aliases || [];
    const langTypes = [type, ...aliases];

    langTypes.forEach((lang) => {
      Editor.codeBlockManager.setReplacer(lang, convertor);
    });
  });
};
