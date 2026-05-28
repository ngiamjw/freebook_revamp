import './NextSection.css';

export function NextSection() {
  return (
    <section className="next-section" aria-labelledby="next-section-title">
      <div className="next-section__inner">
        <p className="next-section__eyebrow">Scroll continues</p>
        <h1 id="next-section-title">Next section</h1>
      </div>
    </section>
  );
}
