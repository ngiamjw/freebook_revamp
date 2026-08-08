import { useEffect, useRef } from "react";
import gsap from "gsap";
import defaultImage from "/src/pictures/logo_white_bg.jpg";

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
      y: active ? -6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: active ? 1.05 : 1,
      duration: 0.5,
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
      <div className="card-image-frame">
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
      </div>

      <div className="card-meta">
        {card.date && <span className="card-date">{card.date}</span>}
        <h3 className="card-title">{card.title}</h3>
      </div>
    </div>
  );
}
