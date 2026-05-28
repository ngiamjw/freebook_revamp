export const BOOK_ANIMATION_CONFIG = {
  debug: false,
  scrollLength: 4000,
  video: {
    renderer: 'canvas',
    sourceFps: 60,
    minSeekDeltaFrames: 0.5,
    maxCachedFrames: 120,
    maxFrameWidth: 1280,
    maxCanvasDpr: 2,
  },
  phases: {
    videoStart: 0,
    videoEnd: 1,
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
