import Link from 'next/link';
import { getDictionary } from '../../../get-dictionary';

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.whitepaper.thanks.meta.title,
    robots: { index: false, follow: false },
  };
}

export default async function WhitepaperThanksPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.whitepaper;

  return (
    <main className="bg-canvas px-6 py-24 min-h-[60vh]">
      <div className="max-w-xl mx-auto bg-surface border border-line rounded-xl p-10 text-center">
        <h1 className="text-3xl font-display font-bold text-ink mb-4">{t.thanks.title}</h1>
        <p className="text-sub leading-relaxed mb-8">{t.thanks.body}</p>
        <Link
          href={`/${lang}`}
          className="inline-block rounded-md bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.thanks.back}
        </Link>
        <p className="mt-10 pt-6 border-t border-line text-xs text-sub">{t.disclaimer}</p>
      </div>
    </main>
  );
}
