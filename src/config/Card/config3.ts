import { CardConfig } from "@/types/card.types";


export const cardConfig3: CardConfig = {
    data: [
        { value: 1200 },
        { value: 980 },
        { value: 1500 },
        { value: 2100 },
        { value: 1800 },
        { value: 2500 },
        { value: 3200 },
        { value: 2800 },
        { value: 3500 },
        { value: 2500 },
        { value: 3200 },
        { value: 2800 },
        { value: 3500 },
    ],
    title: "Total Revenue",
    amount: 3500,
    percentageChange: 25,
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