'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const inputClass =
  `w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-sub/60 ${focusRing}`;

export default function WhitepaperForm({ lang, labels }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('idle'); // idle | submitting | error

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
      website: form.get('website'), // honeypot: blijft leeg bij mensen
      lang,
      utm: {
        source: searchParams.get('utm_source') || '',
        medium: searchParams.get('utm_medium') || '',
        campaign: searchParams.get('utm_campaign') || '',
      },
    };

    try {
      const res = await fetch('/api/whitepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      // Bedankpagina = de zichtbare voltooide staat (besluit: formulier → bedankpagina → mail).
      router.push(`/${lang}/whitepaper/thanks`);
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wp-name" className="block text-sm font-medium text-ink mb-1">{labels.nameLabel}</label>
        <input id="wp-name" name="name" type="text" required maxLength={120} autoComplete="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="wp-email" className="block text-sm font-medium text-ink mb-1">{labels.emailLabel}</label>
        <input id="wp-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="wp-company" className="block text-sm font-medium text-ink mb-1">{labels.companyLabel}</label>
        <input id="wp-company" name="company" type="text" required maxLength={160} autoComplete="organization" className={inputClass} />
      </div>
      {/* Honeypot, onzichtbaar voor mensen en uit de tab-volgorde */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="wp-website">Website</label>
        <input id="wp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-[#991B1B] bg-[#FEE2E2] rounded-md px-3 py-2">{labels.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-accent-dark disabled:opacity-60 ${focusRing}`}
      >
        {status === 'submitting' ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
