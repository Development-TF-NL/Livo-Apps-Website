import { Suspense } from 'react';
import { Check } from 'lucide-react';
import { getDictionary } from '../../get-dictionary';
import WhitepaperForm from '../../components/WhitepaperForm';
import WhitepaperRequest from '../../components/WhitepaperRequest';
import { languageAlternates, socialMetadata } from '../../seo';
import { Section, Eyebrow, h1, h2, lead, heroPanel, cardOnWhite, cardTitleSmall, cardBody } from '../../components/ui';

// Enige funnel voor de whitepaper (besluit-lead-flow-whitepaper-v1): LinkedIn en
// elke andere uiting linken hierheen met UTM-parameters. Het formulier staat achter
// WHITEPAPER_FORM_ENABLED en gaat pas aan als de privacyverklaring live is (poort).
// Vorm (1 oktober 2026): de gedeelde bouwstenen uit components/ui.jsx; een lichte hero in plaats van de navy band.
const formEnabled = () => process.env.WHITEPAPER_FORM_ENABLED === 'true';

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.whitepaper.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}/whitepaper`, languages: languageAlternates('/whitepaper') },
    ...socialMetadata({ title, description, lang: params.lang }),
    // Indexeerbaar sinds 17 september 2026: de pagina heeft een aanvraag per e-mail; het formulier blijft achter de poort.
  };
}

export default async function WhitepaperPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.whitepaper;
  const enabled = formEnabled();

  return (
    <main className="font-sans text-ink">
      <Section tone="canvas" hero>
        <header className={`${heroPanel} p-6 sm:p-8 md:p-12`}>
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <h1 lang={lang} className={`${h1} max-w-3xl lg:text-[3.4rem]`}>{t.hero.title}</h1>
          <p className={`mt-6 max-w-2xl ${lead}`}>{t.hero.lead}</p>
        </header>
      </Section>

      <Section>
        <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(280px,400px)] md:gap-12">
          <section aria-labelledby="wp-inside">
            <h2 id="wp-inside" className={h2}>{t.inside.title}</h2>
            <ul className="mt-8 space-y-4">
              {t.inside.bullets.map((line) => (
                <li key={line} className="flex items-start gap-3 text-body text-ink">
                  <Check size={18} aria-hidden="true" className="mt-1 flex-none text-accent-dark" />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <aside>
            {enabled ? (
              <div className={`${cardOnWhite} p-6`}>
                <h2 className={cardTitleSmall}>{t.form.title}</h2>
                <p className={`mb-6 mt-2 ${cardBody}`}>{t.form.lead}</p>
                <Suspense fallback={null}>
                  <WhitepaperForm lang={lang} labels={t.form} />
                </Suspense>
              </div>
            ) : (
              // Aanvraag per e-mail tot het formulier open mag (Attio en privacyverklaring, backlog): geen veld, geen opslag.
              <WhitepaperRequest t={t.request} />
            )}
          </aside>
        </div>

        <p className="mt-16 border-t border-line pt-8 text-xs text-sub">{t.disclaimer}</p>
      </Section>
    </main>
  );
}
