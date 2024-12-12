import { TabConfig } from "@/types/tabs.types";

export const settingsConfig: TabConfig = {
    defaultValue: "profile",
    width: "w-[400px]",
    tabs: [
        {
            title: "Profile",
            value: "profile",
            content: {
                header: {
                    title: "Profile Settings",
                    description: "Manage your profile information and preferences."
                },
                fields: [
                    {
                        label: "Display Name",
                        type: "text",
                        id: "displayName",
                        defaultValue: "John Doe"
                    },
                    {
                        label: "Email",
                        type: "email",
                        id: "email",
                        defaultValue: "john@example.com"
                    },
                    {
                        label: "Bio",
                        type: "text",
                        id: "bio",
                        placeholder: "Tell us about yourself"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Update Profile",
                            variant: "default"
                        }
                    ]
                }
            }
        },
        {
            title: "Notifications",
            value: "notifications",
            content: {
                header: {
                    title: "Notification Preferences",
                    description: "Control how you receive notifications."
                },
                fields: [
                    {
                        label: "Email Notifications",
                        type: "email",
                        id: "emailNotif",
                        placeholder: "Enter email for notifications"
                    },
                    {
                        label: "Phone Number",
                        type: "text",
                        id: "phone",
                        placeholder: "+1 (555) 000-0000"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Save Preferences",
                            variant: "default"
                        },
                        {
                            label: "Reset",
                            variant: "outline"
                        }
                    ]
                }
            }
        },
        {
            title: "Security",
            value: "security",
            content: {
                header: {
                    title: "Security Settings",
                    description: "Manage your account security and authentication methods."
                },
                fields: [
                    {
                        label: "Current Password",
                        type: "password",
                        id: "currentPass",
                        required: true
                    },
                    {
                        label: "New Password",
                        type: "password",
                        id: "newPass",
                        required: true
                    },
                    {
                        label: "Confirm Password",
                        type: "password",
                        id: "confirmPass",
                        required: true
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Update Security",
                            variant: "default"
                        },
                        {
                            label: "Cancel",
                            variant: "destructive"
                        }
                    ]
                }
            }
        }
    ],
    styles: {
        container: "flex items-center justify-center h-screen",
        tabs: "bg-white rounded-lg shadow-lg",
        tabsList: "grid w-full grid-cols-3",
        trigger: "font-medium",
        card: "border-none shadow-none",
        cardHeader: "space-y-1",
        cardTitle: "text-xl font-semibold",
        cardDescription: "text-gray-500",
        cardContent: "space-y-4",
        field: "space-y-2",
        label: "font-medium",
        input: "w-full",
        cardFooter: "flex gap-2",
        button: "",
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