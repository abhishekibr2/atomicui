import { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  trigger: string | ReactNode;
  content: string | ReactNode;
}

export interface AccordionConfig {
  type: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
  items: AccordionItem[];
}
