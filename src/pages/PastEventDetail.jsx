import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";

import { getEventById, categories } from "../data/pastEvents.js";
import "../components/PastEvents/PastEvents.css";

/**
 * PastEventDetail — one event's full record: a big date-due slip with the
 * complete write-up, a taped hero photo, and a contact sheet of every photo
 * from the day.
 */
export default function PastEventDetail() {
  const { id } = useParams();
  const event = getEventById(id);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!event) return;
    const ctx = gsap.context(() => {
      gsap.from(".ps-card > *", {
        opacity: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [event]);

  if (!event) {
    return (
      <div className="ps-page">
        <Link to="/past-events" className="ps-back">← Back to the record</Link>
        <div className="ps-missing">
          <h1>No slip on file</h1>
          <p>
            That event may have been moved or renamed. Head back to the record to
            browse every drive and hand-over.
          </p>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.key === event.category);
  const hero = event.photos?.[0];
  const photoCount = event.photos?.length ?? 0;

  return (
    <div className="ps-page" ref={rootRef}>
      <div className="ps-detail-topback">
        <Link to="/past-events" className="ps-back">← Back to the record</Link>
      </div>

      <article className="ps-detail">
        <div className="ps-card">
          <div className="ps-detail-head">
            <span>Date due</span>
            <span>{category?.label ?? "Past event"}</span>
          </div>

          <div className="ps-detail-stamp-row">
            <span className="ps-stamp">{event.date} · {event.location}</span>
          </div>

          <h1>{event.title}</h1>

          {hero && (
            <div className="ps-hero">
              <div className="ps-hero-frame">
                <img src={hero.src} alt={hero.alt ?? event.title} />
              </div>
            </div>
          )}

          <div className="ps-writeup">
            {event.writeup.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {photoCount > 0 && (
            <>
              <div className="ps-plates-head">
                <span>Photographs enclosed</span>
                <span>{photoCount} plate{photoCount > 1 ? "s" : ""}</span>
              </div>
              <ul className="ps-plates">
                {event.photos.map((photo, i) => (
                  <li key={i}>
                    <figure className="ps-plate-frame">
                      <img src={photo.src} alt={photo.alt ?? event.title} loading="lazy" />
                      <figcaption>
                        Plate {String(i + 1).padStart(2, "0")}
                        {photo.alt ? ` · ${photo.alt}` : ""}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="ps-detail-foot">
          <Link to="/past-events" className="ps-back">← Back to the record</Link>
        </div>
      </article>
    </div>
  );
}
