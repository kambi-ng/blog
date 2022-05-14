import hljs from 'highlight.js';
import { marked } from 'marked';

export function markdownToHtml(markdown: string) {
  marked.setOptions({
    highlight: (code, lang) => {
      return hljs.highlight(lang, code).value;
    },
  });
  return marked(markdown);
}
