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
   IMAGE MANIFEST — all Wikimedia Commons, license-verified,
   downloaded to /public/img on 2026-07-02. Visible stand-in
   captions render on-page; full attribution in the footer.
   The generic integration brief suggests "Unsplash images you know
   exist" — declined: recalling image URLs from memory is exactly
   the fabrication risk this project bans, and these Commons files
   are already license-cleared, downloaded and self-hosted.
   ============================================================ */
export interface IsaImage {
  src: string
  alt: string
  credit: string
  /** Commons file page (license + author record) */
  source: string
  license: string
  width: number
  height: number
}

export const IMG = {
  film: {
    src: "/img/hero-pyramids.jpg",
    alt: "A glass squash show court lit at night before the Pyramids of Giza — placeholder still for the academy film",
    credit: "Still: PSA World Tour Finals, Giza — layout stand-in",
    source: "https://commons.wikimedia.org/wiki/File:Squash_Court_Pyramid.jpg",
    license: "CC BY-SA 4.0 (Simpkin98)",
    width: 1600,
    height: 1067,
  },
  fall: {
    src: "/img/program-training.jpg",
    alt: "A junior squash player lunging for a forehand on a glass tournament court",
    credit: "Photo: World Junior Championship, Doha 2012 — layout stand-in",
    source: "https://commons.wikimedia.org/wiki/File:Nour_El_Sherbini_world_2012.jpg",
    license: "CC BY 2.0 (Vinod Divakaran)",
    width: 1280,
    height: 937,
  },
  camp: {
    src: "/img/program-camp.jpg",
    alt: "Two players rallying on a glass show court inside a university arena",
    credit: "Photo: US Open Squash 2011, Drexel — layout stand-in",
    source:
      "https://commons.wikimedia.org/wiki/File:US_Open_Squash_Championship_2011_Drexel_University.jpg",
    license: "CC BY-SA 3.0 (Ameykhanolkar)",
    width: 1280,
    height: 960,
  },
  clinic: {
    src: "/img/school-clinic.jpg",
    alt: "Professional squash players meeting young fans at a community clinic table",
    credit: "Photo: community clinic, 2010 — layout stand-in",
    source:
      "https://commons.wikimedia.org/wiki/File:Squash_Stars_Meet_the_Stars_Session_3.jpg",
    license: "CC BY-SA 2.0 (Saravanan Alagarsamy)",
    width: 1204,
    height: 800,
  },
  arena: {
    src: "/img/school-arena.jpg",
    alt: "A packed arena watching a professional squash match on a glass court",
    credit: "Photo: PSA Kuwait Cup 2009 — layout stand-in",
    source: "https://commons.wikimedia.org/wiki/File:PSA_Kuwait_Cup_2009_2.jpg",
    license: "CC BY 2.0 (Ian Butterworth)",
    width: 1280,
    height: 850,
  },
  intro: {
    src: "/img/intro-court.jpg",
    alt: "Two club players mid-rally on a traditional squash court",
    credit: "Photo: club court, The Hague — layout stand-in",
    source: "https://commons.wikimedia.org/wiki/File:Squash_court.JPG",
    license: "CC BY-SA 3.0 (Jens Buurgaard Nielsen)",
    width: 1280,
    height: 1039,
  },
  facility: {
    src: "/img/facility-court.jpg",
    alt: "Wide interior view of a bright squash hall with wooden floors — reference image, not the ISA facility",
    credit: "Reference photo: squash hall (Poly Haven) — NOT the ISA facility",
    source:
      "https://commons.wikimedia.org/wiki/File:Squash_court_%E2%80%93_Panorama_(Greg_Zaal_and_Jarod_Guest_via_Poly_Haven).jpg",
    license: "CC0 (Greg Zaal / Jarod Guest, Poly Haven)",
    width: 1920,
    height: 960,
  },
  amb1: {
    src: "/img/amb-1.jpg",
    alt: "Layout stand-in: a professional squash player watching the ball onto his racquet",
    credit: "Layout photo: Marwan El Shorbagy, Doha 2012 — not an ISA ambassador",
    source: "https://commons.wikimedia.org/wiki/File:Marwan_El_Shorbagy_2012.jpg",
    license: "CC BY 2.0 (Doha Stadium Plus Qatar)",
    width: 960,
    height: 1331,
  },
  amb2: {
    src: "/img/amb-2.jpg",
    alt: "Layout stand-in: a professional squash player following through on a backhand",
    credit: "Layout photo: Ramy Ashour, 2012 — not an ISA ambassador",
    source: "https://commons.wikimedia.org/wiki/File:Ramy_Ashour_(2012).jpg",
    license: "CC BY 2.0 (Doha Stadium Plus Qatar)",
    width: 960,
    height: 1371,
  },
  amb3: {
    src: "/img/amb-3.jpg",
    alt: "Layout stand-in: a smiling squash player holding a tournament trophy",
    credit: "Layout photo: Mohamed Elshorbagy, 2012 — not an ISA ambassador",
    source: "https://commons.wikimedia.org/wiki/File:Mohamed_Elshorbagy_(2012).jpg",
    license: "CC BY 2.0 (Vinod Divakaran)",
    width: 960,
    height: 1324,
  },
} satisfies Record<string, IsaImage>
