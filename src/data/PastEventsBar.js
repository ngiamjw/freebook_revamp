// src/data/PastEventsBar.js

export const introContent = {
  title: "Past Events",
  body: "See our past events and collaborations"
};

export const pastEvents = [
  {
    id: 1,

    title: "Forest",

    subtitle: "Explore ancient woodland trails",

    description:
      "Discover towering trees, hidden waterfalls, winding paths, and thriving ecosystems. Perfect for hiking, photography, and immersive outdoor experiences.",

    accent: "#4CAF50",

    image: "https://as2.ftcdn.net/v2/jpg/01/18/16/41/1000_F_118164196_tftf82Hk1wIFgJ1RbAKDBo0r1XQJn2MW.jpg",

    stats: {
      locations: "128 Trails",
      duration: "2–6 Hours",
      difficulty: "Moderate"
    }
  },

  {
    id: 2,

    title: "Ocean",

    subtitle: "Dive into endless blue horizons",

    description:
      "Experience crystal-clear waters, coral reefs, marine wildlife, and unforgettable coastal adventures ranging from snorkeling to deep-sea exploration.",

    accent: "#2196F3",

    image: "https://as2.ftcdn.net/v2/jpg/18/35/98/57/1000_F_1835985722_JOxXSuSilxlF8ibQdqZpZ7H9D3XzplkI.jpg",

    stats: {
      locations: "47 Dive Sites",
      duration: "1–4 Days",
      difficulty: "Easy"
    }
  },

  {
    id: 3,

    title: "Mountain",

    subtitle: "Reach new heights",

    description:
      "Climb dramatic peaks, traverse scenic ridges, and experience breathtaking panoramic views across some of the world's most impressive landscapes.",

    accent: "#795548",

    // image: "https://placehold.co/200x300",

    stats: {
      locations: "73 Peaks",
      duration: "4–12 Hours",
      difficulty: "Advanced"
    }
  },

  {
    id: 4,

    title: "Desert",

    subtitle: "Endless dunes and golden horizons",

    description:
      "Explore vast open landscapes, dramatic sunsets, starlit skies, and unique ecosystems shaped by some of the harshest climates on Earth.",

    accent: "#FF9800",

    // image: "https://placehold.co/200x300",

    stats: {
      locations: "35 Routes",
      duration: "1–3 Days",
      difficulty: "Moderate"
    }
  },

  {
    id: 5,

    title: "Jungle",

    subtitle: "Wild adventures await",

    description:
      "Navigate dense rainforests, discover hidden wildlife, encounter rare plant species, and uncover remote locations few travelers ever see.",

    accent: "#2E7D32",

    image: "https://placehold.co/200x300",

    stats: {
      locations: "52 Expeditions",
      duration: "2–5 Days",
      difficulty: "Challenging"
    }
  },
  {
    id: 6,
    title: "City",
    subtitle: "Urban exploration and culture",
    description: "Discover vibrant cityscapes, iconic landmarks, diverse cultures, and unforgettable experiences in some of the world's most dynamic urban centers.",
    accent: "#9C27B0",
    image: "https://placehold.co/200x300",
  },
  {
    id: 7,
    title: "Cultural",
    subtitle: "Immersive cultural experiences",
    description: "Engage with rich traditions, vibrant festivals, and unique customs from around the world through unforgettable cultural experiences.",
    accent: "#E91E63",
    // image: "https://placehold.co/200x300",
  },{
    id: 8,
    title: "Adventure",
    subtitle: "Thrilling outdoor activities",
    description: "Experience the ultimate adrenaline rush with unforgettable outdoor adventures that push your limits and create lasting memories.",
    accent: "#FF5722",
    image: "https://placehold.co/200x300",
  }
];

// Infinite carousel source
export const loopedCards = [
  ...pastEvents,
  ...pastEvents,
  ...pastEvents
];