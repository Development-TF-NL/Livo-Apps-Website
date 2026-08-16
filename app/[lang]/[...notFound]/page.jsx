import { notFound } from 'next/navigation';

// Vangnet voor onbekende paden binnen /[lang]/ — rendert de 404 mét statuscode 404
// binnen de taal-layout (App Router-patroon voor i18n-sites zonder root-layout).
export default function CatchAllNotFound() {
  notFound();
}
