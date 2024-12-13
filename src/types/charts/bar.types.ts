
export interface BarChartData {
  date: string;
  desktop: number;
  mobile: number;
}

export interface BarChartConfig {
  title: string;
  description: string;
  height: number;
  series: Array<{
    key: keyof BarChartData;
    label: string;
    color: string;
  }>;
  xAxis: {
    dataKey: string;
    minTickGap: number;
    tickFormatter: (value: string) => string;
  };
}
