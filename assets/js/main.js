/* =========================================================================
   Mame Productions - rendering
   Reads data/games.js and data/members.js and paints the cards.
   No build step, no dependencies: edit the data files, refresh the page.
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------------- helpers */

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  /* "[ VOID ]" -> "V", "Touhou: 7 Colored Qualia" -> "T7": punctuation-only
     words are dropped so bracketed or stylised titles don't produce junk. */
  const initials = (name) =>
    String(name || "?")
      .split(/\s+/)
      .map((w) => w.replace(/[^A-Za-z0-9]/g, ""))
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  const isFilled = (v) => typeof v === "string" && v.trim() !== "";

  /* --------------------------------------------------------------- icons */
  /* 24x24 stroke/fill icons, sized down by CSS. currentColor throughout. */

  const ICONS = {
    website:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z"/></svg>',
    itch:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.1 3.6C2.3 4.1.7 5.9.7 6.4v.8c0 1 1 1.9 1.9 1.9 1.1 0 2-.9 2-2 0 1.1.9 2 2 2s2-.9 2-2c0 1.1 1 2 2.1 2h.6c1.1 0 2.1-.9 2.1-2 0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2 .9 0 1.9-.9 1.9-1.9v-.8c0-.5-1.6-2.3-2.4-2.8-2.5-.1-4.3-.1-7.9-.1s-7 0-7.9.1Zm6.3 6.8a2.6 2.6 0 0 1-2.2 1.2 2.6 2.6 0 0 1-2.1-1.2 2.6 2.6 0 0 1-2.1 1.2c-.5 0-.9-.1-1.3-.3-.3 2.7-.6 6-.5 7.7.1 1.7.4 3.1 2.4 3.3 1.6.2 4.4.2 7.5.2s5.9 0 7.5-.2c2-.2 2.3-1.6 2.4-3.3.1-1.7-.2-5-.5-7.7-.4.2-.8.3-1.3.3a2.6 2.6 0 0 1-2.1-1.2 2.6 2.6 0 0 1-2.1 1.2 2.6 2.6 0 0 1-2.2-1.2 2.6 2.6 0 0 1-1.7 1.2 2.6 2.6 0 0 1-1.7-1.2Zm-1.1 3.1c.8 0 1.5 0 2.4 1 .7-.1 1.5-.1 2.3 0 .9-1 1.6-1 2.4-1 .4 0 1.9 0 2.9 2.8l1.1 4c.8 2.9-.3 3-1.6 3-2 0-3.1-1.4-3.1-2.9-1 .2-2.2.3-3.4.3s-2.4-.1-3.4-.3c0 1.5-1.1 2.9-3.1 2.9-1.3 0-2.4-.1-1.6-3l1.1-4c1-2.8 2.5-2.8 2.9-2.8Zm2.1 2.2v.1c0 .2-.5.6-1 1.1l-.7.6.7.6c.5.5 1 .9 1 1.1 0 .2 0 .3.9.3s.9-.1.9-.3c0-.2.5-.6 1-1.1l.7-.6-.7-.6c-.5-.5-1-.9-1-1.1v-.1h-1.8Z"/></svg>',
    twitter:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.8 6.1H1.6l7.5-8.5L1.2 3h6.6l4.5 5.6L17.6 3Zm-1.1 16.1h1.8L7.6 4.8H5.7l10.8 14.3Z"/></svg>',
    bluesky:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3.6c2.2 1.7 4.6 5.1 5.5 6.9l.5 1 .5-1c.9-1.8 3.3-5.2 5.5-6.9 1.6-1.2 4-2.1 4 .8 0 .6-.3 4.8-.5 5.5-.7 2.4-3.1 3-5.3 2.6 3.8.7 4.8 2.9 2.7 5.1-4 4.1-5.7-1-6.2-2.4l-.2-.7-.2.7c-.5 1.4-2.2 6.5-6.2 2.4-2.1-2.2-1.1-4.4 2.7-5.1-2.2.4-4.6-.2-5.3-2.6-.2-.7-.5-4.9-.5-5.5 0-2.9 2.4-2 4-.8Z"/></svg>',
    mastodon:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.3 8.4c0-3.7-2.4-4.8-2.4-4.8C17.6 3 15.5 2.7 13.3 2.7h-.1c-2.2 0-4.3.3-5.6.9 0 0-2.4 1.1-2.4 4.8v3.2c0 4 .3 7.5 4.4 8.6 1.9.5 3.5.6 4.8.5 2.4-.1 3.7-.8 3.7-.8l-.1-1.7s-1.7.5-3.6.5c-1.9-.1-3.9-.2-4.2-2.5v-.6c4 1 7.4.4 7.8.4 2.6-.3 4.8-1.9 5.1-3.4.4-2.4.4-4.2.4-4.2Zm-3.2 5.3h-2v-4.9c0-1-.4-1.6-1.3-1.6-1 0-1.5.6-1.5 1.9v2.7h-2V9.1c0-1.3-.5-1.9-1.5-1.9-.9 0-1.3.6-1.3 1.6v4.9h-2V8.5c0-1 .3-1.8.8-2.4.5-.6 1.2-.9 2.1-.9 1 0 1.8.4 2.3 1.2l.5.9.5-.9c.5-.8 1.3-1.2 2.3-1.2.9 0 1.6.3 2.1.9.5.6.8 1.4.8 2.4v5.2Z"/></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.6-.5-5.3a2.8 2.8 0 0 0-2-2C18.8 4.2 12 4.2 12 4.2s-6.8 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1 1 1.7 2 2 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.3.5-5.3ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>',
    twitch:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.3 2 2.5 6.5v14.1h4.8V23h2.7l2.4-2.4h3.9L21 15.9V2H4.3Zm14.9 13.1-2.8 2.8h-4.3L9.7 20.3v-2.4H6.1V4h13.1v11.1ZM15.6 7.7h1.8v5.2h-1.8V7.7Zm-4.8 0h1.8v5.2h-1.8V7.7Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    artstation:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 18.2 3.6 21h12.9l-1.6-2.8H2ZM22 17l-6.6-11.4a1.7 1.7 0 0 0-1.5-.9H9.7l8.1 14h3.1c.6 0 1.1-.5 1.1-1.1 0-.2 0-.4-.1-.6ZM9 6.9l-5.6 9.7h11.2L9 6.9Z"/></svg>',
    soundcloud:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 13.2v4h1v-4h-1Zm2 -1.4v5.4h1v-5.4h-1Zm2 -1.1v6.5h1v-6.5h-1Zm2 .6v5.9h1V11.3h-1Zm2 -2.2v8.1h1V9.1h-1Zm2 -1.4v9.5h1V7.7h-1Zm2.5 -1.3c-.4 0-.8.1-1.1.3v10.5h6.6a3.2 3.2 0 0 0 .3-6.4 4.7 4.7 0 0 0-5.8-4.4Z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    generic:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 13a4 4 0 0 0 5.7 0l3-3A4 4 0 0 0 13 4.3l-1.7 1.7"/><path d="M14 11a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 19.7l1.7-1.7"/></svg>',
  };

  const LINK_LABELS = {
    website: "Website",
    github: "GitHub",
    linkedin: "LinkedIn",
    itch: "itch.io",
    twitter: "X / Twitter",
    bluesky: "Bluesky",
    mastodon: "Mastodon",
    youtube: "YouTube",
    twitch: "Twitch",
    instagram: "Instagram",
    artstation: "ArtStation",
    soundcloud: "SoundCloud",
    email: "Email",
  };

  /* Accepts "someone@example.com" or a full mailto: URL for the email key. */
  const linkHref = (key, value) => {
    const v = value.trim();
    if (key === "email") return v.startsWith("mailto:") ? v : "mailto:" + v;
    if (/^(https?:|mailto:|\/|\.)/.test(v)) return v;
    return "https://" + v;
  };

  /* ---------------------------------------------------------- game cards */

  function gameCard(game) {
    const cover =
      '<div class="game-cover">' +
      '<span class="placard">' + esc(initials(game.title)) + "</span>" +
      (isFilled(game.cover)
        ? '<img src="' + esc(game.cover) + '" alt="" loading="lazy" onerror="this.remove();">'
        : "") +
      "</div>";

    const meta = [];
    if (isFilled(game.status)) meta.push('<span class="status" data-status="' + esc(game.status) + '">' + esc(game.status) + "</span>");
    if (isFilled(game.year)) meta.push("<span>" + esc(game.year) + "</span>");
    if (game.platforms && game.platforms.length) meta.push("<span>" + esc(game.platforms.join(" / ")) + "</span>");
    if (isFilled(game.engine)) meta.push("<span>" + esc(game.engine) + "</span>");

    const tags = (game.tags || []).map((t) => '<span class="tag">' + esc(t) + "</span>").join("");
    const credits = game.credits && game.credits.length
      ? '<p class="game-credits">Made with ' + esc(game.credits.join(", ")) + "</p>"
      : "";
    const links = (game.links || [])
      .filter((l) => l && isFilled(l.url))
      .map((l) => '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || "Open") + "</a>")
      .join("");

    return (
      '<article class="plate game-card" id="' + esc(game.id || "") + '"><div class="plate-in">' +
      cover +
      '<div class="game-body">' +
      '<div class="game-meta">' + meta.join('<span class="dot">/</span>') + "</div>" +
      "<h3>" + esc(game.title) + "</h3>" +
      (isFilled(game.blurb) ? '<p class="game-blurb">' + esc(game.blurb) + "</p>" : "") +
      (isFilled(game.detail) ? '<p class="game-detail">' + esc(game.detail) + "</p>" : "") +
      (tags ? '<div class="tag-row">' + tags + "</div>" : "") +
      credits +
      (links ? '<div class="game-links">' + links + "</div>" : "") +
      "</div></div></article>"
    );
  }

  /* ---------------------------------------------------------- team cards */

  function memberCard(member) {
    /* If the headshot file is missing the img removes itself and the initials
       badge underneath shows through, so a half-filled roster still looks whole. */
    const badge = '<span class="initials">' + esc(initials(member.name)) + "</span>";
    const head =
      '<div class="headshot"><div class="headshot-in">' +
      badge +
      (isFilled(member.headshot)
        ? '<img src="' + esc(member.headshot) + '" alt="' + esc(member.name) +
          '" loading="lazy" onerror="this.remove();">'
        : "") +
      "</div></div>";

    const links = Object.keys(member.links || {})
      .filter((k) => isFilled(member.links[k]))
      .map((k) => {
        const label = LINK_LABELS[k] || k.charAt(0).toUpperCase() + k.slice(1);
        const icon = ICONS[k] || ICONS.generic;
        return (
          '<a class="chamfer" href="' + esc(linkHref(k, member.links[k])) +
          '" target="_blank" rel="noopener me" title="' + esc(label) +
          '" aria-label="' + esc(member.name + " on " + label) + '">' + icon + "</a>"
        );
      })
      .join("");

    const tags = (member.tags || []).map((t) => '<span class="tag">' + esc(t) + "</span>").join("");

    return (
      '<article class="plate member-card" id="' + esc(member.id || "") + '"><div class="plate-in">' +
      '<div class="member-body">' +
      '<div class="member-head">' + head +
      "<div><h3>" + esc(member.name) + "</h3>" +
      (isFilled(member.role) ? '<div class="member-role">' + esc(member.role) + "</div>" : "") +
      "</div></div>" +
      (isFilled(member.bio) ? '<p class="member-bio">' + esc(member.bio) + "</p>" : "") +
      (tags ? '<div class="tag-row">' + tags + "</div>" : "") +
      (links ? '<div class="member-links">' + links + "</div>" : "") +
      "</div></div></article>"
    );
  }

  const SLOT_CARD =
    '<article class="plate is-slot"><div class="plate-in"><div class="member-body">' +
    "<h3>Room for the next name</h3>" +
    "<p>The team is listed from <code>data/members.js</code> &mdash; drop in a name, a line about them, a headshot and whichever links they want shown.</p>" +
    "</div></div></article>";

  /* --------------------------------------------------------------- mount */

  function mount(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
    return el;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const games = typeof GAMES !== "undefined" ? GAMES : [];
    const members = typeof MEMBERS !== "undefined" ? MEMBERS : [];

    mount("[data-games='studio']", games.filter((g) => g.studio).map(gameCard).join(""));
    mount("[data-games='external']", games.filter((g) => !g.studio).map(gameCard).join(""));
    mount("[data-games='all']", games.map(gameCard).join(""));

    const teamHtml = members.map(memberCard).join("");
    mount("[data-team='full']", teamHtml + SLOT_CARD);
    mount("[data-team='preview']", members.slice(0, 3).map(memberCard).join(""));

    const countEl = document.querySelector("[data-count='games']");
    if (countEl) countEl.textContent = String(games.filter((g) => g.studio).length);

    const yearEl = document.querySelectorAll("[data-year]");
    yearEl.forEach((n) => (n.textContent = String(new Date().getFullYear())));

    /* mobile nav */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (toggle && nav) {
      /* The breakpoint lives in the stylesheet only: the CSS shows the toggle
         when the nav becomes a dropdown, so "is the toggle visible" is the
         question - no second copy of the pixel value to drift out of sync. */
      const sync = () => {
        const small = getComputedStyle(toggle).display !== "none";
        nav.hidden = small;
        toggle.setAttribute("aria-expanded", "false");
      };
      sync();
      window.addEventListener("resize", sync);
      toggle.addEventListener("click", function () {
        const open = nav.hidden;
        nav.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  });
})();
