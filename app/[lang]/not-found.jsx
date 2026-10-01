import Link from 'next/link';

// Tweetalig op één pagina: een 404 heeft geen betrouwbare taalcontext
// (not-found krijgt geen params), dus beide talen krijgen hun eigen regel en link.
// Nederlands eerst: de standaardtaal (1 oktober 2026).
export default function NotFound() {
  return (
    <main className="bg-navy text-white px-6 py-32 min-h-[60vh]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent font-display font-bold text-sm tracking-wide mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          Deze pagina bestaat niet.
        </h1>
        <p className="text-white/70 mb-2">
          Het adres is misschien gewijzigd of heeft nooit bestaan.{' '}
          <Link href="/nl" className="text-accent hover:text-accent-dark underline underline-offset-4">
            Naar de homepage
          </Link>
          .
        </p>
        <p lang="en" className="text-white/70">
          This page doesn&rsquo;t exist.{' '}
          <Link href="/en" className="text-accent hover:text-accent-dark underline underline-offset-4">
            Go to the homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
