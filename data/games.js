/* ---------------------------------------------------------------------------
   MAME PRODUCTIONS — GAME DATA
   ---------------------------------------------------------------------------
   `studio: true`  -> a Mame Productions project. Every entry here is one; the
                      flag is kept so a non-studio credit could be added later
                      without changing the renderer.

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
    cover: "assets/img/games/touhou-7-colored-qualia.jpg",
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
    cover: "assets/img/games/too-early-for-the-stars.jpg",
    links: [
      { label: "Play the demo", url: "https://oriku.itch.io/too-early-for-the-stars" }
    ]
  },

];
