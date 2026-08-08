import { useState } from "react";

/**
 * TeamCard — a "borrower's card" that flips to reveal a bio.
 *
 * Front: monogram plate (or photo), name, role, and a Co-Founder stamp for
 * founders. Back: the person's short bio. Flips on hover (pointer devices) via
 * CSS, and on click / Enter / Space everywhere via `data-flipped` — so it works
 * on touch and by keyboard, not just on hover.
 */
export function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);
  const { name, title, coFounder, initials, accent, photo, bio } = member;

  return (
    <article className="ab-card" data-accent={accent} data-flipped={flipped}>
      <button
        type="button"
        className="ab-card-inner"
        aria-pressed={flipped}
        aria-label={`${name}, ${title}. Show biography.`}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* ── Front ── */}
        <div className="ab-face ab-front">
          <div className="ab-photo">
            {photo ? (
              <img src={photo} alt={name} loading="lazy" />
            ) : (
              <span className="ab-monogram" aria-hidden="true">{initials}</span>
            )}
            <span className="ab-tape" aria-hidden="true" />
          </div>

          <div className="ab-front-meta">
            {coFounder && <span className="ab-badge">Co-Founder</span>}
            <h3 className="ab-name">{name}</h3>
            <p className="ab-role">{title}</p>
          </div>

          <span className="ab-flip-hint" aria-hidden="true">Flip ↻</span>
        </div>

        {/* ── Back ── */}
        <div className="ab-face ab-back">
          <span className="ab-back-label" aria-hidden="true">On record</span>
          <p className="ab-bio">{bio}</p>
          <span className="ab-back-name" aria-hidden="true">
            {name}
            <em>{title}</em>
          </span>
        </div>
      </button>
    </article>
  );
}
