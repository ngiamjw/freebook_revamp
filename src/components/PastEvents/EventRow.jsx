import { Link } from "react-router-dom";

/**
 * EventRow — one past event as a full-width date-due slip: a taped-in photo
 * beside a ruled slip stamped with when + where. `side` alternates the photo
 * left/right down the list (set by the parent via the row's data-side attr).
 * The whole row links into the event's detail page.
 */
export function EventRow({ event }) {
  const cover = event.photos?.[0];
  // first paragraph of the write-up is the slip's visible excerpt
  const slice = event.writeup?.[0] ?? event.excerpt;

  return (
    <Link to={`/past-events/${event.id}`} className="ps-slip-link">
      <div className="ps-photo">
        <div className="ps-photo-frame">
          {cover && (
            <img src={cover.src} alt={cover.alt ?? event.title} loading="lazy" />
          )}
        </div>
      </div>

      <div className="ps-slip">
        <div className="ps-slip-head">
          <span>Date due</span>
          <span>Freebook.sg</span>
        </div>

        <span className="ps-stamp">
          {event.date} · {event.location}
        </span>

        <h3 className="ps-slip-title">{event.title}</h3>
        <p className="ps-slip-excerpt">{slice}</p>

        <span className="ps-slip-more">Read the slip</span>
      </div>
    </Link>
  );
}
