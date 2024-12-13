"use client"
import { ReusableAreaChart } from "@/components/ReusableUI/Charts/AreaChart/AreaChart";
import { areaChartConfig } from "@/config/charts/area/config";
import { useEffect } from "react";

export default function AreaChartPage() {
    useEffect(() => {
        console.log("Area Chart Page mounted");
    }, []);

    return (
        <div className="p-20 pt-10">
            <ReusableAreaChart config={areaChartConfig} />
        </div>
    );
}