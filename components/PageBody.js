import { renderContent } from '@/lib/html';
export default function PageBody({ slug }) {
  const html = renderContent(slug);
  return <div className="aw-page" dangerouslySetInnerHTML={{ __html: html }} />;
}
