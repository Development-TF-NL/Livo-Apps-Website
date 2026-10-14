import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import OrderButton from './OrderButton';
import Footer from './Footer';
import { ARTICLES, ARTICLE_LABELS, KENNIS_UI, articlePath } from '../content/kennis';
import { Section, Eyebrow, Callout, h1, h2, lead, btnPrimary, textLink, heroPanel, promoPanel } from './ui';

// Kennisartikel (14 oktober 2026): kop, inleiding, secties met alinea's, één illustratienotitie en tabellen,
// daarna één primaire actie (de bestaande demoroute per e-mail uit nav.order) en de slotregel met de link naar het
// andere artikel en de juridische bron. Alle tekst uit content/kennis.json; de vorm uit components/ui.jsx.
// De kop is onder 640 px 28 px en onder 375 px 26 px (het woord "verpakkingsgegevens" past anders niet in het paneel).
// Tabellen: op smalle schermen gestapeld (elke cel met haar kolomkop ervoor), vanaf 640 px een gewone tabel;
// de inhoud is in beide gevallen gelijk, zodat niets horizontaal scrolt op 390 px.
const td = 'block px-0 py-1 sm:table-cell sm:px-4 sm:py-3 sm:align-top';
const label = "before:mb-0.5 before:block before:text-xs before:font-semibold before:uppercase before:tracking-[.12em] before:text-ink-blue before:content-[attr(data-label)] sm:before:hidden";

function Table({ head, rows }) {
  return (
    <table className="mt-6 block w-full border-collapse text-body sm:table">
      <thead className="hidden sm:table-header-group">
        <tr>{head.map((h) => <th key={h} scope="col" className="border-b-2 border-line px-4 py-3 text-left font-display text-base font-bold text-ink">{h}</th>)}</tr>
      </thead>
      <tbody className="block sm:table-row-group">
        {rows.map((cells) => (
          <tr key={cells[0]} className="block border-b border-line py-3 sm:table-row sm:py-0">
            {cells.map((c, i) => (
              <td key={head[i]} data-label={head[i]} className={`${td} ${label} ${i === 0 ? 'font-semibold text-ink' : 'text-sub'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Block({ b }) {
  if (b.type === 'table') return <Table head={b.head} rows={b.rows} />;
  if (b.type === 'note') return <Callout className="mt-6 text-body"><b className="font-semibold">{b.label}</b> {b.text}</Callout>;
  return <p className="mt-5 max-w-3xl text-body text-ink">{b.text}</p>;
}

// De slotregel: "Meer lezen: <link>. Voor de juridische basis: <link>. <zin>" met de links op hun plek.
function Closing({ closing, lang }) {
  const parts = closing.parts; const links = closing.links;
  return (
    <p className="mt-10 max-w-3xl border-t border-line pt-8 text-body text-sub">
      {parts.map((p, i) => {
        if (i % 2 === 0) return <span key={i}>{p}</span>;
        const [text, href] = links[(i - 1) / 2];
        const other = ARTICLES.find((a) => Object.values(a.path).includes(href));
        return other
          ? <Link key={i} href={articlePath(other, lang)} className={`${textLink} min-h-0 underline`}>{text}</Link>
          : <a key={i} href={href} rel="noopener noreferrer" className={`${textLink} min-h-0 underline`}>{text}</a>;
      })}
    </p>
  );
}

export default function Article({ lang, article, dict }) {
  const t = article[lang]; const ui = KENNIS_UI[lang];
  return (
    <div className="bg-canvas">
      <Breadcrumb items={[{ label: ui.breadcrumbHome, href: `/${lang}` }, { label: ui.section }, { label: t.h1 }]} />
      <main>
        <Section tone="canvas" className="!pt-2 md:!pt-2">
          <header className={`${heroPanel} p-6 sm:p-8 md:p-12`}>
            <Eyebrow>{ui.eyebrow}</Eyebrow>
            <h1 lang={lang} className={`${h1} max-w-4xl text-[1.75rem] max-[374px]:text-[1.625rem] lg:text-[3.4rem]`}>{t.h1}</h1>
            {t.intro.map((b) => <p key={b.text.slice(0, 40)} className={`mt-6 max-w-3xl ${lead}`}>{b.text}</p>)}
          </header>
        </Section>

        <Section>
          <article className="max-w-4xl">
            {t.sections.map((s) => (
              <section key={s.title} className="mt-12 first:mt-0">
                <h2 className={`${h2} max-w-3xl text-3xl md:text-4xl`}>{s.title}</h2>
                {s.blocks.map((b, i) => <Block key={i} b={b} />)}
              </section>
            ))}

            {/* Eén primaire actie: de bestaande demoroute (mailto uit nav.order), zonder formulier of klantdata. */}
            <div className={`${promoPanel} mt-12 flex flex-col items-start gap-5 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between`}>
              <p className="font-display text-xl font-bold text-ink">{ui.demoLead}</p>
              <OrderButton t={dict.nav.order} className={btnPrimary} />
            </div>

            <Closing closing={t.closing} lang={lang} />
          </article>
        </Section>
      </main>
      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}

// Leesblok met de twee artikelen (op de productpagina): kop, regel en twee tekstlinks.
export function KennisLinks({ lang, exceptId }) {
  const ui = KENNIS_UI[lang];
  return (
    <Section id="kennis">
      <Eyebrow>{ui.eyebrow}</Eyebrow>
      <h2 className={h2}>{ui.more}</h2>
      <p className={`mt-4 max-w-2xl ${lead}`}>{ui.moreLead}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {ARTICLES.filter((a) => a.id !== exceptId).map((a) => (
          <li key={a.id}>
            <Link href={articlePath(a, lang)} className={textLink}>{ARTICLE_LABELS[a.id][lang]} <ArrowRight size={16} aria-hidden="true" /></Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
