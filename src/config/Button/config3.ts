import { ButtonConfig } from "@/types/button.types";

export const buttonConfig3: ButtonConfig = {
    label: "Submit",
    variant: "ghost",
    color: "#10b981", // Green
    size: "small",
    onClick: () => {
        console.log("Form submitted.");
    },
};
