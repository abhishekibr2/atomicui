import { CardConfig } from "@/types/card.types";

export const cardConfig1: CardConfig = {
    data: [
        { value: 100 },
        { value: 150 },
        { value: 80 },
        { value: 120 },
        { value: 10 },
        { value: 50 },
        { value: 10 },
        
    ],
    title: "Total Loss",
    amount: 10210.89,
    percentageChange: -90.1,
    config: {
        width: 'w-[300px]',
        chartHeight: 30,
        titleSize: 'sm',
        amountSize: 'lg',
        shadow: 'xl',
        hoverEffect: 'glow',
        chartConfig: {
            stroke: '#FF6961',
            strokeWidth: 2,
            dotRadius: 2,
            type: 'monotone'
        }
    }
}; 