export type CardTitleSize = 'sm' | 'base' | 'lg';
export type CardAmountSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type CardShadow = 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type CardHoverEffect = 'none' | 'lift' | 'scale' | 'glow';
export type ChartType = 'monotone' | 'linear' | 'step';

export interface ChartConfig {
    stroke: string;
    strokeWidth: number;
    dotRadius: number;
    type: ChartType;
}

export interface CardStyles {
    width: string;
    chartHeight: number;
    titleSize: CardTitleSize;
    amountSize: CardAmountSize;
    shadow: CardShadow;
    hoverEffect: CardHoverEffect;
    chartConfig: ChartConfig;
}

export interface CardData {
    value: number;
}

export interface CardConfig {
    data: CardData[];
    title: string;
    amount: number;
    percentageChange: number;
    config: CardStyles;
}

export interface CardProps {
    config: CardConfig;
    className?: string;
} 