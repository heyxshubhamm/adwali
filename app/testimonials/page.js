import PageBody from '@/components/PageBody';
import { buildMetadata } from '@/lib/meta';
export const metadata = buildMetadata('testimonials');
export default function Page() { return <PageBody slug="testimonials" />; }
