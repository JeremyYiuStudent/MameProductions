# Adding an affiliated member

Open `data/members.js`, copy the commented template at the bottom of the file,
and paste it into the `MEMBERS` array. Refresh the page — that's the whole
workflow. Members appear on `team.html` in the order they're listed, and the
first three also appear in the preview row on the home page.

## Fields

| Field      | Required | What it does |
|------------|----------|--------------|
| `name`     | **yes**  | Display name. Also produces the initials badge when there's no headshot. |
| `id`       | no       | Short slug used as the card's HTML anchor, so you can link to `team.html#their-slug`. |
| `role`     | no       | One line under the name — "Artist", "Composer", "Narrative Designer". |
| `headshot` | no       | Path to an image. Leave it out and an initials badge is drawn instead. |
| `bio`      | no       | One or two sentences. This is a card, not a résumé. |
| `tags`     | no       | Array of short skill chips. |
| `links`    | no       | Object of social / web links — see below. |

Anything you omit (or set to `""`) is skipped entirely, so a member with just a
name and a role renders as a clean, complete card.

## Headshots

Drop the image in `assets/img/members/` and point `headshot` at it:

```js
headshot: "assets/img/members/mika-tan.jpg"
```

- **Square** images work best; the card crops to a chamfered square at 72px.
- 600×600 or larger is plenty. Anything bigger is wasted bytes.
- `.jpg`, `.png` and `.webp` all work.
- If the file is missing or misspelled, the card quietly falls back to the
  initials badge rather than showing a broken image.

## Links

Every key is optional. Use as many or as few as the person wants public:

```js
links: {
  website:    "https://example.com",
  itch:       "https://someone.itch.io",
  github:     "https://github.com/someone",
  linkedin:   "https://www.linkedin.com/in/someone/",
  twitter:    "https://x.com/someone",
  bluesky:    "https://bsky.app/profile/someone",
  mastodon:   "https://mastodon.social/@someone",
  youtube:    "https://youtube.com/@someone",
  twitch:     "https://twitch.tv/someone",
  instagram:  "https://instagram.com/someone",
  artstation: "https://artstation.com/someone",
  soundcloud: "https://soundcloud.com/someone",
  email:      "someone@example.com"
}
```

Those keys each get their own icon. `email` accepts a bare address — the
`mailto:` is added for you. A URL without `https://` gets it prepended.

You can also invent a key that isn't in the list:

```js
links: { portfolio: "https://someone.cargo.site" }
```

It renders with a generic link icon and the key capitalised as its tooltip.

## Ordering

The array order is the display order. Put whoever should lead the page first.
