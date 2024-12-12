import { TabConfig } from "@/types/tabs.types";

export const projectConfig: TabConfig = {
    defaultValue: "details",
    width: "w-[500px]",
    tabs: [
        {
            title: "Project Details",
            value: "details",
            content: {
                header: {
                    title: "Project Information",
                    description: "Enter the basic information about your project."
                },
                fields: [
                    {
                        label: "Project Name",
                        type: "text",
                        id: "projectName",
                        placeholder: "Enter project name",
                        required: true
                    },
                    {
                        label: "Project Code",
                        type: "text",
                        id: "projectCode",
                        placeholder: "PRJ-001",
                        required: true
                    },
                    {
                        label: "Budget",
                        type: "number",
                        id: "budget",
                        placeholder: "Enter project budget"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Save Project",
                            variant: "default"
                        }
                    ]
                }
            }
        },
        {
            title: "Team",
            value: "team",
            content: {
                header: {
                    title: "Team Members",
                    description: "Add or remove team members from the project."
                },
                fields: [
                    {
                        label: "Project Manager",
                        type: "text",
                        id: "manager",
                        placeholder: "Enter manager name"
                    },
                    {
                        label: "Team Size",
                        type: "number",
                        id: "teamSize",
                        placeholder: "Number of team members"
                    },
                    {
                        label: "Department",
                        type: "text",
                        id: "department",
                        placeholder: "Select department"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Update Team",
                            variant: "default"
                        },
                        {
                            label: "Remove All",
                            variant: "destructive"
                        }
                    ]
                }
            }
        },
        {
            title: "Timeline",
            value: "timeline",
            content: {
                header: {
                    title: "Project Timeline",
                    description: "Set project start and end dates."
                },
                fields: [
                    {
                        label: "Start Date",
                        type: "text",
                        id: "startDate",
                        placeholder: "MM/DD/YYYY"
                    },
                    {
                        label: "End Date",
                        type: "text",
                        id: "endDate",
                        placeholder: "MM/DD/YYYY"
                    },
                    {
                        label: "Duration (months)",
                        type: "number",
                        id: "duration",
                        placeholder: "Project duration"
                    }
                ],
                footer: {
                    buttons: [
                        {
                            label: "Set Timeline",
                            variant: "default"
                        },
                        {
                            label: "Clear",
                            variant: "outline"
                        }
                    ]
                }
            }
        }
    ],
    styles: {
        container: "flex items-center justify-center h-screen",
        tabs: "bg-slate-50 rounded-xl shadow-xl p-4",
        tabsList: "grid w-full grid-cols-3 bg-white rounded-lg p-1",
        trigger: "data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900",
        card: "bg-white",
        cardHeader: "space-y-1.5",
        cardTitle: "text-2xl font-bold tracking-tight",
        cardDescription: "text-slate-500",
        cardContent: "space-y-5",
        field: "space-y-2.5",
        label: "text-sm font-semibold",
        input: "bg-slate-50",
        cardFooter: "flex justify-between",
        button: "transition-all",
        motionVariants: {
            container: {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4, ease: "easeOut" }
            },
            tab: {
                initial: { opacity: 0, y: -5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 5 },
                transition: { duration: 0.3 }
            },
            content: {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                transition: { duration: 0.3, ease: "easeInOut" }
            },
            field: {
                initial: { opacity: 0, x: -5 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.2 }
            },
            header: {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 }
            },
            footer: {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 }
            }
        }
    }
}; 