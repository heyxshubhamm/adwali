import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('web-development');
export default function Page() { return <PageBody slug="web-development" />; }
