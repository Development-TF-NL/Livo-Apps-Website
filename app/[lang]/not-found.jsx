import Link from 'next/link';

// Tweetalig op één pagina: een 404 heeft geen betrouwbare taalcontext
// (not-found krijgt geen params), dus beide talen krijgen hun eigen regel en link.
export default function NotFound() {
  return (
    <main className="bg-navy text-white px-6 py-32 min-h-[60vh]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent font-display font-bold text-sm tracking-wide mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="text-white/70 mb-2">
          The address may have changed or never existed.{' '}
          <Link href="/en" className="text-accent hover:text-accent-dark underline underline-offset-4">
            Go to the homepage
          </Link>
          .
        </p>
        <p className="text-white/70">
          Deze pagina bestaat niet.{' '}
          <Link href="/nl" className="text-accent hover:text-accent-dark underline underline-offset-4">
            Naar de homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
