import * as React from "react";
import { cn } from "@/lib/utils";
import "./marquee.css";

/**
 * Seamless infinite marquee. Renders two identical groups and scrolls the track
 * by -50%, so the second group lands exactly where the first started.
 *
 * @param {object}   props
 * @param {React.ReactNode} props.children     Items to scroll.
 * @param {number}   [props.speed=40]          Pixels per second.
 * @param {boolean}  [props.pauseOnHover=true] Pause the scroll on hover.
 * @param {string}   [props.className]
 */
export function Marquee({ children, speed = 40, pauseOnHover = true, className }) {
  const trackRef = React.useRef(null);
  const [duration, setDuration] = React.useState(20);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const update = () => {
      // The track holds two identical groups, so one group is half the width.
      const singleGroupWidth = track.scrollWidth / 2;
      if (singleGroupWidth > 0) {
        setDuration(singleGroupWidth / speed);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [speed, children]);

  return (
    <div className={cn("marquee group", pauseOnHover && "marquee--pause", className)}>
      <div
        ref={trackRef}
        className="marquee__track"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
