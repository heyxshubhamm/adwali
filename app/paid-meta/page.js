import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('paid-meta');
export default function Page() { return <PageBody slug="paid-meta" />; }
