// src/data/about.js
// Content for the About page ("The Reader's Record" — see About.css / About.jsx).
// Kept as data so copy + team roster can be edited without touching layout.
//
// TEAM PHOTOS: each member renders a monogram plate by default. Drop a real
// portrait in and set `photo` to its imported/public path to replace the
// monogram — `initials` + `accent` are the graceful fallback until then.
// Names/roles for everyone except Wen Rong are PLACEHOLDERS — replace them.

export const mission = {
  eyebrow: "Accession no. 02 · Mission",
  statement:
    "To give every pre-loved book a second reader — building a circular economy of stories that brings communities closer together while helping organisations grow more sustainably.",
  principles: [
    [
      "Circular by design",
      "Books are rescued, not discarded. Every hand-over keeps a good story in circulation and out of the waste stream.",
    ],
    [
      "Community first",
      "Free means free. We put books into the hands of readers across Singapore, no barriers and no price tag.",
    ],
    [
      "Impact worth measuring",
      "We help partners turn sustainable intent into outcomes — books rehomed, waste avoided, communities reached.",
    ],
  ],
};

export const origin = {
  eyebrow: "Accession no. 01 · Origin",
  headline: "Why we\nstarted",
  paragraphs: [
    "As co-founder of freebook, Chua Wen Rong's passion for sustainability emerged during his time at one of South East Asia's biggest asset management firms as an investment analyst. Evaluating investments based on ESG factors, he noticed the growing importance of sustainability in Singapore, sparking his curiosity about its broader impact. He saw how companies embracing sustainable practices not only reduced environmental footprints but also unlocked long-term value and stakeholder trust.",
    "This inspired him to launch freebook, Singapore's first digital platform for free book exchanges, to benefit communities by promoting a circular economy of pre-loved books while delivering value to organisations through sustainable innovation. His vision for freebook reflects his commitment to creating meaningful social and environmental impact, aligning sustainability with community and corporate growth.",
  ],
  signature: "Chua Wen Rong · Co-Founder",
};

export const team = [
  {
    id: "wen-rong",
    name: "Chua Wen Rong",
    title: "Co-Founder",
    coFounder: true,
    initials: "WR",
    accent: "forest",
    photo: null, // e.g. "/images/team/wen-rong.jpg"
    bio: "Former ESG investment analyst who turned a conviction about sustainability into freebook. He leads on vision and partnerships — aligning environmental impact with community and corporate growth.",
  },
  {
    id: "co-founder-2",
    name: "Co-Founder Name", // TODO: replace with the second co-founder
    title: "Co-Founder",
    coFounder: true,
    initials: "CF",
    accent: "red",
    photo: null,
    bio: "Placeholder bio. Add a short line on this co-founder's background and what they own at freebook — operations, community, product, or partnerships.",
  },
  {
    id: "member-1",
    name: "Team Member", // TODO: replace with a real teammate
    title: "Community Lead",
    coFounder: false,
    initials: "TM",
    accent: "forest",
    photo: null,
    bio: "Placeholder bio. Add a short line on what this teammate does day-to-day and why they care about getting free books into readers' hands.",
  },
  {
    id: "member-2",
    name: "Team Member", // TODO: replace with a real teammate
    title: "Operations",
    coFounder: false,
    initials: "TM",
    accent: "red",
    photo: null,
    bio: "Placeholder bio. Add a short line on this teammate's role — logistics, book drives, partnerships — and a sentence of personality.",
  },
];
