import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./PastEventsBar.css";
import { introContent, pastEvents } from "../../../data/PastEventsBar.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * PastEventsBar — "The Archive" teaser (homepage).
 * Editorial index + live preview: a list of past events on the left; one large
 * image on the right that cross-fades to whichever row is active (hover on
 * desktop). A button leads to the full /past-events page. No card/tape motif.
 */
export function PastEventsBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header: clean reveal on enter.
      gsap.from(".pe-head-el", {
        scrollTrigger: { trigger: ".pe-section", start: "top 78%", once: true },
        opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: "power2.out",
      });
      // Preview image scales in.
      gsap.from(".pe-preview-wrap", {
        scrollTrigger: { trigger: ".pe-section", start: "top 72%", once: true },
        opacity: 0, scale: 1.05, duration: 1, ease: "power2.out",
      });
      // Rows rise as you scroll into the section (motion tied to scroll).
      gsap.from(".pe-row", {
        scrollTrigger: { trigger: ".pe-index", start: "top 82%", end: "top 42%", scrub: true },
        opacity: 0, y: 44, stagger: 0.2, ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="pe-section" aria-label="Past events">
      <div className="pe-inner">
        <header className="pe-head">
          <span className="pe-marker pe-head-el">
            <span className="pe-marker-rule" aria-hidden="true" />
            {introContent.marker}
          </span>
          <h2 className="pe-title pe-head-el">{introContent.title}</h2>
        </header>

        <div className="pe-grid">
          {/* Left: the index */}
          <ol className="pe-index">
            {pastEvents.map((ev, i) => (
              <li
                key={ev.id}
                className="pe-row"
                data-active={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
              >
                {/* inline image — shown on mobile only */}
                <div className="pe-row-img">
                  <img src={ev.image} alt={ev.alt ?? ""} loading="lazy"
                    style={{ objectPosition: ev.imagePos ?? "center center" }} />
                </div>
                <span className="pe-row-date">{ev.date}</span>
                <div className="pe-row-main">
                  <h3 className="pe-row-title">{ev.title}</h3>
                  {ev.place && <span className="pe-row-place">{ev.place}</span>}
                </div>
                <span className="pe-row-arrow" aria-hidden="true">→</span>
              </li>
            ))}
          </ol>

          {/* Right: live preview — cross-fading stack */}
          <div className="pe-preview-wrap" aria-hidden="true">
            {pastEvents.map((ev, i) => (
              <img
                key={ev.id}
                className="pe-preview"
                src={ev.image}
                alt=""
                data-active={active === i}
                loading="lazy"
                style={{ objectPosition: ev.imagePos ?? "center center" }}
              />
            ))}
          </div>
        </div>

        <div className="pe-cta-row">
          <Link to="/past-events" className="pe-cta">Open the full archive →</Link>
        </div>
      </div>
    </section>
  );
}
