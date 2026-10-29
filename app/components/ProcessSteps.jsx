import MarketingIcon from './MarketingIcon';
import { cardOnWhite, cardTitleSmall, cardBody } from './ui';

// De vijf processtappen (29 oktober 2026, brief §3): genummerd, elk met een marketingicoon v2 op een mintvlak.
// steps: [{ title, body, icon }]. Op smal onder elkaar, vanaf 640 px twee naast elkaar, vanaf 1024 px vijf op een rij.
export default function ProcessSteps({ steps, className = '' }) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-5 ${className}`}>
      {steps.map((s, i) => (
        <li key={s.title} className={`${cardOnWhite} flex gap-4 p-5 lg:flex-col`}>
          <MarketingIcon name={s.icon} />
          <div className="min-w-0">
            <p className={cardTitleSmall}><span className="text-ink-blue">{i + 1}.</span> {s.title}</p>
            <p className={`mt-1.5 ${cardBody}`}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
