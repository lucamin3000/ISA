/* ============================================================
   ISA CONTENT & TRUTH REGISTRY
   ------------------------------------------------------------
   TRUTH CONSTRAINT: this site ships zero fabricated information.
   Every factual element is either (a) verified with sources cited
   here, (b) client-supplied premise (the academy's own name and
   offering), or (c) a visible placeholder token. Invented stats,
   dates, addresses, emails and biographies are prohibited — a
   blank flagged field is a success.

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
 *  empty and the hero renders a flagged placeholder dialog instead of an
 *  unrelated clip. Set to an official embed URL (e.g. an ISA YouTube embed)
 *  and the verbatim 21st.dev HeroVideoDialog takes over automatically. */
export const ISA_FILM_EMBED_URL = ""

/** Client-supplied contact number (2026-07-03). */
export const PHONE_DISPLAY = "+1 646-696-8590"
export const PHONE_TEL = "+16466968590"

export const TOKENS = {
  film: "[PLACEHOLDER — official coaching video — client to supply]",
  bio: "[PLACEHOLDER — founder bio — client to confirm identity and supply details]",
  portrait: "[PLACEHOLDER — official portrait — client to supply]",
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

/* ============================================================
   IMAGE MANIFEST — all imagery is now the client-supplied photo
   set (public/img/coach/). Status for every file: FPO — comp
   only, clear or replace before publication. The previously used
   Wikimedia Commons set has been removed at the client's request.
   NOTE: these files are small (≤678px) web comps; they will render
   soft at full-width hero sizes. Drop higher-resolution originals
   over the same filenames to sharpen every slot at once.
   ============================================================ */
export interface IsaImage {
  src: string
  alt: string
  credit: string
  source: string
  license: string
  width: number
  height: number
}

const CLIENT_FPO = "client comp, clear or replace before publication"

export const IMG = {
  film: {
    src: "/img/coach/coach-4.jpg",
    width: 678,
    height: 452,
    alt: "Karim Ibrahim speaking in an interview setting",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  fall: {
    src: "/img/coach/coach-2.jpg",
    width: 597,
    height: 335,
    alt: "Karim Ibrahim mid-rally on a college squash court",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  camp: {
    src: "/img/coach/coach-7.jpg",
    width: 678,
    height: 452,
    alt: "A junior squad holding a flag on a glass court",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  clinic: {
    src: "/img/coach/coach-6.jpg",
    width: 678,
    height: 452,
    alt: "A coaching staff standing together at an arena",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  arena: {
    src: "/img/coach/coach-3.jpg",
    width: 387,
    height: 516,
    alt: "Karim Ibrahim speaking at a lectern at a squash event",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  intro: {
    src: "/img/coach/coach-5.jpg",
    width: 596,
    height: 335,
    alt: "Karim Ibrahim with his brother holding college squash shirts",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  facility: {
    src: "/img/coach/coach-8.jpg",
    width: 387,
    height: 516,
    alt: "A team celebrating with a flag on court",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  amb1: {
    src: "/img/coach/coach-3.jpg",
    width: 387,
    height: 516,
    alt: "Karim Ibrahim speaking at a lectern at a squash event",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  amb2: {
    src: "/img/coach/coach-5.jpg",
    width: 596,
    height: 335,
    alt: "Karim Ibrahim with his brother holding college squash shirts",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
  amb3: {
    src: "/img/coach/coach-8.jpg",
    width: 387,
    height: 516,
    alt: "A team celebrating with a flag on court",
    credit: CLIENT_FPO,
    source: "client archive",
    license: "FPO",
  },
} satisfies Record<string, IsaImage>

/* ============================================================
   COACH IMAGERY — FPO COMPS (for placement only)
   Client-supplied photos of the coach placed at public/img/coach/
   on this machine. They are third-party event/federation
   photography: comp only, clear or replace before publication.
   Committed to the repository at the client's explicit direction
   (2026-07-03) so Git-connected deploys include them; the FPO
   status and clear-before-launch obligation are unchanged.
   ============================================================ */
export interface CoachImage {
  src: string
  alt: string
  status: "FPO"
  note: string
  width: number
  height: number
}

const FPO_NOTE = "comp only, clear or replace before publication"

export const COACH = {
  portrait: {
    src: "/img/coach/coach-1.jpg",
    width: 400,
    height: 400,
    alt: "Head coach Karim Ibrahim, arms crossed, at an indoor squash facility",
    status: "FPO",
    note: FPO_NOTE,
  },
  action: {
    src: "/img/coach/coach-2.jpg",
    width: 597,
    height: 335,
    alt: "Karim Ibrahim mid-rally on a college squash court",
    status: "FPO",
    note: FPO_NOTE,
  },
  podium: {
    src: "/img/coach/coach-3.jpg",
    width: 387,
    height: 516,
    alt: "Karim Ibrahim speaking at a lectern at a squash event",
    status: "FPO",
    note: FPO_NOTE,
  },
  speaking: {
    src: "/img/coach/coach-4.jpg",
    width: 678,
    height: 452,
    alt: "Karim Ibrahim speaking in an interview setting",
    status: "FPO",
    note: FPO_NOTE,
  },
  brothers: {
    src: "/img/coach/coach-5.jpg",
    width: 596,
    height: 335,
    alt: "Karim Ibrahim with his brother holding college squash shirts",
    status: "FPO",
    note: FPO_NOTE,
  },
  staff: {
    src: "/img/coach/coach-6.jpg",
    width: 678,
    height: 452,
    alt: "A national-team coaching staff standing together at an arena",
    status: "FPO",
    note: FPO_NOTE,
  },
  juniors: {
    src: "/img/coach/coach-7.jpg",
    width: 678,
    height: 452,
    alt: "A junior national squad holding a flag on a glass court",
    status: "FPO",
    note: FPO_NOTE,
  },
  team: {
    src: "/img/coach/coach-8.jpg",
    width: 387,
    height: 516,
    alt: "A national team celebrating with a flag on court",
    status: "FPO",
    note: FPO_NOTE,
  },
} satisfies Record<string, CoachImage>
