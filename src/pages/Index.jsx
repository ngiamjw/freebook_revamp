import { BookExperience } from '../components/BookExperience/BookExperience.jsx';
import { ProblemStatement } from '../components/Index/ProblemStatement/ProblemStatement.jsx';
import { PastEventsBar } from '../components/Index/PastEvents/PastEventsBar.jsx';
import { WhatWeDo } from '../components/Index/WhatWeDo/WhatWeDo.jsx';
import { CinematicLogoCloud } from '../components/ui/cinematic-logo-cloud.jsx';
import { Footerdemo } from '../components/ui/footer-section.jsx';

import "../components/Index/Index.css";

// TODO: Replace with Freebook.sg's real partners / sponsors.
// Use `{ name, text: true }` for wordmarks, or `{ name, slug }` where slug is a
// simpleicons.org identifier (https://simpleicons.org) to render a logo.
const partners = [
  { name: "National Library Board", text: true, className: "text-lg font-semibold" },
  { name: "ReadSG", text: true, className: "text-lg font-medium" },
  { name: "Community Chest", text: true, className: "text-lg font-medium" },
  { name: "SG Cares", text: true, className: "text-lg font-semibold" },
  { name: "Books Beyond Borders", text: true, className: "text-lg font-medium" },
  { name: "Room to Read", text: true, className: "text-lg font-semibold" },
];

export default function Index() {
  return (
    <>
        <BookExperience />
        <ProblemStatement />
        <WhatWeDo />
        <PastEventsBar />
        <CinematicLogoCloud
          clients={partners}
          eyebrow="Proudly supported by our partners"
          description="Together, bringing free books to every corner of the community."
        />
        <Footerdemo />
    </>
  );
}