"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChartConfig, PieChartData } from "@/types/charts/pie.types"

interface ReusablePieChartProps {
    config: PieChartConfig
}

export function ReusablePieChart({ config }: ReusablePieChartProps) {
    const [data, setData] = React.useState<PieChartData[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch('/api/charts/pie')
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

    if (isLoading) return <Card className="flex flex-col" style={{ maxHeight: config.height }}><CardContent style={{ maxHeight: config.height }}>Loading...</CardContent></Card>
    if (error) return <Card className="flex flex-col" style={{ maxHeight: config.height }}><CardContent style={{ maxHeight: config.height }}>Error: {error}</CardContent></Card>
    if (!data.length) return <Card style={{ maxHeight: config.height }}><CardContent style={{ maxHeight: config.height }}>No data available</CardContent></Card>

    const chartConfig = config.series.reduce((acc, series) => {
        acc[series.key] = {
            label: series.label,
            color: series.color,
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>)

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{config.title}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square"
                    style={{ maxHeight: config.height }}
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel={config.tooltip.hideLabel}
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey="visitors"
                            nameKey="browser"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {config.footer && (
                <CardFooter className="flex-col gap-2 text-sm">
                    {config.footer.trend && (
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by {config.footer.trend.value}% {config.footer.trend.text}{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    )}
                    {config.footer.description && (
                        <div className="leading-none text-muted-foreground">
                            {config.footer.description}
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    )
}
