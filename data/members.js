/* ---------------------------------------------------------------------------
   MAME PRODUCTIONS — TEAM DATA
   ---------------------------------------------------------------------------
   Add a person by copying the template block at the bottom of this file and
   pasting it into the `MEMBERS` array. Everything except `name` is optional —
   leave a field out (or set it to "") and the site simply won't render it.

   headshot : path to an image in assets/img/members/ (square works best,
              600x600 or larger). Omit it and an initials badge is drawn
              automatically, so the page never looks broken.
   links    : any subset of the supported keys below. Unknown keys still work —
              they render with a generic link icon and a capitalised label.
              Supported with custom icons: website, github, linkedin, itch,
              twitter, bluesky, mastodon, youtube, twitch, instagram,
              artstation, soundcloud, email.
   --------------------------------------------------------------------------- */

const MEMBERS = [
  {
    id: "jeremy-yiu",
    name: "Jeremy Yiu",
    role: "Founder · Gameplay & Systems Engineer",
    headshot: "", // add assets/img/members/jeremy-yiu.jpg and point here
    bio: "Founded Mame Productions with friends to carry small games past the first jam build. Computer Science (Games) at USC; works mostly in Unity and C# on gameplay engineering, AI behaviour systems, narrative implementation, and UI.",
    tags: ["Unity / C#", "C++", "Gameplay Engineering", "AI Behaviour", "Narrative Systems", "UI", "3D Modelling & Animation"],
    links: {
      website: "https://jeremyyiu.org",
      github: "https://github.com/JeremyYiuStudent",
      linkedin: "https://www.linkedin.com/in/jeremy-yiu-b476b3190/"
    }
  }

  /* ---------------------------- COPY FROM HERE ----------------------------
  ,{
    id: "short-slug",
    name: "Full Name",
    role: "What they do here",
    headshot: "assets/img/members/short-slug.jpg",
    bio: "One or two sentences. Keep it short — this is a card, not a resume.",
    tags: ["Skill", "Skill"],
    links: {
      website: "",
      itch: "",
      github: "",
      linkedin: "",
      twitter: "",
      bluesky: "",
      youtube: "",
      instagram: "",
      artstation: "",
      email: "someone@example.com"
    }
  }
  ------------------------------- TO HERE -------------------------------- */
];
