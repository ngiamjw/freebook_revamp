import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./PastEventsBar.css";
import { introContent, pastEvents } from "../../../data/PastEventsBar.js";
import ShowcaseCard from "./ShowcaseCard.jsx";
import EventModal from "./EventModal.jsx";

gsap.registerPlugin(ScrollTrigger);

export function PastEventsBar() {
  const isMobile = Math.min(window.innerWidth, window.innerHeight) <= 768;
  
  const wrapperRef = useRef();
  const dragDistanceRef = useRef(0);
  const isTouchingRef = useRef(false);
  const buttonRef = useRef(null);
  const isCenteringRef = useRef(false);

  const [activeCard, setActiveCard] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const centerCardAndOpen = (
    cardElement,
    eventData
  ) => {
    const container = wrapperRef.current;

    if (!container || !cardElement) return;

    const maxScroll =
      container.scrollWidth -
      container.clientWidth;

    const idealTarget =
      cardElement.offsetLeft -
      container.clientWidth / 2 +
      cardElement.clientWidth / 2;

    const target = Math.max(
      0,
      Math.min(idealTarget, maxScroll)
    );

    const distance = Math.abs(
      target - container.scrollLeft
    );

    if (distance < 50) {
      setSelectedEvent(eventData);
      return;
    }

    isCenteringRef.current = true;

    gsap.to(container, {
      scrollLeft: target,
      duration: 0.8,
      ease: "expo.out",

      onComplete: () => {
        isCenteringRef.current = false;
        setSelectedEvent(eventData);
      },
    });
  };

  const snapToNearestCard = () => {
    if (isCenteringRef.current) return;
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const intro =
      wrapper.querySelector(".events-intro");

    if (intro) {
      const snapStart =
        intro.offsetWidth * 0.75;

      if (wrapper.scrollLeft < snapStart) {
        return;
      }
    }

    const cards =
      wrapper.querySelectorAll(".card");

    const wrapperCenter =
      wrapper.scrollLeft +
      wrapper.clientWidth / 2;

    let nearestCard = null;
    let nearestDistance = Infinity;

    cards.forEach((card) => {
      const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2;

      const distance = Math.abs(
        wrapperCenter - cardCenter
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestCard = card;
      }
    });

    if (
      !nearestCard ||
      nearestDistance < 20
    ) {
      return;
    }

    gsap.to(wrapper, {
      scrollLeft:
        nearestCard.offsetLeft -
        wrapper.clientWidth / 2 +
        nearestCard.offsetWidth / 2,

      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handlePointerDown = (e) => {
      gsap.killTweensOf(wrapper);

      isDragging = true;
      isTouchingRef.current = true;

      dragDistanceRef.current = 0;

      startX = e.clientX;
      startScrollLeft = wrapper.scrollLeft;

      wrapper.classList.add("dragging");
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;

      const delta =
        e.clientX - startX;

      dragDistanceRef.current =
        Math.abs(delta);

      gsap.set(wrapper, {
        scrollLeft:
          startScrollLeft - delta,
      });
    };

    const handlePointerUp = () => {
      if (!isDragging) return;

      isDragging = false;
      isTouchingRef.current = false;

      wrapper.classList.remove("dragging");

      setTimeout(() => {
        snapToNearestCard();
      }, 150);
    };

    wrapper.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    return () => {
      wrapper.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    };
}, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".past-events-bar",
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".events-intro", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.from(
        ".card",
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      );

      tl.from(
        ".more-events-button",
        {
          opacity: 0,
          y: 10,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    let snapTimeout;

    if (!wrapper) return;

    const handleScroll = () => {
      if (isCenteringRef.current) return;
      clearTimeout(snapTimeout);

      snapTimeout = setTimeout(() => {
        snapToNearestCard();
      }, 350);
    };

    wrapper.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      wrapper.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      selectedEvent ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);
  
  useEffect(() => {
    const container = wrapperRef.current;

    if (!container) return;

    // container.scrollLeft = isMobile
    //   ? container.clientWidth * 0.6
    //   : container.clientWidth * 0.4;
    container.scrollLeft = 0;
  }, []);

  return (
    <section className="past-events-bar" aria-label="Past events highlights">
      <div ref={wrapperRef} className="cards-scroll-region">
        <div className="cards-wrapper">
          <div className = "events-intro">
            <h2>{introContent.title}</h2>
            <p>{introContent.body}</p>
          </div>
          {pastEvents.map((event) => (
            <ShowcaseCard
              key={event.id}
              card={event}
              active={activeCard === event.id}
              onMouseEnter={() => setActiveCard(event.id)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={(card, element) => {
                if (dragDistanceRef.current > 10) {
                  dragDistanceRef.current = 0;
                  return;
                }

                centerCardAndOpen(element, card);
              }}
            />
          ))}
        </div>
      </div>
      
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      <div className="more-events-container">
        <button
          ref={buttonRef}
          className="more-events-button"
          onMouseEnter={() => gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })}
          onMouseLeave={() => gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })}
          onClick={() => (window.location.href = "/past-events")}
        >
          See More
        </button>
      </div>
    </section>
  );
}