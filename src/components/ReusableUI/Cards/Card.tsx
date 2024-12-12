'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types/card.types";
import { useState } from "react";
import { PopUpCard } from "./sub-components/PopUpCard";

export function ReusableCard({
    config,
    className,
}: CardProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { title, amount, percentageChange, data, config: cardConfig } = config;

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

    const titleSizeClasses = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
    };

    const amountSizeClasses = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
    };

    const shadowClasses = {
        none: '',
        sm: 'shadow-sm hover:shadow-md',
        md: 'shadow-md hover:shadow-lg',
        lg: 'shadow-lg hover:shadow-xl',
        xl: 'shadow-xl hover:shadow-2xl',
    };

    const hoverEffectClasses = {
        none: '',
        lift: 'hover:-translate-y-1',
        scale: 'hover:scale-105',
        glow: 'hover:bg-white/70 hover:border-blue-200/60 hover:ring-2 hover:ring-blue-100',
    };

    return (
        <>
            <Card 
                className={cn(
                    cardConfig.width,
                    shadowClasses[cardConfig.shadow],
                    hoverEffectClasses[cardConfig.hoverEffect],
                    'bg-white/50 backdrop-blur-sm border border-slate-200/60',
                    'transition-all duration-300 ease-in-out',
                    'cursor-pointer',
                    className
                )}
                onClick={() => setIsPopupOpen(true)}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={cn(
                        "font-medium text-muted-foreground group-hover:text-foreground transition-colors",
                        titleSizeClasses[cardConfig.titleSize]
                    )}>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        <div className={cn(
                            "font-bold transition-colors",
                            amountSizeClasses[cardConfig.amountSize]
                        )}>
                            {formattedAmount}
                        </div>
                        <div
                            className={`text-xs ${percentageChange >= 0 ? "text-green-600" : "text-red-600"
                                } transition-colors`}
                        >
                            {percentageChange >= 0 ? "+" : ""}
                            {percentageChange.toFixed(1)}% from last month
                        </div>
                        <div style={{ height: cardConfig.chartHeight }} className="transition-transform duration-300">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <Line
                                        type={cardConfig.chartConfig.type}
                                        dataKey="value"
                                        stroke={cardConfig.chartConfig.stroke}
                                        strokeWidth={cardConfig.chartConfig.strokeWidth}
                                        dot={{ r: cardConfig.chartConfig.dotRadius }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <PopUpCard 
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                config={config}
            />
        </>
    );
}
