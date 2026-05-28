import { useCallback, useMemo, useRef, useState } from 'react';
import {
  BOOK_ANIMATION_CONFIG,
  getBookPhaseName,
} from './animationConfig.js';
import { useScrollVideo } from './useScrollVideo.js';
import './BookExperience.css';

const formatPercent = (value) => `${Math.round(value * 100)}%`;

export function BookExperience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState({
    scrollProgress: 0,
    videoProgress: 0,
  });

  const handleProgress = useCallback((nextProgress) => {
    setProgress(nextProgress);
  }, []);

  useScrollVideo({
    sectionRef,
    videoRef,
    canvasRef,
    config: BOOK_ANIMATION_CONFIG,
    onProgress: BOOK_ANIMATION_CONFIG.debug ? handleProgress : undefined,
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
        preload="auto"
      />

      <div className="book-experience__stage" aria-hidden="true">
        {/* Future picture-book page overlays should mount here. */}
        {/* Future CSS/photo elements can layer above the video in this stage. */}
        {/* Future zoom targets and section transition phases should be orchestrated from config. */}
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
