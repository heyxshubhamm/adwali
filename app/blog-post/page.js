import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('blog-post');
export default function Page() { return <PageBody slug="blog-post" />; }
