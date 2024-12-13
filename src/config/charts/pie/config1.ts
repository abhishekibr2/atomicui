import { PieChartConfig } from "@/types/charts/pie.types";

export const pieChartConfig1: PieChartConfig = {
  title: "Pie Chart",
  description: "January - June 2024",
  height: 250,
  series: [
    {
      key: "chrome",
      label: "Chrome",
      color: "hsl(var(--chart-1))",
      dataKey: "visitors",
    },
    {
      key: "safari",
      label: "Safari",
      color: "hsl(var(--chart-2))",
      dataKey: "visitors",
    },
    {
      key: "firefox",
      label: "Firefox",
      color: "hsl(var(--chart-3))",
      dataKey: "visitors",
    },
    {
      key: "edge",
      label: "Edge",
      color: "hsl(var(--chart-4))",
      dataKey: "visitors",
    },
    {
      key: "other",
      label: "Other",
      color: "hsl(var(--chart-5))",
      dataKey: "visitors",
    },
  ],
  tooltip: {
    hideLabel: true,
  },
  footer: {
    trend: {
      value: 5.2,
      text: "this month",
    },
    description: "Displaying visitor distribution from January to June 2024",
  },
};
