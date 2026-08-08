import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhatWeDo.css";
import { sections } from "../../../data/WhatWeDo.js";

gsap.registerPlugin(ScrollTrigger);

// Scroll-feel knobs, in viewport-heights of scroll:
//   HOLD — each tile sits full-screen + ALONE for this much scroll before the
//          wipe starts (short, so it doesn't feel dead; the image parallaxes
//          during it so scrolling stays responsive)
//   WIPE — the tile→tile wipe is stretched over this much scroll (slow, gradual)
const HOLD = 0.4;
const WIPE = 1.6;
const SEGMENT = HOLD + WIPE; // scroll a tile owns before the next takes over

/**
 * WhatWeDo — Col Raiser-style wipe scroller.
 *
 * Each SECTION is a full-width tile (left colour panel + right image) over a
 * blurred colour-washed copy of the same photo. Tiles are stacked; the incoming
 * tile is revealed by a clip-path seam wiping up from the bottom.
 *
 * Per tile: a short HOLD (tile alone, image gently pans) then a long slow WIPE.
 */
export function WhatWeDo() {
  const outerRef = useRef(null);
  const tilesRef = useRef([]);
  const fgRef = useRef([]); // foreground images, for parallax
  const total = sections.length;

  useEffect(() => {
    const outer = outerRef.current;
    const tiles = tilesRef.current;
    const fg = fgRef.current;

    /* ── Initial state: first tile visible, the rest fully clipped away ── */
    tiles.forEach((el, i) => {
      gsap.set(el, {
        clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
        zIndex: i, // later tiles reveal ON TOP of earlier ones
      });
    });
    fg.forEach((img) => gsap.set(img, { scale: 1.06, yPercent: -2 }));

    const VH = window.innerHeight;
    const steps = total - 1;                       // number of transitions
    const totalVH = steps * SEGMENT + HOLD;        // whole scroll distance, in VH

    const st = ScrollTrigger.create({
      trigger : outer,
      start   : "top top",
      end     : () => `+=${totalVH * VH}px`,
      scrub   : 0.8,
      onUpdate(self) {
        const scrolled = self.progress * totalVH;  // 0 … totalVH (in VH units)

        // Wipes: each tile holds for HOLD, then reveals the next over WIPE.
        for (let i = 0; i < steps; i++) {
          const local = gsap.utils.clamp(
            0, 1, (scrolled - i * SEGMENT - HOLD) / WIPE,
          );
          gsap.set(tiles[i + 1], {
            clipPath: `inset(${(1 - local) * 100}% 0 0 0)`,
          });
        }

        // Parallax: gently pan each tile's image across its own segment, so
        // scrolling during the hold still produces motion (never feels dead).
        for (let j = 0; j < total; j++) {
          const t = gsap.utils.clamp(0, 1, (scrolled - j * SEGMENT) / SEGMENT);
          gsap.set(fg[j], { yPercent: -2 + t * 4 }); // -2% → +2%
        }
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [total]);

  return (
    <div
      ref={outerRef}
      className="ws-outer"
      /* height must match the ScrollTrigger distance: steps×SEGMENT + HOLD + 1 viewport */
      style={{ "--ws-count": (total - 1) * SEGMENT + HOLD + 1 }}
    >
      <div className="ws-sticky">
        {sections.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (tilesRef.current[i] = el)}
            className="ws-tile"
            data-tone={s.tone}
          >
            {/* Full-bleed blurred + colour-washed copy of the photo */}
            <div className="ws-tile-bg" aria-hidden="true">
              <img src={s.image} alt="" />
            </div>

            {/* Foreground: left catalogue entry · right mounted plate */}
            <div
              className={`ws-tile-inner${s.frontispiece ? " ws-frontispiece" : ""}`}
            >
              <div className="ws-left-text">
                {/* Call number + hairline rule — classification, not decoration */}
                <span className="ws-callno">
                  {s.callno}
                  {s.subject && (
                    <span className="ws-subject"> — {s.subject}</span>
                  )}
                </span>
                <span className="ws-rule" aria-hidden="true" />

                <h2 className="ws-headline">{s.headline}</h2>
                <p className="ws-body">{s.body}</p>

                {/* Frontispiece imprint OR entry ledger */}
                {s.imprint && <span className="ws-imprint">{s.imprint}</span>}
                {s.meta && (
                  <dl className="ws-meta">
                    {s.meta.map(([k, v]) => (
                      <div className="ws-meta-row" key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {s.cta &&
                  (s.cta.href.startsWith("/") ? (
                    <Link
                      to={s.cta.href}
                      className="ws-cta"
                      data-dir={s.cta.dir ?? "right"}
                    >
                      {s.cta.label}
                    </Link>
                  ) : (
                    <a
                      href={s.cta.href}
                      className="ws-cta"
                      data-dir={s.cta.dir ?? "right"}
                    >
                      {s.cta.label}
                    </a>
                  ))}
              </div>

              <div className="ws-right-image">
                <figure className="ws-plate">
                  <span className="ws-tape" aria-hidden="true" />
                  <div className="ws-plate-photo">
                    {s.image && (
                      <img
                        ref={(el) => (fgRef.current[i] = el)}
                        src={s.image}
                        alt={s.imageAlt ?? ""}
                        loading={i === 0 ? "eager" : "lazy"}
                        style={{ objectPosition: s.imagePos ?? "center center" }}
                      />
                    )}
                  </div>
                  {s.caption && (
                    <figcaption className="ws-caption">{s.caption}</figcaption>
                  )}
                </figure>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
