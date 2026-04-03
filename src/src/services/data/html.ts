import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';

/** Vueの開発時には、data-v-inspectorがつくのでそれを除去 */
export const cleanHtml = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  div.querySelectorAll('[data-v-inspector]').forEach((el) => {
    el.removeAttribute('data-v-inspector');
  });

  return div.innerHTML;
};

/** HTMLを見やすくする */
export const formatHtml = async (html: string) => {
  return prettier.format(html, {
    parser: 'html',
    plugins: [parserHtml],
  });
};
