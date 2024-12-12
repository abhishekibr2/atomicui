export interface TabContent {
    title: string;
    value: string;
    content: {
        header?: {
            title?: string;
            description?: string;
        };
        fields?: TabField[];
        footer?: {
            buttons?: TabButton[];
        };
    };
}

export interface TabField {
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    id: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
}

export interface TabButton {
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    onClick?: () => void;
}

export interface TabMotionVariants {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
}

export interface TabStyles {
    container?: string;
    tabs?: string;
    tabsList?: string;
    trigger?: string;
    triggerActive?: string;
    content?: string;
    card?: string;
    cardHeader?: string;
    cardTitle?: string;
    cardDescription?: string;
    cardContent?: string;
    field?: string;
    label?: string;
    input?: string;
    cardFooter?: string;
    button?: string;
    motionVariants?: {
        container?: TabMotionVariants;
        tab?: TabMotionVariants;
        content?: TabMotionVariants;
        field?: TabMotionVariants;
        header?: TabMotionVariants;
        footer?: TabMotionVariants;
    };
}

export interface TabConfig {
    defaultValue: string;
    tabs: TabContent[];
    styles?: TabStyles;
    width?: string;
}

export interface TabsProps {
    config: TabConfig;
    className?: string;
}
