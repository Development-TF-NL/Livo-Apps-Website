import Link from 'next/link';
import { eyebrow, h1, heroPanel, textLink } from '../components/ui';

// Tweetalig op één pagina: een 404 heeft geen betrouwbare taalcontext
// (not-found krijgt geen params), dus beide talen krijgen hun eigen regel en link.
// Nederlands eerst: de standaardtaal (1 oktober 2026).
// Vorm (1 oktober 2026): een licht paneel op canvas, zoals de hero van de andere pagina's; geen navy vlak.
export default function NotFound() {
  return (
    <main className="min-h-[60vh] bg-canvas px-6 pb-16 pt-12 md:pb-24 md:pt-20">
      <div className={`mx-auto max-w-content ${heroPanel} px-6 py-16 text-center md:py-24`}>
        <p className={eyebrow}>404</p>
        <h1 className={`${h1} mx-auto max-w-3xl`}>
          Deze pagina bestaat niet.
        </h1>
        <p className="mt-8 text-lg text-sub">
          Het adres is misschien gewijzigd of heeft nooit bestaan.{' '}
          <Link href="/nl" className={`${textLink} rounded underline`}>
            Naar de homepage
          </Link>
          .
        </p>
        <p lang="en" className="text-lg text-sub">
          This page doesn&rsquo;t exist.{' '}
          <Link href="/en" className={`${textLink} rounded underline`}>
            Go to the homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
