export interface DropdownItem {
    title: string;
    href: string;
    description?: string;
}

export interface DropdownSection {
    title: string;
    href?: string;
    items: DropdownItem[];
}

export interface DropdownStyles {
    // Menu styles
    menu?: string;
    menuList?: string;
    menuItem?: string;
    
    // Trigger styles
    trigger?: string;
    triggerActive?: string;
    triggerInactive?: string;
    
    // Content/Dropdown styles
    content?: string;
    contentWrapper?: string;
    contentList?: string;
    
    // Item styles
    item?: string;
    itemHover?: string;
    itemActive?: string;
    itemTitle?: string;
    itemTitleHover?: string;
    itemDescription?: string;
    itemDescriptionHover?: string;
    
    // Brand styles
    brandWrapper?: string;
    logo?: string;
    websiteTitle?: string;
    websiteTitleHover?: string;
    websiteUrl?: string;
    // Animation styles
    menuAnimation?: string;
    contentAnimation?: string;
    itemAnimation?: string;
    
    // Divider/Separator styles
    divider?: string;
    separator?: string;
    
    // Container styles
    container?: string;
    innerWrapper?: string;
}

export interface BrandConfig {
    logo?: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
    title?: string;
    websiteUrl?: string;
}

export interface DropdownConfig {
    brand?: BrandConfig;
    sections: DropdownSection[];
    styles?: DropdownStyles;
    layout?: {
        gridCols?: 'one' | 'two' | 'three';
        contentWidth?: 'sm' | 'md' | 'lg';
        showDescriptions?: boolean;
    };
}

export interface DropdownProps {
    config: DropdownConfig;
    className?: string;
} 