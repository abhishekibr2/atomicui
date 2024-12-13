import { ReusableAccordion } from "@/components/ReusableUI/Accordion/Accodian";
import { defaultAccordionConfig, multipleAccordionConfig } from "@/config/Accordion/config";

export default function AccordionPage() {
  return (
    <div className="p-4 space-y-8  flex-row justify-between px-20 py-10">
      <div>
        <h2 className="text-lg font-bold mb-4">Single Accordion</h2>
        <ReusableAccordion config={defaultAccordionConfig} />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Multiple Accordion</h2>
        <ReusableAccordion config={multipleAccordionConfig} />
      </div>
    </div>
  )
}