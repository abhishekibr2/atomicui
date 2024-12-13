import { SimpleCardConfig } from "@/types/simplecard.types";

export const simpleCardConfig3: SimpleCardConfig = {
  heading: {
    text: "Beautiful Landscapes",
    className: "text-center",
    show: true,
  },
  image: {
    src: "/cards/3.jpeg",
    alt: "Beautiful mountain landscape",
    className: "rounded-md",
    containerClassName: "relative",
    priority: true,
    show: true,
    width: 280,
    height: 200,
    objectFit: "cover",
  },
  description: {
    text: "Discover the breathtaking beauty of nature with our collection.",
    className: "text-center",
    show: true,
  },
  links: {
    show: true,
    items: [
      {
        text: "View Gallery",
        url: "/gallery",
        variant: "primary",
        className: "font-medium",
      },
      {
        text: "Learn More",
        url: "/about",
        variant: "secondary",
        className: "font-medium",
      },
    ],
  },
  cardStyles: {
    container: "shadow-md",
    header: "text-center",
    content: "px-3",
    footer: "justify-center",
  },
};
