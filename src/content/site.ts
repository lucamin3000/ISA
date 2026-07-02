/* ============================================================
   ISA CONTENT & TRUTH REGISTRY — v4 (no-photo build)
   ------------------------------------------------------------
   TRUTH CONSTRAINT: this site ships zero fabricated information.
   Every factual element is either (a) verified with sources cited
   here, (b) client-supplied premise (the academy's own name and
   offering), or (c) a visible placeholder token. Invented stats,
   dates, addresses, emails and biographies are prohibited — a
   blank flagged field is a success.

   v4 removes ALL photography: type, space and the three brand
   colors carry the page, so the layout-stand-in imagery (and its
   attribution burden) is gone entirely.

   FOUNDER BIO — WITHHELD PENDING IDENTITY CONFIRMATION
   "Karim Ibrahim" is a common name shared by more than one figure
   in squash. No public source connects any Karim Ibrahim to
   "Inspire Squash Academy" (ISA has no public record), so identity
   cannot be verified and the rendered bio is a placeholder.

   CANDIDATE PROFILE (verified 2026-07-02 — NOT RENDERED; restore
   only after the client confirms identity):
   - Born Cairo; developed at Wadi Degla Club; Egyptian junior
     national team; ranked as high as No. 2 in Egypt as a junior.
       https://teamusasquash.com/karim-ibrahim/
       https://thesquashsite.com/meet-karim-ibrahim-team-usa-junior-national-teams-director
   - 2013 U.S. Junior Open U17 champion (2013 confirmed by the
     timeline in both sources above; one page carries a "2023" typo).
   - Moved to the US at 17: St. George's School (RI), then
     St. Lawrence University (economics & business; team captain).
       https://saintsathletics.com/sports/mens-squash/roster/karim-ibrahim/8940
       https://www.squashinfo.com/player/9967-karim-ibrahim
   - PSA World Tour professional (career-high world No. 414,
     Sept 2015 — SquashInfo above).
   - Coached elite juniors at Wadi Degla 2020–22 under Karim
     Darwish; training partner to Raneem El Welily and Nouran Gohar
     (teamusasquash.com + thesquashsite.com above).
   - Head Squash Professional, Arlen Specter US Squash Center:
       https://ussquash.org/2022/09/karim-ibrahim-head-squash-proffesional/
   - Director of Junior National Teams, US Squash (Aug 2023– ):
       https://teamusasquash.com/2023/09/karim-ibrahim-director-of-junior-national-teams/
       https://wsfworldjuniors.com/karim-ibrahim-team-usa-wants-to-go-all-the-way/
   ============================================================ */

/** The academy film. No license-cleared ISA footage exists yet, so this stays
 *  empty and the hero lightbox renders a flagged placeholder panel instead of
 *  an unrelated clip. Set to an official embed URL (e.g. an ISA YouTube
 *  embed) and the lightbox goes live. */
export const ISA_FILM_EMBED_URL = ""

export const TOKENS = {
  film: "[PLACEHOLDER — official coaching video — client to supply]",
  bio: "[PLACEHOLDER — founder bio — client to confirm identity and supply details]",
  statResults: "[PLACEHOLDER — verified athlete-development results — client to supply]",
  statNumbers: "[PLACEHOLDER — verified academy statistics — client to supply]",
  fallDates: "[PLACEHOLDER — season dates & schedule — client to supply]",
  campDates: "[PLACEHOLDER — camp weeks & dates — client to supply]",
  address: "[PLACEHOLDER — facility name, address & directions — client to supply]",
  secondLocation: "[PLACEHOLDER — second location, if any — client to supply]",
  playerName: "[PLACEHOLDER — player name — client to supply]",
  playerCred: "[PLACEHOLDER — credential — client to supply]",
  nextPlayer: "[PLACEHOLDER — next featured player — client to supply]",
  contact: "[PLACEHOLDER — contact email & phone — client to supply]",
} as const
