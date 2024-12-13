'use client'

import { ReusableCard } from "@/components/ReusableUI/Cards/Card";
import { cardConfig1 } from "@/config/Card/config1";
import { cardConfig2 } from "@/config/Card/config2";
import { cardConfig3 } from "@/config/Card/config3";

export default function CardDemo() {
    return (
        <div className="p-10 flex gap-5 items-center justify-center">
            <ReusableCard config={cardConfig1} />
            <ReusableCard config={cardConfig2} />
            <ReusableCard config={cardConfig3} />
        </div>
    );
}