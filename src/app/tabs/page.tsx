'use client'

import { ReusableTabs } from "@/components/ReusableUI/Tabs/Tabs";
import { tabConfig } from "@/config/Tabs/tabconfig";
import { settingsConfig } from "@/config/Tabs/settingsConfig";
import { projectConfig } from "@/config/Tabs/projectConfig";

export default function TabsDemo() {
    return (
        <div className="flex flex-wrap gap-8 p-8 justify-center items-center">
            <ReusableTabs config={tabConfig} />
            <ReusableTabs config={settingsConfig} />
            <ReusableTabs config={projectConfig} />
        </div>
    );
}

