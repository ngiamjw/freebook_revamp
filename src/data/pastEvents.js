// src/data/pastEvents.js
//
// The full "Archive" — every past event, grouped into two collections:
// Book Drives and Book Donations. Powers the /past-events listing page and
// the /past-events/:id detail page.
//
// Each event shape:
//   id        stable slug — used in the URL (/past-events/<id>)
//   category  "drives" | "donations" — which section it appears under
//   title     Fraunces display title
//   date      display string, e.g. "May 2026"
//   location  where it happened
//   excerpt   1–2 sentence teaser shown on the card
//   writeup   string[] — the full write-up, one entry per paragraph
//   photos    { src, alt }[] — the FIRST photo is used as the card cover;
//             ALL photos appear in the detail-page gallery
//
// PHOTOS/COPY are PLACEHOLDERS reusing the three existing assets. Replace the
// imports + writeups with real event photos and text. Keep the shape intact.

import bookDrives from "../components/Index/WhatWeDo/assets/bookDrives.png";
import bookDonations from "../components/Index/WhatWeDo/assets/bookDonations.jpg";
import cover from "../components/Index/WhatWeDo/assets/cover.png";

export const categories = [
  {
    key: "drives",
    label: "Book Drives",
    callno: "FB · 026",
    eyebrow: "Community drives",
    blurb:
      "Neighbourhood collection days that turn cluttered shelves into a shared library — one estate, school and office at a time.",
  },
  {
    key: "donations",
    label: "Book Donations",
    callno: "FB · 025",
    eyebrow: "Give & take",
    blurb:
      "Pop-ups and hand-overs where rescued, pre-loved books find their way into the hands of new readers.",
  },
];

export const pastEvents = [
  // ── Book Drives ──────────────────────────────────────────────────────
  {
    id: "yck-book-drive-2026",
    category: "drives",
    title: "Neighbourhood Book Drive",
    date: "May 2026",
    location: "YCK Zone 8 RC, Yio Chu Kang",
    excerpt:
      "A weekend collection drive with the Zone 8 Residents' Committee that filled three sorting tables before noon.",
    writeup: [
      "Over one weekend in May, Freebook.sg teamed up with the YCK Zone 8 Residents' Committee to run a neighbourhood book drive at the void deck. Residents were invited to bring down the books they no longer read — from children's picture books to well-thumbed novels.",
      "By noon the response had already filled three sorting tables. Volunteers sorted every donation on the spot: books in good condition were catalogued for redistribution, while the rest were set aside for recycling so nothing went to waste.",
      "The drive doubled as a mini pop-up library — neighbours browsing the freshly sorted piles were welcome to take home anything that caught their eye, no strings attached. Many left with a stack under one arm and a promise to bring more next time.",
    ],
    photos: [
      { src: bookDrives, alt: "Freebook.sg × YCK Zone 8 book drive poster" },
      { src: cover, alt: "Volunteers sorting donated books at the drive" },
      { src: bookDonations, alt: "Residents browsing the pop-up library table" },
    ],
  },
  {
    // PLACEHOLDER — replace with a real event
    id: "school-drive-2025",
    category: "drives",
    title: "Back-to-School Drive",
    date: "November 2025",
    location: "Rivervale Primary School",
    excerpt:
      "An end-of-year collection with students clearing out last year's textbooks and storybooks for younger readers.",
    writeup: [
      "As the school year wound down, we set up collection crates in the school foyer for a week-long back-to-school drive. Students dropped off assessment books, storybooks and readers they'd outgrown.",
      "The best-condition books were re-shelved into the school's own reading corners; the rest were redistributed to community libraries across the estate.",
    ],
    photos: [
      { src: cover, alt: "Books collected during the school drive" },
      { src: bookDrives, alt: "Collection crates in the school foyer" },
    ],
  },

  // ── Book Donations ───────────────────────────────────────────────────
  {
    // PLACEHOLDER — replace with a real event
    id: "give-and-take-2024",
    category: "donations",
    title: "Give & Take Pop-up",
    date: "August 2024",
    location: "The Caterpillar Library",
    excerpt:
      "A give-and-take shelf where visitors left a book, took a book, and stayed for the afternoon.",
    writeup: [
      "Our Give & Take pop-up turned a quiet corner of the community library into an afternoon of trading stories. The rule was simple: leave a book, take a book — or just take one, no obligation.",
      "Volunteers restocked the shelf through the day from our donation pool, keeping a fresh spread of titles for every age. What started as a shelf became a gathering: readers swapping recommendations long after they'd found their book.",
    ],
    photos: [
      { src: bookDonations, alt: "Volunteers at the Give & Take community library" },
      { src: cover, alt: "The give-and-take shelf, freshly restocked" },
    ],
  },
  {
    // PLACEHOLDER — replace with a real event
    id: "sorting-day-2024",
    category: "donations",
    title: "Sorting Day",
    date: "June 2024",
    location: "Freebook HQ",
    excerpt:
      "A volunteer sorting session preparing hundreds of donated books for their next home.",
    writeup: [
      "Between drives, donations pile up — and every book needs a second pair of eyes before it moves on. On Sorting Day, volunteers gathered at HQ to check condition, wipe covers, and sort titles by age and genre.",
      "By the end of the session, hundreds of books were boxed and labelled, ready to be delivered to community libraries and future pop-ups.",
    ],
    photos: [
      { src: cover, alt: "Volunteers sorting donated books at HQ" },
      { src: bookDonations, alt: "Boxed and labelled books ready for delivery" },
    ],
  },
];

/** Events belonging to one category, in listing order. */
export function eventsByCategory(key) {
  return pastEvents.filter((ev) => ev.category === key);
}

/** Look up a single event by its URL slug. Returns undefined if not found. */
export function getEventById(id) {
  return pastEvents.find((ev) => ev.id === id);
}
