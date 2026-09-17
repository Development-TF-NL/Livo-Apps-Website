// Handschrift-accent (huisstijl v2): Caveat, Ink Blue, hoek maximaal 6°, één per sectie, nooit essentieel.
// Alleen website en flyer; nooit app, documenten, e-mail of portaal.
export default function HandNote({ children, className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-block font-hand text-2xl font-semibold text-ink-blue -rotate-[4deg] leading-none ${className}`}>
      {children}
    </span>
  );
}
