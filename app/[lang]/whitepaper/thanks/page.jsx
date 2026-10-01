import Link from 'next/link';
import { getDictionary } from '../../../get-dictionary';
import { btnPrimary, heroPanel } from '../../../components/ui';

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
    <main className="min-h-[60vh] bg-canvas px-6 py-16 md:py-24">
      <div className={`mx-auto max-w-xl ${heroPanel} p-10 text-center`}>
        <h1 className="text-3xl font-display font-bold text-ink mb-4">{t.thanks.title}</h1>
        <p className="text-sub leading-relaxed mb-8">{t.thanks.body}</p>
        <Link
          href={`/${lang}`}
          className={btnPrimary}
        >
          {t.thanks.back}
        </Link>
        <p className="mt-10 pt-6 border-t border-line text-xs text-sub">{t.disclaimer}</p>
      </div>
    </main>
  );
}
