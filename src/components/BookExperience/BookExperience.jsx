import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BOOK_ANIMATION_CONFIG,
  getBookPhaseName,
} from './animationConfig.js';
import { useScrollVideo } from './useScrollVideo.js';
import './BookExperience.css';

const formatPercent = (value) => `${Math.round(value * 100)}%`;

const clamp01 = (value) => Math.min(1, Math.max(0, value));

// Local progress (0–1) of a reveal within its own scrub window.
const revealAmount = (progress, { start, end }) =>
  clamp01((progress - start) / (end - start));

// Drive the hero overlays imperatively from the scrub progress. We write
// transform/opacity/clip-path directly on each element (GPU-only props) rather
// than through React state so scrolling never triggers a re-render per frame.
function updateHeroOverlays(progress, els) {
  const { phases } = BOOK_ANIMATION_CONFIG;
  const h = revealAmount(progress, phases.headline);
  const s = revealAmount(progress, phases.subline);
  const c = revealAmount(progress, phases.cta);

  if (els.eyebrow) {
    els.eyebrow.style.opacity = h;
    els.eyebrow.style.transform = `translate3d(0, ${(1 - h) * 16}px, 0)`;
  }
  if (els.headline) {
    els.headline.style.opacity = h;
    els.headline.style.transform = `translate3d(0, ${(1 - h) * 24}px, 0)`;
    // Reveal the words rising up out of the page (top-down clip).
    els.headline.style.clipPath = `inset(0 0 ${(1 - h) * 100}% 0)`;
  }
  if (els.subline) {
    els.subline.style.opacity = s;
    els.subline.style.transform = `translate3d(0, ${(1 - s) * 20}px, 0)`;
  }
  if (els.cta) {
    els.cta.style.opacity = c;
    els.cta.style.transform = `translate3d(0, ${(1 - c) * 16}px, 0)`;
  }
  if (els.cue) {
    // Scroll cue is visible at the start, then fades as the user scrubs in.
    els.cue.style.opacity = clamp01(1 - progress * 1.4);
  }
}

export function BookExperience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);
  const [progress, setProgress] = useState({
    scrollProgress: 0,
    videoProgress: 0,
  });

  const handleProgress = useCallback((next) => {
    updateHeroOverlays(next.scrollProgress, {
      eyebrow: eyebrowRef.current,
      headline: headlineRef.current,
      subline: sublineRef.current,
      cta: ctaRef.current,
      cue: cueRef.current,
    });

    if (BOOK_ANIMATION_CONFIG.debug) {
      setProgress(next);
    }
  }, []);

  useScrollVideo({
    sectionRef,
    videoRef,
    canvasRef,
    config: BOOK_ANIMATION_CONFIG,
    onProgress: handleProgress,
  });

  const phaseName = useMemo(
    () => getBookPhaseName(progress.scrollProgress, BOOK_ANIMATION_CONFIG.phases),
    [progress.scrollProgress],
  );

  return (
    <section
      ref={sectionRef}
      className="book-experience"
      aria-label="Book opening scroll experience"
    >
      <canvas
        ref={canvasRef}
        className="book-experience__canvas"
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        className="book-experience__video-source"
        src="/videos/book-opening.mp4"
        muted
        playsInline
        preload="metadata"
      />

      <div className="book-experience__hero">
        <p ref={eyebrowRef} className="book-experience__eyebrow">
          Freebook.sg
        </p>
        <h1 ref={headlineRef} className="book-experience__title">
          Great books, free for everyone.
        </h1>
        <p ref={sublineRef} className="book-experience__subtitle">
          We rescue unread books and put them into the hands that need them
          most — building a community where knowledge is never wasted.
        </p>
        <div ref={ctaRef} className="book-experience__cta-wrap">
          <Link to="/contact" className="book-experience__cta">
            Get involved
          </Link>
        </div>
      </div>

      <div ref={cueRef} className="book-experience__cue" aria-hidden="true">
        <span />
        scroll
      </div>

      {BOOK_ANIMATION_CONFIG.debug ? (
        <aside className="book-debug" aria-label="Animation debug panel">
          <dl className="book-debug__list">
            <div className="book-debug__row">
              <dt>Total scroll</dt>
              <dd>{formatPercent(progress.scrollProgress)}</dd>
            </div>
            <div className="book-debug__row">
              <dt>Video</dt>
              <dd>{formatPercent(progress.videoProgress)}</dd>
            </div>
            <div className="book-debug__row">
              <dt>Phase</dt>
              <dd>{phaseName}</dd>
            </div>
          </dl>
        </aside>
      ) : null}
    </section>
  );
}
