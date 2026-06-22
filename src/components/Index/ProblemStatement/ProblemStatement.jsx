import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ProblemStatement.css";

gsap.registerPlugin(ScrollTrigger);

const oldBookImg = "https://freerangestock.com/sample/96601/stack-of-old-books-on-wooden-table.jpg";
const landfillImg = "https://images.unsplash.com/photo-1641895862407-d4e23bccc950?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const childrenReadingImg = "https://images.pexels.com/photos/10643450/pexels-photo-10643450.jpeg";

const QUOTES = [
  {
    line1: "Books are abundant.",
    line2: "Access is not.",
  },
  {
    line1: "Every book saved",
    line2: "is a future changed.",
  },
];

export function ProblemStatement() {
  const sectionRef   = useRef(null);
  const wipeRef      = useRef(null);
  const wipeLineRef  = useRef(null);
  const cardRef      = useRef(null);
  const labelRef     = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── entrance ── */
      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
        .from(".ps-label",       { opacity: 0, y: 30, duration: 0.6 })
        .from(".ps-title",       { opacity: 0, y: 50, duration: 0.7 }, "-=0.2")
        .from(".ps-description", { opacity: 0, y: 30, duration: 0.6 }, "-=0.2")
        .from(".ps-btn",         { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

      /* ── pinned vertical wipe ── */
      const visualEl = sectionRef.current?.querySelector(".ps-visual");
      let currentQuote = 0;

      const wipeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      wipeTl.to({}, {
        duration: 1,
        ease: "none",
        onUpdate() {
          // progress 0 → 1
          const prog = this.progress();
          // --wipe: 100% → 0% (top inset shrinks downward)
          const pct = (1 - prog) * 100;
          const val = `${pct.toFixed(2)}%`;

          // inset bottom → image reveals from top downward as bottom shrinks
          if (wipeRef.current)     wipeRef.current.style.clipPath = `inset(0 0 ${val} 0)`;
          if (wipeLineRef.current) wipeLineRef.current.style.top   = `${(prog * 100).toFixed(2)}%`;

          swapQuote(prog);
        },
      });

      function swapQuote(prog) {
        const next = prog >= 0.55 ? 1 : 0;
        if (next === currentQuote) return;
        currentQuote = next;

        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.18,
          onComplete() {
            if (labelRef.current) labelRef.current.textContent = QUOTES[next].label;
            if (line1Ref.current) line1Ref.current.textContent = QUOTES[next].line1;
            if (line2Ref.current) line2Ref.current.textContent = QUOTES[next].line2;
            gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.22 });
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ps-section" ref={sectionRef}>
      <div className="ps-bg" style={{ backgroundImage: `url(${oldBookImg})` }} />
      <div className="ps-bg-overlay" />

      <div className="ps-container">

        {/* LEFT */}
        <div className="ps-content">
          <span className="ps-label">THE PROBLEM</span>

          <h1 className="ps-title">
            Millions of books
            <br />
            go unused.
          </h1>

          <h2 className="ps-subtitle">Potential goes unread.</h2>

          <p className="ps-description">
            Every year, countless books are discarded, donated without reaching
            those who need them, or left to gather dust on shelves. Meanwhile,
            students, educators and readers struggle to access affordable
            learning materials.
          </p>

          <button className="ps-btn">Be Part of the Solution</button>
        </div>

        {/* RIGHT */}
        <div className="ps-visual">
          <div className="ps-img ps-img--base">
            <img src={landfillImg} alt="Books discarded as waste" />
          </div>

          <div className="ps-img ps-img--wipe" ref={wipeRef}>
            <img src={childrenReadingImg} alt="Children reading books" />
          </div>

          {/* horizontal wipe line */}
          <div className="ps-wipe-line" ref={wipeLineRef} />

          {/* minimal quote card */}
          <div className="ps-quote-card" ref={cardRef} data-quote="0">
            <p className="ps-card-line" ref={line1Ref}>{QUOTES[0].line1}</p>
            <p className="ps-card-line ps-card-line--muted" ref={line2Ref}>{QUOTES[0].line2}</p>
          </div>

          <div className="ps-scroll-hint">
            <span />
            scroll
          </div>
        </div>

      </div>
    </section>
  );
}