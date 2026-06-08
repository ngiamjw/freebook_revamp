import { useEffect, useRef } from "react";
import gsap from "gsap";
import defaultImage from "/src/pictures/logo_white_bg.jpg"

export default function ShowcaseCard({
  card,
  active,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    gsap.killTweensOf(cardRef.current);
    gsap.killTweensOf(imageRef.current);

    gsap.to(cardRef.current, {
      y: active ? -10 : 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: active ? 1.08 : 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [active]);

  return (
    <div
      ref={cardRef}
      className="card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => onClick(card, e.currentTarget)}
    >
      <div className="image-wrapper">
        <img
          ref={imageRef}
          src={card.image || defaultImage}
          alt={card.title}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
          draggable="false"
          className="card-image"
        />

        <h2 className="overlay-title">
          {card.title}
        </h2>
      </div>
    </div>
  );
}