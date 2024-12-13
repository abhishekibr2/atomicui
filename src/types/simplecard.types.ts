export interface LinkType {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export interface SimpleCardConfig {
  heading?: {
    text: string;
    className?: string;
    show?: boolean;
  };
  image?: {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    priority?: boolean;
    show?: boolean;
    width?: number;
    height?: number;
    objectFit?: 'contain' | 'cover' | 'fill';
  };
  description?: {
    text: string;
    className?: string;
    show?: boolean;
  };
  links?: {
    items: LinkType[];
    show?: boolean;
  };
  cardStyles?: {
    container?: string;
    linksContainer?: string;
    header?: string;
    content?: string;
    footer?: string;
  };
}
