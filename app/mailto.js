// Eén plek voor de mailto-links van de homepage: adres, onderwerp en voorgevulde tekst.
export const MAIL = 'hello@livoapps.software';

export const mailto = (subject, body) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
