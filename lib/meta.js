import { readPage, fileFromSlug, extractMeta } from './html';
const BASE = 'https://adwali.com';
export function buildMetadata(slug) {
  const m = extractMeta(readPage(fileFromSlug(slug)));
  const url = slug ? `${BASE}/${slug}/` : `${BASE}/`;
  const title = m.title;
  const description = m.description;
  return {
    metadataBase: new URL(BASE),
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: m.ogTitle || title,
      description: m.ogDesc || description,
      url,
      siteName: 'adwali',
      type: 'website',
      images: m.ogImage ? [m.ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle || title,
      description: m.ogDesc || description,
      images: m.ogImage ? [m.ogImage] : undefined,
    },
  };
}
