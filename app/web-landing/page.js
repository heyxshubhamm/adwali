import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('web-landing');
export default function Page() { return <PageBody slug="web-landing" />; }
