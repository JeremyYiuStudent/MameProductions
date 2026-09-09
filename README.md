# Mame Productions — studio site

Static site for the Mame Productions game studio. No build step, no dependencies:
plain HTML, one stylesheet, one script, and two data files you edit by hand.

```
index.html            Studio home — intro, studio blurb, games, team preview
games.html            All studio games
team.html             Full roster of affiliated members
data/games.js         Game entries
data/members.js       People entries   <- add teammates here
assets/css/style.css  All styling
assets/js/main.js     Renders the cards from the data files
assets/img/brand/     Logo, banner, hero crop, mascot, favicons
assets/img/games/     Game cover art (16:9)
assets/img/members/   Headshots (square)
```

## Running it locally

Serve the folder so relative paths behave exactly as they will in production:

```bash
python serve.py
```

Then visit <http://127.0.0.1:8000>. Use `serve.py` rather than the stock
`python -m http.server` — it's the same thing plus a `Cache-Control: no-store`
header, so edits to the data files show up on a plain reload instead of the
browser quietly serving a cached copy for a few minutes.

## Adding a team member

Everything about a person lives in `data/members.js`. See
[docs/ADDING-A-MEMBER.md](docs/ADDING-A-MEMBER.md) for the full field list —
the short version is that only `name` is required, and any field you leave out
simply isn't rendered. Missing headshots fall back to an initials badge, so a
half-filled entry never looks broken.

## Adding a game

Same idea, in `data/games.js`. Every entry is a Mame Productions project
(`studio: true`). A game with no `cover` gets a cream placard with its initials.

## Deploying to GitHub Pages

Push to GitHub, then in **Settings → Pages** choose *Deploy from a branch*,
branch `main`, folder `/ (root)`. The `.nojekyll` file is already present so
Pages serves the folder as-is.

## Brand assets

Everything in `assets/img/brand/` is the studio's own art:

| File | Use |
|------|-----|
| `mamepro-logo.png` | Master logo lockup, 3000×1500, transparent |
| `mamepro-logo-480.png` | Header logo — the master shrunk to 480×240 |
| `mamepro-banner.png` | Master MAMEPRO banner, 2560×1440, white background |
| `mamepro-hero.png` | Home-page hero — the banner cropped to the artwork with the white made transparent |
| `bean-mascot.png` | Square mascot, 3000×3000, transparent |
| `favicon-64.png` / `favicon-180.png` | Tab icon and touch icon, cut from the mascot |
| `bean-writing.png`, `bean-gaming.png`, `bean-painting.png` | The three individual beans from the banner |

The site palette is sampled from the logo — coral swoosh, bean maroon, the
wordmark's dark red — and headings use a serif to sit beside the "mamepro."
lockup. The chamfered corners were kept from the studio's in-game panel art
for *Too Early for the Stars*.
