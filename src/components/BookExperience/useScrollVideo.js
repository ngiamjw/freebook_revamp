import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clampProgress = (value) => Math.min(1, Math.max(0, value));

function getPrefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)');
}

function getVideoDuration(video) {
  return Number.isFinite(video.duration) ? video.duration : 0;
}

function getFrameSourceSize(source) {
  return {
    width: source.videoWidth || source.width,
    height: source.videoHeight || source.height,
  };
}

function drawCover(context, source, canvas) {
  const sourceSize = getFrameSourceSize(source);

  if (!sourceSize.width || !sourceSize.height || !canvas.width || !canvas.height) {
    return;
  }

  const sourceRatio = sourceSize.width / sourceSize.height;
  const canvasRatio = canvas.width / canvas.height;
  let drawWidth = canvas.width;
  let drawHeight = canvas.height;

  if (sourceRatio > canvasRatio) {
    drawWidth = canvas.height * sourceRatio;
  } else {
    drawHeight = canvas.width / sourceRatio;
  }

  const drawX = (canvas.width - drawWidth) / 2;
  const drawY = (canvas.height - drawHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, drawX, drawY, drawWidth, drawHeight);
}

function resizeCanvas(canvas, section, config) {
  const rect = section.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, config.video.maxCanvasDpr);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function seekVideo(video, time) {
  return new Promise((resolve, reject) => {
    const handleSeeked = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(video.error || new Error('Video seek failed.'));
    };

    const cleanup = () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };

    video.addEventListener('seeked', handleSeeked, { once: true });
    video.addEventListener('error', handleError, { once: true });
    video.currentTime = time;
  });
}

function getCacheSize(video, config) {
  const width = video.videoWidth || 1;
  const height = video.videoHeight || 1;
  const scale = Math.min(1, config.video.maxFrameWidth / width);

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function captureCurrentFrame(video, cacheSize) {
  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = cacheSize.width;
  frameCanvas.height = cacheSize.height;

  const context = frameCanvas.getContext('2d', {
    alpha: false,
    desynchronized: true,
  });

  context.drawImage(video, 0, 0, cacheSize.width, cacheSize.height);

  if ('createImageBitmap' in window) {
    return createImageBitmap(frameCanvas);
  }

  return frameCanvas;
}

async function buildFrameCache(video, config, isCleanedUp) {
  const duration = getVideoDuration(video);
  const sourceFrameCount = Math.round(duration * config.video.sourceFps) + 1;
  const frameCount = Math.max(
    2,
    Math.min(config.video.maxCachedFrames, sourceFrameCount),
  );
  const cacheSize = getCacheSize(video, config);
  const frames = [];

  video.pause();

  for (let index = 0; index < frameCount; index += 1) {
    if (isCleanedUp()) {
      break;
    }

    const progress = index / (frameCount - 1);
    const time = Math.min(duration, duration * progress);

    await seekVideo(video, time);

    if (isCleanedUp()) {
      break;
    }

    frames.push(await captureCurrentFrame(video, cacheSize));
  }

  return frames;
}

function closeFrameCache(frames) {
  frames.forEach((frame) => {
    frame.close?.();
  });
}

export function useScrollVideo({
  sectionRef,
  videoRef,
  canvasRef,
  config,
  onProgress,
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });

    if (!section || !video) {
      return undefined;
    }

    const reducedMotionQuery = getPrefersReducedMotion();
    const useCanvasRenderer = config.video.renderer === 'canvas' && canvas && context;
    const frames = [];
    let hasCleanedUp = false;
    let metadataHandler = null;
    let resizeObserver = null;
    let drawFrame = null;
    let seekFrame = null;
    let isFrameCacheReady = false;
    let latestProgress = 0;
    let lastAppliedTime = Number.NaN;
    let pendingVideoProgress = {
      scrollProgress: 0,
      videoProgress: 0,
      targetTime: 0,
    };

    const minSeekDelta =
      config.video.minSeekDeltaFrames / config.video.sourceFps;

    const killTrigger = () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };

    const cancelPendingWork = () => {
      if (drawFrame !== null) {
        cancelAnimationFrame(drawFrame);
        drawFrame = null;
      }

      if (seekFrame !== null) {
        cancelAnimationFrame(seekFrame);
        seekFrame = null;
      }
    };

    const reportProgress = (scrollProgress, videoProgress = scrollProgress) => {
      onProgress?.({
        scrollProgress: clampProgress(scrollProgress),
        videoProgress: clampProgress(videoProgress),
      });
    };

    const renderFrameAtProgress = (scrollProgress) => {
      if (!useCanvasRenderer || !isFrameCacheReady || frames.length === 0) {
        return;
      }

      const frameIndex = Math.round(clampProgress(scrollProgress) * (frames.length - 1));
      drawCover(context, frames[frameIndex], canvas);
    };

    const scheduleCanvasRender = (scrollProgress) => {
      latestProgress = scrollProgress;

      if (!useCanvasRenderer || !isFrameCacheReady) {
        reportProgress(scrollProgress, scrollProgress);
        return;
      }

      if (drawFrame === null) {
        drawFrame = requestAnimationFrame(() => {
          drawFrame = null;

          if (!hasCleanedUp) {
            renderFrameAtProgress(latestProgress);
            reportProgress(latestProgress, latestProgress);
          }
        });
      }
    };

    const applyPendingVideoSeek = () => {
      seekFrame = null;

      if (hasCleanedUp) {
        return;
      }

      const { scrollProgress, videoProgress, targetTime } = pendingVideoProgress;
      const shouldSeek =
        !Number.isFinite(lastAppliedTime) ||
        Math.abs(targetTime - lastAppliedTime) >= minSeekDelta ||
        videoProgress === 0 ||
        videoProgress === 1;

      if (shouldSeek) {
        video.currentTime = targetTime;
        lastAppliedTime = targetTime;
      }

      reportProgress(scrollProgress, videoProgress);
    };

    const scheduleVideoSeek = (scrollProgress) => {
      const duration = getVideoDuration(video);
      const videoProgress = duration > 0 ? scrollProgress : 0;

      pendingVideoProgress = {
        scrollProgress,
        videoProgress,
        targetTime: duration * videoProgress,
      };

      if (seekFrame === null) {
        seekFrame = requestAnimationFrame(applyPendingVideoSeek);
      }
    };

    const renderProgress = (scrollProgress) => {
      if (useCanvasRenderer) {
        scheduleCanvasRender(scrollProgress);
      } else {
        scheduleVideoSeek(scrollProgress);
      }
    };

    const drawVideoFrameToCanvas = () => {
      if (useCanvasRenderer) {
        resizeCanvas(canvas, section, config);
        drawCover(context, video, canvas);
      }
    };

    const setupReducedMotionState = async () => {
      killTrigger();
      cancelPendingWork();

      const duration = getVideoDuration(video);

      if (duration > 0) {
        await seekVideo(video, Math.max(0, duration - 0.05));
      }

      drawVideoFrameToCanvas();
      reportProgress(1, 1);
    };

    const setupScrollTrigger = () => {
      if (hasCleanedUp || triggerRef.current) {
        return;
      }

      video.pause();
      latestProgress = 0;
      lastAppliedTime = 0;
      reportProgress(0, 0);

      triggerRef.current = ScrollTrigger.create({
        id: 'book-opening-scroll-video',
        trigger: section,
        start: 'top top',
        end: () => `+=${config.scrollLength}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          renderProgress(clampProgress(self.progress));
        },
      });

      requestAnimationFrame(() => {
        if (!hasCleanedUp) {
          ScrollTrigger.refresh();
        }
      });
    };

    const setupCanvasFrameCache = async () => {
      if (!useCanvasRenderer) {
        return;
      }

      resizeCanvas(canvas, section, config);
      drawVideoFrameToCanvas();

      const cachedFrames = await buildFrameCache(video, config, () => hasCleanedUp);

      if (hasCleanedUp) {
        closeFrameCache(cachedFrames);
        return;
      }

      frames.push(...cachedFrames);
      isFrameCacheReady = frames.length > 0;
      renderFrameAtProgress(latestProgress);
    };

    const setupAfterMetadata = () => {
      if (useCanvasRenderer) {
        resizeObserver = new ResizeObserver(() => {
          resizeCanvas(canvas, section, config);
          renderFrameAtProgress(latestProgress);
        });
        resizeObserver.observe(section);
      }

      if (reducedMotionQuery.matches) {
        setupReducedMotionState();
        return;
      }

      setupScrollTrigger();
      setupCanvasFrameCache();
    };

    const handleMotionPreferenceChange = () => {
      killTrigger();
      cancelPendingWork();

      if (video.readyState >= 1) {
        setupAfterMetadata();
      }
    };

    if (video.readyState >= 1) {
      setupAfterMetadata();
    } else {
      metadataHandler = setupAfterMetadata;
      video.addEventListener('loadedmetadata', metadataHandler, { once: true });
    }

    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      hasCleanedUp = true;

      if (metadataHandler) {
        video.removeEventListener('loadedmetadata', metadataHandler);
      }

      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
      resizeObserver?.disconnect();
      cancelPendingWork();
      closeFrameCache(frames);
      killTrigger();
    };
  }, [sectionRef, videoRef, canvasRef, config, onProgress]);
}
