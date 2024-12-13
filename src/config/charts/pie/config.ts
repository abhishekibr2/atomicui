import { PieChartConfig } from "@/types/charts/pie.types";

export const pieChartConfig3: PieChartConfig = {
  title: "Pie Chart",
  description: "January - June 2024",
  height: 250,
  series: [
    {
      key: "chrome",
      label: "Chrome",
      color: "#FF6F61", // Vibrant coral
      dataKey: "visitors",
    },
    {
      key: "safari",
      label: "Safari",
      color: "#6B5B93", // Elegant purple
      dataKey: "visitors",
    },
    {
      key: "firefox",
      label: "Firefox",
      color: "#88B04B", // Fresh green
      dataKey: "visitors",
    },
    {
      key: "edge",
      label: "Edge",
      color: "#F7CAC9", // Soft pink
      dataKey: "visitors",
    },
    {
      key: "other",
      label: "Other",
      color: "#92A8D1", // Calm blue
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
