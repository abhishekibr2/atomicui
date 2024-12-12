import { TabConfig } from "@/types/tabs.types";

export const tabConfig: TabConfig = {
    defaultValue: "account",
    width: "w-[400px]",
    tabs: [
        {
            title: "Account",
            value: "account",
            content: {
                header: {
                    title: "Account",
                    description: "Make changes to your account here. Click save when you're done."
                },
                fields: [
                    {
                        label: "Name",
                        type: "text",
                        id: "name",
                        defaultValue: "Pedro Duarte"
                    },
                    {
                        label: "Username",
                        type: "text",
                        id: "username",
                        defaultValue: "@peduarte"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Save changes",
                            variant: "default"
                        }
                    ]
                }
            }
        },
        {
            title: "Password",
            value: "password",
            content: {
                header: {
                    title: "Password",
                    description: "Change your password here. After saving, you'll be logged out."
                },
                fields: [
                    {
                        label: "Current password",
                        type: "password",
                        id: "current"
                    },
                    {
                        label: "New password",
                        type: "password",
                        id: "new"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Save password",
                            variant: "default"
                        }
                    ]
                }
            }
        }
    ],
    styles: {
        container: "flex items-center justify-center h-screen",
        tabs: "",
        tabsList: "grid w-full grid-cols-2",
        trigger: "",
        content: "",
        card: "",
        cardHeader: "",
        cardTitle: "",
        cardDescription: "",
        cardContent: "space-y-2",
        field: "space-y-1",
        label: "",
        input: "",
        cardFooter: "",
        button: "",
        
        // Motion variants
        motionVariants: {
            container: {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.3 }
            },
            tab: {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                transition: { duration: 0.2 }
            },
            content: {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
                transition: { duration: 0.3 }
            },
            field: {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.1 }
            },
            header: {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 }
            },
            footer: {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 }
            }
        }
    }
};
