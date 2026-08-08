// src/data/PastEventsBar.js
//
// "The Archive" teaser — a SHORT curated set (3) of past events shown as
// mounted plates, with a button through to the full /past-events page.
//
// event 1 (Book Drive) is REAL — pulled from the YCK Zone 8 poster.
// events 2–3 are PLACEHOLDERS using existing photos: replace title/date/place
// (and ideally the image) with real events. Keep the shape { image, date,
// title, place, alt }.

import bookDrives from "../components/Index/WhatWeDo/assets/bookDrives.png";
import bookDonations from "../components/Index/WhatWeDo/assets/bookDonations.jpg";
import cover from "../components/Index/WhatWeDo/assets/cover.png";

export const introContent = {
  marker: "From the archive",
  title: "Moments we've\nmade together",
  body: "A look back at the drives, pop-ups and sorting days that brought our community around good books.",
};

export const pastEvents = [
  {
    id: "yck-book-drive-2026",
    image: bookDrives,
    imagePos: "center top",
    date: "May 2026",
    title: "Neighbourhood Book Drive",
    place: "YCK Zone 8 RC",
    alt: "Freebook.sg × YCK Zone 8 book drive poster",
  },
  {
    // PLACEHOLDER — replace with a real event
    id: "give-and-take",
    image: bookDonations,
    imagePos: "center center",
    date: "2024",
    title: "Give & Take Pop-up",
    place: "The Caterpillar Library",
    alt: "Volunteers at a Give & Take community library",
  },
  {
    // PLACEHOLDER — replace with a real event
    id: "sorting-day",
    image: cover,
    imagePos: "center 40%",
    date: "2024",
    title: "Sorting Day",
    place: "Freebook HQ",
    alt: "Volunteers sorting donated books",
  },
];
