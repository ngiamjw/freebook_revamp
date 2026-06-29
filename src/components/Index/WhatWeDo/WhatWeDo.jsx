import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhatWeDo.css";
import { sections } from "../../../data/WhatWeDo.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * WhatWeDo — Col Raiser-style wipe scroller.
 *
 * Layout (mirrors the original site):
 *   • LEFT half: sticky text panels — one per section, fade-swapped
 *   • RIGHT half: sticky image panels — wipe upward as you scroll
 *
 * Scroll budget: 1 extra screen to enter + (n-1) screens for transitions.
 * Total outer height = n × 100vh  →  exactly right, no dead space.
 */
export function WhatWeDo() {
  const outerRef  = useRef(null);
  const textsRef  = useRef([]);
  const imagesRef = useRef([]);
  const total = sections.length;

  useEffect(() => {
    const outer  = outerRef.current;
    const texts  = textsRef.current;
    const images = imagesRef.current;

    /* ── Initial state ──────────────────────────────────────────────── */
    texts.forEach((el, i) => {
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
    });
    images.forEach((el, i) => {
      gsap.set(el, { y: i === 0 ? "0%" : "100%", zIndex: i });
    });

    /* ── One ScrollTrigger per inter-panel transition ───────────────── */
    // Outer block is `total` screens tall.
    // • Screen 0        : first panel fully visible, nothing moving yet.
    // • Screen 1…n-1   : each wipe. 1 screen = 1 transition.
    // start/end use pixel offsets from the top of the outer element.

    const VH = window.innerHeight;
    const triggers = [];

    for (let i = 0; i < total - 1; i++) {
      const nextImg  = images[i + 1];
      const currText = texts[i];
      const nextText = texts[i + 1];

      const st = ScrollTrigger.create({
        trigger : outer,
        start   : () => `top+=${i * VH}px`,        // start of this transition
        end     : () => `top+=${(i + 1) * VH}px`,  // end of this transition
        scrub   : 1.5,                              // lag = slower, smoother feel
        onUpdate(self) {
          // Image: wipe next panel upward
          gsap.set(nextImg, { y: `${(1 - self.progress) * 100}%` });

          // Text: cross-fade at midpoint
          const p = self.progress;
          gsap.set(currText, { autoAlpha: p < 0.5 ? 1 : 1 - (p - 0.5) * 2 });
          gsap.set(nextText, { autoAlpha: p < 0.5 ? 0 : (p - 0.5) * 2 });
        },
        onLeaveBack() {
          // Snap back cleanly when scrolling backwards past the start
          gsap.set(nextImg,  { y: "100%" });
          gsap.set(currText, { autoAlpha: 1 });
          gsap.set(nextText, { autoAlpha: 0 });
        },
      });

      triggers.push(st);
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", onResize);
    };
  }, [total]);

  return (
    <div
      ref={outerRef}
      className="ws-outer"
      /* total screens = 1 (initial view) + (n-1) transitions */
      style={{ "--ws-count": total }}
    >
      <div className="ws-sticky">

        {/* ── LEFT: text panels (stacked, cross-faded) ── */}
        <div className="ws-left">
          {sections.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => (textsRef.current[i] = el)}
              className="ws-text-panel"
              style={{ color: s.textColor, backgroundColor: s.leftBg, "--accent": s.accentColor }}
            >
              <span className="ws-eyebrow">{s.eyebrow}</span>
              <h2 className="ws-headline">{s.headline}</h2>
              <p className="ws-body">{s.body}</p>
              {s.cta && (
                <a
                  href={s.cta.href} 
                  className="ws-cta"
                  style={{color:s.textColor}}
                  >
                  {s.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── RIGHT: image panels (stacked, wipe-up) ── */}
        <div className="ws-right">
          {sections.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => (imagesRef.current[i] = el)}
              className="ws-image-panel"
              style={{ backgroundColor: s.rightBg }}
            >
              {s.image && (
                <img
                  src={s.image}
                  alt={s.imageAlt ?? ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{objectPostion: s.imagePos ?? "center center"}}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}