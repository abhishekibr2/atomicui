import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AccordionConfig } from "@/types/accordian.types"
import { defaultAccordionConfig } from "@/config/Accordion/config"

interface ReusableAccordionProps {
  config?: AccordionConfig
}

export function ReusableAccordion({ config = defaultAccordionConfig }: ReusableAccordionProps) {
  const accordionProps = {
    className: config.className,
    ...(config.type === "single" ? {
      type: "single" as const,
      collapsible: config.collapsible,
      defaultValue: config.defaultValue as string,
    } : {
      type: "multiple" as const,
      defaultValue: config.defaultValue as string[],
    })
  };

  return (
    <Accordion {...accordionProps}>
      {config.items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
