import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('bangalore');
export default function Page() { return <PageBody slug="bangalore" />; }
