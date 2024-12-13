import { ButtonConfig } from "@/types/button.types";

export const buttonConfig1: ButtonConfig = {
    label: "Primary Action",
    variant: "default",
    color: "#3b82f6", // Blue
    size: "large",
    onClick: () => {
        console.log("Primary action triggered!");
    },
};
