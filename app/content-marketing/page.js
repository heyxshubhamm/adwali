import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('content-marketing');
export default function Page() { return <PageBody slug="content-marketing" />; }
