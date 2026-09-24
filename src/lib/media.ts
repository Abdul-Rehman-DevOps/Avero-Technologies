/**
 * Curated royalty-free imagery (Unsplash) for Avero marketing surfaces.
 * Style refs: enterprise tech photography — not copied from any brand assets.
 */
export const media = {
  hero: {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
    alt: "Earth from orbit with city lights — global systems at scale",
  },
  engineering: {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    alt: "Circuit board close-up — precision engineering",
  },
  cloud: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    alt: "Data center corridor — cloud infrastructure",
  },
  team: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    alt: "Engineering team collaborating around a table",
  },
  office: {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    alt: "Contemporary office with glass and warm light",
  },
  delivery: {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "Laptop and analytics workspace for product delivery",
  },
  security: {
    src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    alt: "Code on a dark screen — application security work",
  },
  data: {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    alt: "Analytics dashboard on a monitor",
  },
  ai: {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    alt: "Robotics and intelligent systems lab",
  },
  careers: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
    alt: "Professionals in a meeting discussing plans",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "City skyline with modern towers",
  },
} as const;

export type MediaKey = keyof typeof media;
