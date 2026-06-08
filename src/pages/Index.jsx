import { BookExperience } from '../components/BookExperience/BookExperience.jsx';
import { NextSection } from '../components/Sections/NextSection.jsx';
import { PastEventsBar } from '../components/Index/PastEvents/PastEventsBar.jsx';

import "../components/Index/Index.css";

export default function Index() {
  return (
    <>
        <NextSection />
        <PastEventsBar />
        <BookExperience />
        <NextSection />
        <section>
            <h2>Upcoming Events</h2>
            <p>Join us for our upcoming events and experiences. We have a variety of activities planned that you won't want to miss!</p>
            <a href="/past-events">See past events</a>
        </section>
        
    </>
  );
}