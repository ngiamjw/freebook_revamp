// src/data/WhatWeDo.js
// "Catalogue plates" — the WhatWeDo wipe scroller re-skinned as archival
// catalogue entries (see WhatWeDo.jsx/.css). The scroll mechanic is unchanged;
// each tile now reads as an entry in the Freebook collection.
//
// Fields:
//   tone         paper | forest — the two-colour alternation (CSS sets colours)
//   frontispiece tile 1 only — title-plate treatment instead of an entry
//   callno       Space Mono call number, e.g. "FB · 025"
//   subject      short classification shown after the call number
//   headline     Fraunces display headline (\n honoured as a line break)
//   body         one-paragraph description
//   imprint      frontispiece-only imprint line (mono)
//   meta         entry-only ledger rows [[label, value], …] (mono)
//   image        used TWICE: crisp as the mounted plate + blurred as the wash
//   caption      typed caption strip under the plate (mono)
//   cta          { label, href, dir? } — dir "down" renders ↓ instead of →
//
// PHOTOS: `drives` reuses `cover` as a TEMPORARY placeholder — replace with a
// real landscape Book Drives photo. bookDrives.png is a PORTRAIT poster — never
// use it as a hero. Captions are kept truthful to what each photo actually
// shows; don't add invented dates/locations when swapping images.

import cover from "../components/Index/WhatWeDo/assets/cover.png";
import bookDonations from "../components/Index/WhatWeDo/assets/bookDonations.jpg";

export const sections = [
  {
    id: 1,
    tone: "paper",
    frontispiece: true,
    callno: "FB · 000",
    subject: "The Collection",
    headline: "Small acts,\nshared stories.",
    body: "Freebook.sg gives pre-loved books a second life — and puts free stories into the hands of every reader in the community.",
    imprint: "Freebook.sg · Singapore",
    image: cover,
    imageAlt: "Freebook volunteers sorting piles of donated books",
    imagePos: "center 40%",
    caption: "Frontispiece · Sorting day at the library",
    cta: { label: "Browse the collection", href: "#book-donations", dir: "down" },
  },
  {
    id: 2,
    tone: "forest",
    callno: "FB · 025",
    subject: "Donations",
    headline: "Book\nDonations",
    body: "We rescue pre-loved books and place them into the hands of new readers — giving stories a second life, and shelves a little more room.",
    meta: [
      ["Subject", "Pre-loved books"],
      ["Reach", "Community libraries"],
    ],
    image: bookDonations,
    imageAlt: "Volunteers at a Give & Take community library holding donated books",
    imagePos: "center center",
    caption: "Plate 01 · Give & Take community library",
    cta: { label: "Donate books", href: "/contact?type=donate" },
  },
  {
    id: 3,
    tone: "paper",
    callno: "FB · 026",
    subject: "Drives",
    headline: "Book\nDrives",
    body: "We run community drives that turn cluttered shelves into a neighbourhood library — collecting sustainably so good books never become waste.",
    meta: [
      ["Subject", "Community drives"],
      ["Hosts", "Schools · offices · estates"],
    ],
    image: cover, // TEMPORARY placeholder — replace with a real Book Drives photo
    imageAlt: "Community book drive collection",
    imagePos: "center 45%",
    caption: "Plate 02 · Books sorted for a neighbourhood drive",
    cta: { label: "Host a drive", href: "/contact?type=drive" },
  },
];
