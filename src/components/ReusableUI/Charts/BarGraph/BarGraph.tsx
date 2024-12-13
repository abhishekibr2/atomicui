"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChartConfig, BarChartData } from "@/types/charts/bar.types"

interface ReusableBarChartProps {
    config: BarChartConfig
}

export function ReusableBarChart({ config }: ReusableBarChartProps) {
    const [activeChart, setActiveChart] = React.useState<string>(config.series[0].key)
    const [data, setData] = React.useState<BarChartData[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch('/api/charts/bar')
            const result = await response.json()

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

    const total = React.useMemo(
        () => data.reduce((acc, curr) => ({
            ...acc,
            [curr.desktop]: (acc[curr.desktop] || 0) + curr.desktop,
            [curr.mobile]: (acc[curr.mobile] || 0) + curr.mobile,
        }), {} as Record<string, number>),
        [data]
    )

    if (isLoading) return <Card><CardContent>Loading...</CardContent></Card>
    if (error) return <Card><CardContent>Error: {error}</CardContent></Card>
    if (!data.length) return <Card><CardContent>No data available</CardContent></Card>

    const chartConfig = config.series.reduce((acc, series) => {
        acc[series.key] = {
            label: series.label,
            color: series.color,
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>)

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>{config.title}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                </div>
                <div className="flex">
                    {config.series.map((series) => {
                        const sum = data.reduce((acc, curr) => acc + (curr[series.key] as number), 0);
                        return (
                            <button
                                key={series.key}
                                data-active={activeChart === series.key}
                                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(series.key)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {series.label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {sum.toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto w-full"
                    style={{ height: config.height }}
                >
                    <BarChart
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
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
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    labelFormatter={config.xAxis.tickFormatter}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={chartConfig[activeChart]?.color}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
