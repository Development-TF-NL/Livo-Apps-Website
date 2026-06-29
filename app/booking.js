// Eén bron voor de "Demo aanvragen / Book a Demo"-knoppen, overal op de site.
//
// TODO: vervang de waarde hieronder door de echte Microsoft Bookings-link zodra
// die er is (bv. "https://outlook.office365.com/owa/calendar/.../bookings/").
// Verder hoeft niets aangepast — de link-props schakelen vanzelf om.
export const BOOKINGS_URL = "mailto:hello@livoapps.software";

// Props voor een <a>: een mailto opent in hetzelfde tabblad (geen leeg tabblad),
// een https-link opent in een nieuw tabblad.
export const bookingLinkProps = BOOKINGS_URL.startsWith("mailto:")
  ? {}
  : { target: "_blank", rel: "noopener noreferrer" };
