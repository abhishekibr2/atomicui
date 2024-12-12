import { DropdownConfig } from "@/types/dropdown.types";

export const dropdownConfig: DropdownConfig = {
    brand: {
        logo: {
            src: "/logo.png",
            alt: "Company Logo",
            width: 40,
            height: 40
        },
        title: "Your Company",
        websiteUrl: "/"
    },
    sections: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Introduction",
                    href: "/docs",
                    description: "Re-usable components built using Radix UI and Tailwind CSS."
                },
                {
                    title: "Installation",
                    href: "/docs/installation",
                    description: "How to install dependencies and structure your app."
                },
                {
                    title: "Typography",
                    href: "/docs/primitives/typography",
                    description: "Styles for headings, paragraphs, lists...etc"
                }
            ]
        },
        {
            title: "Components",
            items: [
                {
                    title: "Alert Dialog",
                    href: "/docs/primitives/alert-dialog",
                    description: "A modal dialog that interrupts the user with important content and expects a response."
                },
                {
                    title: "Hover Card",
                    href: "/docs/primitives/hover-card",
                    description: "For sighted users to preview content available behind a link."
                },
                {
                    title: "Progress",
                    href: "/docs/primitives/progress",
                    description: "Displays an indicator showing the completion progress of a task."
                }
            ]
        },
        {
            title: "Examples",
            items: [
                {
                    title: "Card",
                    href: "/card",
                    description: "Example card layout with common components and features."
                },
                {
                    title: "DropDown",
                    href: "/drop-down",
                    description: "Example drop down layout with common components and features."
                },
                {
                    title: "Tabs",
                    href: "/tabs",
                    description: "Example tabs layout with common components and features."
                }
            ]
        },
        {
            title: "Tables",
            items: [
                {
                    title: "Invoice Table",
                    href: "/table/invoice",
                    description: "Manage your invoices and their status."
                },
                {
                    title: "User Table",
                    href: "/table/users",
                    description: "Manage your property users and their permissions."
                },
                {
                    title: "Property Table",
                    href: "/table/property",
                    description: "Manage your property."
                }
            ]
        },
        {
            title:"profile",
            
            items:[]
        }
    ],
    layout: {
        gridCols: 'two',
        contentWidth: 'lg',
        showDescriptions: true
    },
    styles: {
        // Container styles
        container: "w-full max-w-screen-xl mx-auto px-4",
        innerWrapper: "flex items-center justify-between",
        
        // Menu styles
        menu: "relative px-4 py-2",
        menuList: "flex items-between space-x-4",
        menuItem: "relative",
        
        // Trigger styles
        trigger: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-medium",
        triggerActive: "text-gray-900 bg-gray-100 rounded-md",
        triggerInactive: "text-gray-700",
        
        // Content/Dropdown styles
        content: "bg-white rounded-lg shadow-lg border border-gray-200",
        contentWrapper: "p-4",
        contentList: "grid gap-3",
        
        // Item styles
        item: "flex flex-col space-y-1 rounded-md p-3 hover:bg-gray-50 transition-colors",
        itemHover: "bg-gray-50",
        itemActive: "bg-gray-100",
        itemTitle: "text-sm font-medium text-gray-900 font-bold",
        itemTitleHover: "text-gray-900",
        itemDescription: "text-sm text-gray-500",
        itemDescriptionHover: "text-gray-700",
        
        // Brand styles
        brandWrapper: "flex items-center space-x-2",
        logo: "w-8 h-8 object-contain",
        websiteTitle: "text-lg font-semibold text-gray-900",
        websiteTitleHover: "text-gray-700",
        
        // Animation styles
        menuAnimation: "transition-all duration-200 ease-in-out",
        contentAnimation: "",
        itemAnimation: "",
        
        // Divider/Separator styles
        divider: "h-px bg-gray-200 my-2",
        separator: "w-px h-4 bg-gray-200 mx-2"
    }
}; 