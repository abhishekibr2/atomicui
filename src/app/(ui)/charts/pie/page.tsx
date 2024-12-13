"use client"
import { ReusablePieChart } from "@/components/ReusableUI/Charts/PieChart/PieChart"
import { pieChartConfig1 } from "@/config/charts/pie/config1"
import { pieChartConfig2 } from "@/config/charts/pie/config2"
import { pieChartConfig3 } from "@/config/charts/pie/config"

export default function PieChartPage() {
    return (
        <div className="p-20 pt-10 flex gap-10">
            <ReusablePieChart config={pieChartConfig1} />
            <ReusablePieChart config={pieChartConfig2} />
            <ReusablePieChart config={pieChartConfig3} />
        </div>
    )
}
