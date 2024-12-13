import { AccordionConfig } from "@/types/accordian.types";

export const defaultAccordionConfig: AccordionConfig = {
  type: "single",
  collapsible: true,
  className: "w-full border border-gray-800 rounded-md p-4",
  items: [
    {
      id: "item-1",
      trigger: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "item-2",
      trigger: "Is it styled?",
      content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      id: "item-3",
      trigger: "Is it animated?",
      content: "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ],
};

export const multipleAccordionConfig: AccordionConfig = {
  type: "multiple",
  className: "w-full border border-gray-800 rounded-md p-4",
  items: [...defaultAccordionConfig.items],
};
