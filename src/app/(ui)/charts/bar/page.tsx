"use client"
import { ReusableBarChart } from "@/components/ReusableUI/Charts/BarGraph/BarGraph";
import { barChartConfig } from "@/config/charts/bar/config";

export default function BarChartPage() {
    return (
        <div className="p-20 pt-10">
            <ReusableBarChart config={barChartConfig} />
        </div>
    );
}