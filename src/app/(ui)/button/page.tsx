"use client";
import { ReusableButton } from "@/components/ReusableUI/Button/Button";
import { Button } from "@/components/ui/button";
import { buttonConfig1 } from "@/config/Button/config1";
import { buttonConfig2 } from "@/config/Button/config2";
import { buttonConfig3 } from "@/config/Button/config3";
import { buttonConfig4 } from "@/config/Button/config4";

export default function ButtonPage() {
    return (
        <div className="flex justify-center items-center gap-4 p-4 bg-gray-100">
            <ReusableButton config={buttonConfig1} />
            <ReusableButton config={buttonConfig2} />
            <ReusableButton config={buttonConfig3} />
            <ReusableButton config={buttonConfig4} />
        </div>);
}
