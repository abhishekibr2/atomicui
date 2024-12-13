import { ButtonConfig } from "@/types/button.types";

export const buttonConfig2: ButtonConfig = {
    label: "Learn More",
    variant: "link",
    color: "#6366f1", // Purple
    size: "medium",
    onClick: () => {
        window.open("https://example.com", "_blank");
    },
};
