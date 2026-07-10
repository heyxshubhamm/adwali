import fs from 'fs';
import path from 'path';
const DIR = path.join(process.cwd(), 'content');
export function fileFromSlug(slug) { return slug ? 'adwali-' + slug + '.html' : 'adwali-homepage.html'; }
export function readPage(file) { return fs.readFileSync(path.join(DIR, file), 'utf8'); }
function rewriteUrls(str) {
  if (!str) return str;
  return str
    .replace(/https?:\/\/adwali\.com\/adwali-homepage\.html/g, 'https://adwali.com/')
    .replace(/https?:\/\/adwali\.com\/adwali-([a-z0-9-]+)\.html/g, 'https://adwali.com/$1/')
    .replace(/adwali-homepage\.html/g, '/')
    .replace(/adwali-([a-z0-9-]+)\.html/g, '/$1/');
}
export function extractMeta(html) {
  const g = (re) => { const m = html.match(re); return m ? m[1] : undefined; };
  return {
    title: g(/<title>([^<]*)<\/title>/i),
    description: g(/<meta name="description" content="([^"]*)"/i),
    ogTitle: g(/<meta property="og:title" content="([^"]*)"/i),
    ogDesc: g(/<meta property="og:description" content="([^"]*)"/i),
    ogImage: g(/<meta property="og:image" content="([^"]*)"/i),
  };
}
export function renderContent(slug) {
  const html = readPage(fileFromSlug(slug));
  const styles = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join('\n');
  const headEnd = html.search(/<\/head>/i);
  const head = headEnd >= 0 ? html.slice(0, headEnd) : '';
  const headLd = (head.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []).join('\n');
  const bm = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bm ? bm[1] : '';
  body = body.replace(/<header[\s\S]*?<\/header>/i, '');                 // original sticky header/nav -> replaced by <SiteNav/>
  body = body.replace(/<div class="aw-mobile-nav"[\s\S]*?<\/div>/i, ''); // original mobile nav -> replaced
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, '');               // original footer -> replaced by <SiteFooter/>
  return rewriteUrls(styles + '\n' + headLd + '\n' + body);
}
