export const BOOK_ANIMATION_CONFIG = {
  debug: false,
  // Pinned scroll distance for the hero scrub. Viewport-relative (function
  // form) so it feels the same on any screen and doesn't over-jack scroll —
  // recomputed on every ScrollTrigger.refresh via invalidateOnRefresh.
  scrollLength: () => Math.round(window.innerHeight * 1.6),
  video: {
    renderer: 'canvas',
    sourceFps: 60,
    minSeekDeltaFrames: 0.5,
    // A book-opening beat doesn't need 120 unique frames. Fewer frames + a
    // smaller cache width cut both the startup seek time and memory roughly
    // in half.
    maxCachedFrames: 48,
    maxFrameWidth: 960,
    maxCanvasDpr: 2,
  },
  // Reveal windows expressed in scrub progress (0–1). Overlays mounted in the
  // hero layer fade/rise within their window so the opening book *delivers*
  // content instead of scrubbing in a vacuum.
  phases: {
    videoStart: 0,
    videoEnd: 1,
    headline: { start: 0.42, end: 0.7 },
    subline: { start: 0.54, end: 0.82 },
    cta: { start: 0.72, end: 0.96 },
  },
};

export function getBookPhaseName(progress, phases = BOOK_ANIMATION_CONFIG.phases) {
  if (progress >= phases.videoStart && progress <= phases.videoEnd) {
    return 'book-opening-video';
  }

  // Future phase names can be derived here as the config expands, for example:
  // overlay-fade-in, photo-zoom, next-section-transition.
  return 'idle';
}
