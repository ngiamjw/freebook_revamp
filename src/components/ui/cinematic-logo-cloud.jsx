import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/cinematic-logo-cloud-utils/marquee";

gsap.registerPlugin(ScrollTrigger);

export function CinematicLogoCloud({
  clients,
  variant = "grid",
  className,
  eyebrow = "Trusted by teams building the future of AI.",
  description = "From prototype to production, autonomously.",
}) {
  const sectionRef = React.useRef(null);

  // Grid variant: pin the section in the centre of the viewport, then reveal
  // the logos one-by-one as the user scrolls through a scrubbed timeline. Only
  // once every logo is in does the pin release and normal scrolling resume.
  // Because it's scrubbed, scrolling back up rewinds the reveal in reverse.
  React.useEffect(() => {
    if (variant !== "grid") return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const logos = gsap.utils.toArray(".partner-logo");
      if (!logos.length) return;

      // Reduced motion: skip the pin/scrub entirely, just show the logos.
      if (prefersReducedMotion) {
        gsap.set(logos, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(logos, { opacity: 0, y: 30, filter: "blur(12px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Pin the moment the section is centred in the viewport.
          start: "center center",
          // Scroll distance the pinned reveal spans (scales with logo count).
          end: () => `+=${Math.max(700, logos.length * 200)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Lowest pin on the page → lowest refresh priority (the book and
          // problem-statement pins above it are 2 and 1).
          refreshPriority: 0,
        },
      });

      tl.to(logos, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 1,
        stagger: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [variant, clients]);

  const renderClient = (client, size = "lg") => {
    if (client.text) {
      return (
        <span
          className={cn(
            size === "lg"
              ? "text-xl font-bold text-zinc-900 dark:text-white"
              : "text-sm font-semibold text-zinc-700 dark:text-zinc-300",
            client.className,
          )}
        >
          {client.name}
        </span>
      );
    }
    return (
      <img
        src={`https://cdn.simpleicons.org/${client.slug}`}
        alt={client.name}
        className={cn(
          size === "lg" ? "h-6 w-auto" : "h-5 w-auto",
          client.invertDark && "dark:invert",
        )}
        loading="lazy"
      />
    );
  };

  if (variant === "marquee") {
    return (
      <div
        className={cn(
          "w-full bg-zinc-50/50 py-12 md:py-16 dark:bg-zinc-950",
          className,
        )}
      >
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {eyebrow}
        </p>
        <Marquee speed={35}>
          {clients.map((brand) => (
            <div
              key={brand.name}
              className="flex shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 bg-white px-5 py-3 shadow-sm dark:border-white/8 dark:bg-zinc-900"
            >
              {renderClient(brand, "sm")}
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  if (variant === "marquee-named") {
    return (
      <div
        className={cn(
          "w-full bg-zinc-50/50 py-12 md:py-16 dark:bg-zinc-950",
          className,
        )}
      >
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {eyebrow}
        </p>
        <Marquee speed={40}>
          {clients.map((brand) => (
            <div
              key={brand.name}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-white px-4 py-2.5 shadow-sm dark:border-white/8 dark:bg-zinc-900"
            >
              {brand.slug && (
                <img
                  src={`https://cdn.simpleicons.org/${brand.slug}`}
                  alt={brand.name}
                  className={cn(
                    "h-4 w-4 shrink-0",
                    brand.invertDark && "dark:invert",
                  )}
                  loading="lazy"
                />
              )}
              <span
                className={cn(
                  "text-sm text-zinc-800 dark:text-zinc-200",
                  brand.nameClassName,
                )}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cn(
        "flex min-h-screen w-full items-center bg-zinc-50/50 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
          {eyebrow}
        </p>
        {description && (
          <p className="mt-2 text-sm text-zinc-500">{description}</p>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-12">
          {clients.map((brand) => (
            <div
              key={brand.name}
              className="partner-logo flex min-w-[6.25rem] items-center justify-center px-2 sm:min-w-[7.5rem]"
            >
              {renderClient(brand)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CinematicLogoCloud;
