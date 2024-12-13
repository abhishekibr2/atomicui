import { AreaChartConfig } from "@/types/charts/area.types"

const formatDate = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export const areaChartConfig: AreaChartConfig = {
  title: "Area Chart",
  description: "Showing desktop vs mobile usage",
  height: 400,
  defaultTimeRange: "30d",
  timeRanges: [
    { label: "7 days", value: "7d", days: 7 },
    { label: "30 days", value: "30d", days: 30 },
    { label: "90 days", value: "90d", days: 90 },
  ],
  xAxis: {
    dataKey: "date",
    minTickGap: 5,
    tickFormatter: (value: string) => new Date(value).toLocaleDateString(),
  },
  series: [
    {
      key: "desktop",
      label: "Desktop",
      color: "#0ea5e9",
      type: "monotone",
      gradient: {
        id: "desktop",
        startOpacity: 0.5,
        endOpacity: 0,
      },
    },
    {
      key: "mobile",
      label: "Mobile",
      color: "#8b5cf6",
      type: "monotone",
      gradient: {
        id: "mobile",
        startOpacity: 0.5,
        endOpacity: 0,
      },
    },
  ],
}
