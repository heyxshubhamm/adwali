import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('branding');
export default function Page() { return <PageBody slug="branding" />; }
