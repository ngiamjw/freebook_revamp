// src/data/WhatWeDo.js
// Each section: eyebrow, headline, body, optional cta, image, leftBg, rightBg, textColor, accentColor, imagePos

import logo from "../pictures/logo_white_bg.jpg";
import cover from "../components/Index/WhatWeDo/assets/cover.png";
import bookDonations from "../components/Index/WhatWeDo/assets/bookDonations.jpg";
import bookDrives from "../components/Index/WhatWeDo/assets/bookDrives.png";

export const sections = [
  {
    id: 1,
    leftBg: "#358350",
    rightBg: "#0d1b2a",
    textColor: "#000000",
    accentColor: "#c8a96e",
    eyebrow: "",
    headline: "What we do",
    body: "Our actions to make a difference",
    image: cover,
    imageAlt: "Cover",
    cta: { label: "See All", href: "#" },
  },
  {
    id: 2,
    leftBg: "#f0ebe1",
    rightBg: "#101a10",
    textColor: "#000000",
    accentColor: "#7ab87a",
    eyebrow: "What we do",
    headline: "Book Donations",
    body: "Connecting books to new readers to give them new life",
    image: bookDonations,
    imageAlt: "Book Donation",
  },
  {
    id: 3,
    leftBg: "#63ad70",
    rightBg: "#15101e",
    textColor: "#000000",
    accentColor: "#143d14",
    eyebrow: "What we do",
    headline: "Book Drives",
    body: "Reducing waste by providing an outlet to collect books sustainably",
    image: bookDrives,
    imageAlt: "Book Drive Poster",
  },
  // {
  //   id: 4,
  //   leftBg: "#f0ebe1",
  //   rightBg: "#1e0f0f",
  //   textColor: "#f0ebe1",
  //   accentColor: "#d47a7a",
  //   eyebrow: "Chapter III",
  //   headline: "The long descent",
  //   body: "Coming down is its own art. You read the mountain differently on the way back.",
  //   image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
  //   imageAlt: "Hiker descending mountain",
  //   cta: { label: "Explore", href: "#" },
  // },
];