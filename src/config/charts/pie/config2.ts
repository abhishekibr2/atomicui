import { PieChartConfig } from "@/types/charts/pie.types";

export const pieChartConfig2: PieChartConfig = {
  title: "Pie Chart",
  description: "January - June 2024",
  height: 250,
  series: [
    {
      key: "chrome",
      label: "Chrome",
      color: "#FF6384", // Changed color
      dataKey: "visitors",
    },
    {
      key: "safari",
      label: "Safari",
      color: "#36A2EB", // Changed color
      dataKey: "visitors",
    },
    {
      key: "firefox",
      label: "Firefox",
      color: "#FFCE56", // Changed color
      dataKey: "visitors",
    },
    {
      key: "edge",
      label: "Edge",
      color: "#4BC0C0", // Changed color
      dataKey: "visitors",
    },
    {
      key: "other",
      label: "Other",
      color: "#9966FF", // Changed color
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
    description: "Showing total visitors for the last 6 months",
  },
};
