import { ButtonConfig } from "@/types/button.types";

export const buttonConfig4: ButtonConfig = {
    label: "Cancel",
    variant: "outline",
    color: "#ef4444", // Red
    size: "medium",
    onClick: () => {
        console.log("Cancel button clicked.");
    },
};
