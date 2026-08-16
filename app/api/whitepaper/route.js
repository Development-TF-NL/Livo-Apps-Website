import { NextResponse } from 'next/server';

// Lead-flow whitepaper (besluit-lead-flow-whitepaper-v1):
// formulier → bedankpagina → mail met downloadlink via Scaleway TEM
// (adresverificatie is de prijs van de download), en de site-API-route
// maakt/actualiseert Person + Company in Attio op de lijst "Whitepaper leads".
//
// De mail is de levering: mislukt die, dan krijgt de gebruiker een fout.
// Attio is best-effort: een CRM-storing mag de download nooit blokkeren.
//
// Poort: WHITEPAPER_FORM_ENABLED blijft uit tot de privacyverklaring live is.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAIL = {
  en: {
    subject: 'Your copy of the Livo PPWR whitepaper',
    body: (name, url) =>
      `Hi ${name},\n\nThank you for your interest. You can download the whitepaper here:\n\n${url}\n\nQuestions about PPWR or about Livo PPWR? Just reply to this email.\n\nLivo Apps B.V.\nSoftware that lightens the workflow\n\nThis email and the whitepaper are not legal advice. Compliance obligations follow from the regulations themselves.`,
  },
  nl: {
    subject: 'Jouw exemplaar van de Livo PPWR-whitepaper',
    body: (name, url) =>
      `Hoi ${name},\n\nDank voor je interesse. Je kunt de whitepaper hier downloaden:\n\n${url}\n\nVragen over PPWR of over Livo PPWR? Beantwoord gewoon deze mail.\n\nLivo Apps B.V.\nSoftware die je werk lichter maakt\n\nDeze mail en de whitepaper zijn geen juridisch advies. Compliance-verplichtingen volgen uit de regelgeving zelf.`,
  },
};

async function sendDeliveryMail({ email, name, lang }) {
  const region = process.env.SCW_TEM_REGION || 'fr-par';
  const copy = MAIL[lang] ?? MAIL.en;
  const res = await fetch(
    `https://api.scaleway.com/transactional-email/v1alpha1/regions/${region}/emails`,
    {
      method: 'POST',
      headers: {
        'X-Auth-Token': process.env.SCW_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: 'support@livoapps.software', name: 'Livo Apps' },
        to: [{ email }],
        subject: copy.subject,
        text: copy.body(name, process.env.WHITEPAPER_DOWNLOAD_URL),
        project_id: process.env.SCW_PROJECT_ID,
      }),
    }
  );
  if (!res.ok) throw new Error(`Scaleway TEM ${res.status}`);
}

// Best-effort CRM-registratie; gooit niet richting de gebruiker.
async function upsertAttioLead({ email, name, company, utm }) {
  const headers = {
    Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const personRes = await fetch(
    'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        data: { values: { email_addresses: [{ email_address: email }], name: [{ full_name: name }] } },
      }),
    }
  );
  if (!personRes.ok) throw new Error(`Attio person ${personRes.status}`);
  const personId = (await personRes.json())?.data?.id?.record_id;

  const domain = email.split('@')[1];
  await fetch('https://api.attio.com/v2/objects/companies/records?matching_attribute=domains', {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { values: { domains: [{ domain }], name: [{ value: company }] } } }),
  });

  const listId = process.env.ATTIO_WHITEPAPER_LIST_ID;
  if (listId && personId) {
    await fetch(`https://api.attio.com/v2/lists/${listId}/entries`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: { parent_object: 'people', parent_record_id: personId, entry_values: {} },
      }),
    });
  }

  // UTM-bron bij het record (besluit): als notitie, onafhankelijk van lijst-attributen.
  if (personId) {
    const source = [utm.source, utm.medium, utm.campaign].filter(Boolean).join(' / ') || 'direct';
    await fetch('https://api.attio.com/v2/notes', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          parent_object: 'people',
          parent_record_id: personId,
          title: 'Whitepaper download',
          format: 'plaintext',
          content: `Bron (UTM): ${source}\nBedrijf (opgegeven): ${company}`,
        },
      }),
    });
  }
}

export async function POST(request) {
  if (process.env.WHITEPAPER_FORM_ENABLED !== 'true') {
    return NextResponse.json({ error: 'form_closed' }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = String(payload?.name ?? '').trim().slice(0, 120);
  const email = String(payload?.email ?? '').trim().toLowerCase().slice(0, 254);
  const company = String(payload?.company ?? '').trim().slice(0, 160);
  const lang = payload?.lang === 'nl' ? 'nl' : 'en';
  const utm = {
    source: String(payload?.utm?.source ?? '').slice(0, 100),
    medium: String(payload?.utm?.medium ?? '').slice(0, 100),
    campaign: String(payload?.utm?.campaign ?? '').slice(0, 100),
  };

  // Honeypot gevuld → bot; doe alsof het gelukt is en sla niets op.
  if (payload?.website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !company || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  try {
    await sendDeliveryMail({ email, name, lang });
  } catch (err) {
    console.error('whitepaper: leveringsmail mislukt:', err.message);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }

  try {
    await upsertAttioLead({ email, name, company, utm });
  } catch (err) {
    console.error('whitepaper: Attio-registratie mislukt (mail is wel verstuurd):', err.message);
  }

  return NextResponse.json({ ok: true });
}
