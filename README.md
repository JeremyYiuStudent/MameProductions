# Mame Productions — studio site

Static site for the Mame Productions game studio. No build step, no dependencies:
plain HTML, one stylesheet, one script, and two data files you edit by hand.

```
index.html            Studio home — intro, studio blurb, games, team preview
games.html            All studio games + members' credits on other teams' games
team.html             Full roster of affiliated members
data/games.js         Game entries
data/members.js       People entries   <- add teammates here
assets/css/style.css  All styling
assets/js/main.js     Renders the cards from the data files
assets/img/games/     Game cover art (16:9)
assets/img/members/   Headshots (square)
assets/img/textures/  Background star field and sparkle
```

## Running it locally

Open `index.html` in a browser, or serve the folder so relative paths behave
exactly as they will in production:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Adding a team member

Everything about a person lives in `data/members.js`. See
[docs/ADDING-A-MEMBER.md](docs/ADDING-A-MEMBER.md) for the full field list —
the short version is that only `name` is required, and any field you leave out
simply isn't rendered. Missing headshots fall back to an initials badge, so a
half-filled entry never looks broken.

## Adding a game

Same idea, in `data/games.js`. Set `studio: true` for a Mame Productions
project or `studio: false` for a credit on someone else's title. A game with no
`cover` gets a star-field placard with its initials.

## Deploying to GitHub Pages

Push to GitHub, then in **Settings → Pages** choose *Deploy from a branch*,
branch `main`, folder `/ (root)`. The `.nojekyll` file is already present so
Pages serves the folder as-is.

## Art credit

The star-field background (`assets/img/textures/star-pattern.png`) and the
sparkle (`star.png`) are the studio's own UI art from *Too Early for the Stars*.
The chamfered corners throughout are borrowed from that game's panel plating.
The header logo mark is a placeholder — swap the inline SVG in the three HTML
files when a real mark exists.
