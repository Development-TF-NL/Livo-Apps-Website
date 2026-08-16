import { Suspense } from 'react';
import { getDictionary } from '../../get-dictionary';
import WhitepaperForm from '../../components/WhitepaperForm';
import { socialMetadata } from '../../seo';

// Enige funnel voor de whitepaper (besluit-lead-flow-whitepaper-v1): LinkedIn en
// elke andere uiting linken hierheen met UTM-parameters. Het formulier staat achter
// WHITEPAPER_FORM_ENABLED en gaat pas aan als de privacyverklaring live is (poort).
const formEnabled = () => process.env.WHITEPAPER_FORM_ENABLED === 'true';

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.whitepaper.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}/whitepaper`, languages: { en: '/en/whitepaper', nl: '/nl/whitepaper' } },
    ...socialMetadata({ title, description }),
    // Donker gedeployed tot de poort open is: niet indexeren zolang het formulier uit staat.
    robots: formEnabled() ? undefined : { index: false, follow: false },
  };
}

export default async function WhitepaperPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.whitepaper;
  const enabled = formEnabled();

  return (
    <div className="bg-canvas">
      <header className="bg-navy text-white px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-4">{t.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">{t.hero.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed">{t.hero.lead}</p>
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="max-w-3xl mx-auto grid gap-10 md:grid-cols-[1fr_minmax(280px,360px)] md:gap-12 items-start">
          <section aria-labelledby="wp-inside">
            <h2 id="wp-inside" className="text-2xl font-display font-bold text-ink mb-6">{t.inside.title}</h2>
            <ul className="space-y-4">
              {t.inside.bullets.map((line) => (
                <li key={line} className="flex gap-3 text-sub leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <aside className="bg-surface border border-line rounded-xl p-6">
            {enabled ? (
              <>
                <h2 className="text-lg font-display font-bold text-ink mb-2">{t.form.title}</h2>
                <p className="text-sm text-sub mb-6">{t.form.lead}</p>
                <Suspense fallback={null}>
                  <WhitepaperForm lang={lang} labels={t.form} />
                </Suspense>
              </>
            ) : (
              // "Coming soon" voor besloten-maar-ongebouwd, nooit een leverdatum (schrijfregels).
              <>
                <h2 className="text-lg font-display font-bold text-ink mb-2">{t.comingSoon.title}</h2>
                <p className="text-sm text-sub">{t.comingSoon.body}</p>
              </>
            )}
          </aside>
        </div>

        <p className="max-w-3xl mx-auto mt-16 pt-8 border-t border-line text-xs text-sub">{t.disclaimer}</p>
      </main>
    </div>
  );
}
