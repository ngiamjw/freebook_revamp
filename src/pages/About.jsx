import { Link } from "react-router-dom";
import { TeamCard } from "../components/About/TeamCard.jsx";
import { origin, mission, team } from "../data/about.js";
import "../components/About/About.css";

/**
 * About — "The Reader's Record".
 * Three short sections in the Freebook archival voice: why we started (an origin
 * entry beside a plate), our mission (a stamped statement + three principles),
 * and the team (borrower's cards that flip to a bio).
 */
export default function About() {
  return (
    <div className="ab-page">
      <Link to="/" className="ab-back">← Freebook.sg</Link>

      <header className="ab-masthead">
        <p className="ab-record">About · Freebook.sg</p>
        <h1>The people<br />behind the <em>books</em></h1>
        <p className="ab-lede">
          Freebook.sg began with one idea — that a good book should never go to
          waste. Here's where it started, what we're building, and who's building it.
        </p>
      </header>

      {/* ── Why we started ── */}
      <section className="ab-origin" aria-labelledby="ab-origin-title">
        <figure className="ab-origin-plate">
          <span className="ab-tape ab-tape--plate" aria-hidden="true" />
          <div className="ab-origin-photo">
            <span className="ab-monogram" aria-hidden="true">WR</span>
          </div>
          <figcaption>Chua Wen Rong · Co-Founder</figcaption>
        </figure>

        <div className="ab-origin-body">
          <span className="ab-eyebrow">{origin.eyebrow}</span>
          <span className="ab-rule" aria-hidden="true" />
          <h2 id="ab-origin-title" className="ab-headline">{origin.headline}</h2>
          {origin.paragraphs.map((p, i) => (
            <p className="ab-prose" key={i}>{p}</p>
          ))}
          <p className="ab-signature">— {origin.signature}</p>
        </div>
      </section>

      {/* ── Our mission ── */}
      <section className="ab-mission" aria-labelledby="ab-mission-title">
        <span className="ab-eyebrow ab-eyebrow--onforest">{mission.eyebrow}</span>
        <span className="ab-rule ab-rule--onforest" aria-hidden="true" />
        <h2 id="ab-mission-title" className="ab-mission-statement">
          {mission.statement}
        </h2>

        <dl className="ab-principles">
          {mission.principles.map(([label, text], i) => (
            <div className="ab-principle" key={label}>
              <dt>
                <span className="ab-principle-no">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Meet the team ── */}
      <section className="ab-team" aria-labelledby="ab-team-title">
        <div className="ab-team-head">
          <span className="ab-eyebrow">Accession no. 03 · The Team</span>
          <span className="ab-rule" aria-hidden="true" />
          <h2 id="ab-team-title" className="ab-headline">Meet the team</h2>
          <p className="ab-team-note">Tap a card to read their record.</p>
        </div>

        <div className="ab-team-grid">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
