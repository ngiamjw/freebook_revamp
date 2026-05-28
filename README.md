# Freebook Revamp

React + Vite foundation for a future picture-book style scroll experience.

The current phase implements a scroll-controlled book-opening animation using GSAP ScrollTrigger. The visible animation is rendered through a canvas frame cache for smoother scroll scrubbing, with the source video stored at `public/videos/book-opening.mp4`.

## Requirements

- Node.js 20.18 or newer
- npm

This project uses Vite 6.x because the installed local Node version was below the requirement for the latest Vite release.

## Setup

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Open the URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

If that port is already busy, Vite will print a different local URL.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Video Asset

The app expects the book-opening video here:

```text
public/videos/book-opening.mp4
```

To replace the animation, overwrite that file with a new MP4 using the same filename. For best scroll smoothness, use a short 60fps H.264 MP4 with frequent keyframes.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  styles/
    globals.css
    variables.css
  components/
    BookExperience/
      BookExperience.jsx
      BookExperience.css
      animationConfig.js
      useScrollVideo.js
    Sections/
      NextSection.jsx
      NextSection.css
```

## Future Extension Points

1. Overlay picture-book pages: add markup inside `BookExperience.jsx` in `.book-experience__stage`, then add phase ranges in `animationConfig.js`.
2. CSS photos: add photo elements in `BookExperience.jsx` and style them in `BookExperience.css`.
3. Zoom into target photo: add zoom phase ranges in `animationConfig.js`, then drive transform values from scroll progress in `BookExperience.jsx`.
4. Transition to next section: add transition phase config in `animationConfig.js` and coordinate the end of `BookExperience` with `NextSection`.

## Notes

- Debug UI can be enabled from `BOOK_ANIMATION_CONFIG.debug` in `src/components/BookExperience/animationConfig.js`.
- Scroll length is controlled by `BOOK_ANIMATION_CONFIG.scrollLength`.
- The canvas renderer settings are also in `animationConfig.js`.
