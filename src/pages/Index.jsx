import { BookExperience } from '../components/BookExperience/BookExperience.jsx';
import { NextSection } from '../components/Sections/NextSection.jsx';
import { ProblemStatement } from '../components/Index/ProblemStatement/ProblemStatement.jsx';
import { PastEventsBar } from '../components/Index/PastEvents/PastEventsBar.jsx';
import { WhatWeDo } from '../components/Index/WhatWeDo/WhatWeDo.jsx';

import "../components/Index/Index.css";

export default function Index() {
  return (
    <>  
        <NextSection />
        <ProblemStatement />
        <NextSection />
        <WhatWeDo />
        <NextSection/>
        <PastEventsBar />
        <NextSection />
        <BookExperience />
        <NextSection />
    </>
  );
}