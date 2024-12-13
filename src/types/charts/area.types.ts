import { CurveType } from "recharts/types/shape/Curve";

export interface AreaChartData {
  date: string;
  desktop: number;
  mobile: number;
}

export interface AreaChartConfig {
  title: string;
  description: string;
  height: number;
  defaultTimeRange: string;
  timeRanges: Array<{
    label: string;
    value: string;
    days: number;
  }>;
  xAxis: {
    dataKey: string;
    minTickGap: number;
    tickFormatter: (value: string) => string;
  };
  series: Array<{
    key: string;
    label: string;
    color: string;
    type: CurveType;
    stackId?: string;
    gradient?: {
      id: string;
      startOpacity: number;
      endOpacity: number;
    };
  }>;
}
