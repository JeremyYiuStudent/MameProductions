/* ---------------------------------------------------------------------------
   MAME PRODUCTIONS — GAME DATA
   ---------------------------------------------------------------------------
   `studio: true`  -> a Mame Productions project (shown on the home page).
   `studio: false` -> external / collaborative credit (shown under "Elsewhere").

   status   : "Released" | "Demo" | "In development" | "Beta" | anything else
   cover    : optional image in assets/img/games/. Omitted -> gradient placard.
   links    : array of { label, url }
   --------------------------------------------------------------------------- */

const GAMES = [
  {
    id: "touhou-7-colored-qualia",
    title: "Touhou: 7 Colored Qualia",
    studio: true,
    year: "2026",
    status: "Released",
    platforms: ["Windows", "macOS"],
    engine: "Unity",
    blurb: "Marisa and Nina chase down oddities born of misinformation, gathering seven lost colours to give back to Chimata Tenkyuu's world.",
    detail: "A fan game built around eight minigames in eight locations — book sorting, maze puzzles, shrine management, UFO fishing, a cooking rush and a hidden extra stage — wrapped in roughly three hours of story progression and achievements. Started as a Touhou Jam 16 entry and shipped as a full post-jam release.",
    tags: ["Visual Novel", "Puzzle", "Minigames", "Narrative", "Singleplayer"],
    credits: ["Yotsubro", "Oriku", "eunychicken"],
    cover: "", // drop art at assets/img/games/touhou-7-colored-qualia.png and point here
    links: [
      { label: "Play on itch.io", url: "https://yotsubro.itch.io/touhou-7-colored-qualia" },
      { label: "Touhou Jam 16 entry", url: "https://itch.io/jam/touhou-jam-16/rate/3991451" }
    ]
  },
  {
    id: "too-early-for-the-stars",
    title: "Too Early for the Stars",
    studio: true,
    year: "2026",
    status: "Demo",
    platforms: ["Browser", "Windows", "macOS"],
    engine: "Unity",
    blurb: "\u201cHello Madelyn. 9 months from now, on June 28th, 2061, you will die.\u201d",
    detail: "A puzzle visual novel set in near-future Hong Kong. Madelyn pulls at a conspiracy around a wish-granter with the help of a detective, a scientist and a messenger, in a world that has turned its attention to the stars. Built for Josei Jam 2026 and Otome Jam 2026; roughly an hour per sitting. No generative AI used.",
    tags: ["Visual Novel", "Puzzle", "Mystery", "Story Rich", "Josei", "Otome"],
    credits: ["Oriku", "eunychicken", "ShioriFukada", "Yotsubro"],
    cover: "", // drop art at assets/img/games/too-early-for-the-stars.png and point here
    links: [
      { label: "Play the demo", url: "https://oriku.itch.io/too-early-for-the-stars" }
    ]
  },
  {
    id: "umbral-island",
    title: "Umbral Island",
    studio: true,
    year: "2025",
    status: "Beta",
    platforms: ["PC"],
    engine: "Unity",
    blurb: "A top-down horror maze crawler built by a core team of two with five collaborators.",
    detail: "Dialogue framework, 3D modelling and animation, and UI/UX work by Jeremy. Currently in beta.",
    tags: ["Horror", "Maze Crawler", "Top-down"],
    credits: [],
    cover: "",
    links: [
      { label: "Build & materials", url: "https://drive.google.com/drive/folders/15628yex6rfRkErGY1Lt4rMNbJaC43tBi" }
    ]
  },

  /* ---- External credits: work members shipped outside the studio ---- */
  {
    id: "codex-recall",
    title: "CODEX: RECALL",
    studio: false,
    year: "2025",
    status: "Steam",
    platforms: ["PC"],
    engine: "Unity",
    blurb: "Gameplay & UI engineering and narrative design across six months, part-time.",
    detail: "",
    tags: ["Gameplay Engineering", "UI", "Narrative Design"],
    credits: ["Jeremy Yiu"],
    cover: "",
    links: [{ label: "Steam", url: "https://store.steampowered.com/app/4534240/CODEX__RECALL/" }]
  },
  {
    id: "duoq",
    title: "DuoQ",
    studio: false,
    year: "2025",
    status: "Steam",
    platforms: ["PC"],
    engine: "Unity",
    blurb: "Gameplay engineering.",
    detail: "",
    tags: ["Gameplay Engineering"],
    credits: ["Jeremy Yiu"],
    cover: "",
    links: [{ label: "Steam", url: "https://store.steampowered.com/app/3677620/DuoQ/" }]
  },
  {
    id: "richard",
    title: "Richard",
    studio: false,
    year: "2025",
    status: "Steam",
    platforms: ["PC"],
    engine: "Unity",
    blurb: "Gameplay engineering and narrative systems.",
    detail: "",
    tags: ["Gameplay Engineering", "Narrative Systems"],
    credits: ["Jeremy Yiu"],
    cover: "",
    links: [{ label: "Steam", url: "https://store.steampowered.com/app/3635830/Richard/" }]
  },
  {
    id: "void",
    title: "[ VOID ]",
    studio: false,
    year: "2025",
    status: "Steam",
    platforms: ["PC"],
    engine: "Unity",
    blurb: "Creature AI engineering.",
    detail: "",
    tags: ["AI Behaviour"],
    credits: ["Jeremy Yiu"],
    cover: "",
    links: [{ label: "Steam", url: "https://store.steampowered.com/app/3655010/_VOID/" }]
  }
];
