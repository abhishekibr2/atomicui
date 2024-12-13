"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AreaChartConfig, AreaChartData } from "@/types/charts/area.types"

interface ReusableAreaChartProps {
  config: AreaChartConfig
}

export function ReusableAreaChart({ config }: ReusableAreaChartProps) {
  const [timeRange, setTimeRange] = React.useState(config.defaultTimeRange)
  const [data, setData] = React.useState<AreaChartData[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Fetching data...')
      
      const response = await fetch('/api/charts/area', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch chart data')
      }
      
      if (result.success && Array.isArray(result.data)) {
        setData(result.data)
      } else {
        throw new Error('Invalid data format received')
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const filteredData = React.useMemo(() => {
    if (!data.length) return []
    
    const selectedRange = config.timeRanges.find((r) => r.value === timeRange)
    if (!selectedRange) return data

    const referenceDate = new Date(data[data.length - 1]?.date)
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - selectedRange.days)

    return data.filter((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })
  }, [data, timeRange, config.timeRanges])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div>Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!data.length) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div>No data available</div>
        </CardContent>
      </Card>
    )
  }

  const chartConfig = config.series.reduce((acc, series) => {
    acc[series.key] = {
      label: series.label,
      color: series.color,
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {config.timeRanges.map((range) => (
              <SelectItem
                key={range.value}
                value={range.value}
                className="rounded-lg"
              >
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full"
          style={{ height: config.height }}
        >
          <AreaChart data={filteredData}>
            <defs>
              {config.series.map((series) =>
                series.gradient ? (
                  <linearGradient
                    key={series.gradient.id}
                    id={series.gradient.id}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={series.color}
                      stopOpacity={series.gradient.startOpacity}
                    />
                    <stop
                      offset="95%"
                      stopColor={series.color}
                      stopOpacity={series.gradient.endOpacity}
                    />
                  </linearGradient>
                ) : null
              )}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={config.xAxis.dataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={config.xAxis.minTickGap}
              tickFormatter={config.xAxis.tickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={config.xAxis.tickFormatter}
                  indicator="dot"
                />
              }
            />
            {config.series.map((series) => (
              <Area
                key={series.key}
                dataKey={series.key}
                type={series.type}
                fill={
                  series.gradient ? `url(#${series.gradient.id})` : series.color
                }
                stroke={series.color}
                stackId={series.stackId}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
