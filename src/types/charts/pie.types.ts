export interface PieChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export interface PieChartConfig {
  title: string;
  description: string;
  subtitle?: string;
  height: number;
  series: Array<{
    key: string;
    label: string;
    color: string;
    dataKey: string;
  }>;
  tooltip: {
    hideLabel?: boolean;
  };
  footer?: {
    trend?: {
      value: number;
      text: string;
    };
    description?: string;
  };
} 