import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import MDSub from 'markdown-it-sub';
import MDSup from 'markdown-it-sup';
import MDFootnote from 'markdown-it-footnote';
import MDDefList from 'markdown-it-deflist';
import MDAbbr from 'markdown-it-abbr';
import MDEmoji from 'markdown-it-emoji';
import MDContainer from 'markdown-it-container';
import MDIns from 'markdown-it-ins';
import MDMark from 'markdown-it-mark';
import MDAnchor from 'markdown-it-anchor';
import MDToc from 'markdown-it-toc-done-right';
import uslug from 'uslug';

const markdownItClient = new MarkdownIt({
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return '';
  },
})
  .use(MDSub)
  .use(MDSup)
  .use(MDFootnote)
  .use(MDDefList)
  .use(MDAbbr)
  .use(MDEmoji)
  .use(MDContainer, 'warning')
  .use(MDIns)
  .use(MDMark)
  .use(MDAnchor, {
    level: [1, 2, 3, 4],
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '',
    slugify: uslug,
  })
  .use(MDToc, {
    level: [1, 2, 3, 4],
    slugify: uslug,
    listType: 'ul',
    listClass: 'md-toc-list',
    itemClass: 'md-toc-item',
    containerClass: 'md-toc-wrapper',
  });

export default markdownItClient;
