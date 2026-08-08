import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { EventRow } from "../components/PastEvents/EventRow.jsx";
import { categories, eventsByCategory } from "../data/pastEvents.js";
import "../components/PastEvents/PastEvents.css";

/**
 * PastEvents — "The Returns Desk".
 * A toggle picks one collection (Book Drives / Book Donations); its events are
 * listed as full-width date-due slips, photo alternating left/right, each
 * linking to a detail page.
 */
export default function PastEvents() {
  const [active, setActive] = useState(categories[0].key);
  const listRef = useRef(null);

  const events = eventsByCategory(active);

  // Re-run the slip entrance whenever the collection changes.
  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ps-rows > li", {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, listRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="ps-page">
      <Link to="/" className="ps-back">← Freebook.sg</Link>

      <header className="ps-masthead">
        <p className="ps-record">Past events · Lending record</p>
        <h1>Where the<br />books <em>went</em></h1>
        <p className="ps-lede">
          Every drive and hand-over leaves a slip — when it happened, where, and
          the story of the day. Flip through the record below.
        </p>
      </header>

      <div className="ps-tabs" role="tablist" aria-label="Collections">
        {categories.map((cat) => {
          const count = eventsByCategory(cat.key).length;
          const isActive = cat.key === active;
          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive}
              className="ps-tab"
              onClick={() => setActive(cat.key)}
            >
              {cat.label}
              <span className="ps-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div ref={listRef}>
        <ol className="ps-rows">
          {events.map((ev, i) => (
            <li key={ev.id} data-side={i % 2 === 0 ? "photo-left" : "photo-right"}>
              <EventRow event={ev} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
