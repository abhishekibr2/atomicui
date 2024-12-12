import { CardConfig } from "@/types/card.types";

export const cardConfig2: CardConfig = {
    data: [
        { value: 400 },
        { value: 800 },
        { value: 420 },
        { value: 1210 },
        { value: 800 },
        { value: 450 },
        { value: 2080 },
    ],
    title: "Total Revenue",
    amount: 15231.89,
    percentageChange: 20.1,
    config: {
        width: 'w-[300px]',
        chartHeight: 30,
        titleSize: 'sm',
        amountSize: 'lg',
        shadow: 'xl',
        hoverEffect: 'glow',
        chartConfig: {
            stroke: '#8884d8',
            strokeWidth: 2,
            dotRadius: 2,
            type: 'monotone'
        }
    }
}; 