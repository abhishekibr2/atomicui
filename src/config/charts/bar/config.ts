import { BarChartConfig } from "@/types/charts/bar.types";

export const barChartConfig: BarChartConfig = {
  title: "Bar Chart - Interactive",
  description: "Showing total visitors for the last 3 months",
  height: 250,
  series: [
    {
      key: "desktop",
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    {
      key: "mobile",
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  ],
  xAxis: {
    dataKey: "date",
    minTickGap: 32,
    tickFormatter: (value: string) => {
      const date = new Date(value)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    },
  },
};
