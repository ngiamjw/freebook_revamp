import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
import { FiX } from "react-icons/fi";
import defaultImage from "/src/pictures/logo_white_bg.jpg"

import "./EventModal.css";

export default function EventModal({
  event,
  onClose,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useLayoutEffect(() => {
    if (!event || !modalRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      ).fromTo(
        closeButtonRef.current,
        {
          scale: 0.6,
          rotation: 90,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.1,
          ease: "back.out(2)",
        },
        "-=0.15"
      );
    });

    return () => ctx.revert();
  }, [event]);

  const handleButtonEnter = () => {
    gsap.to(closeButtonRef.current, {
      scale: 1.2,
      rotation: 90,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = () => {
    gsap.to(closeButtonRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  if (!event) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="close-button"
          onClick={onClose}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
        >
          <FiX />
        </button>
        
        <img
          src={event.image || defaultImage}
          alt={event.title}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
          className="modal-image"
        />

        <div className="modal-content">
          <h2>{event.title}</h2>

          <p>{event.description}</p>

          {event.tags && (
            <div className="modal-tags">
              {event.tags.map((tag) => (
                <span key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}