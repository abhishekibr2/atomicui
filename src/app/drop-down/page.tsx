'use client'

import { ReusableDropDown } from "@/components/ReusableUI/DropDown/DropDown";
import { dropdownConfig } from "@/config/Dropdown/config";


export default function DropDownDemo() {
    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            {/* <ReusableDropDown config={dropdownConfig} /> */}
            <hr className="w-full" />
            {/* <ReusableDropDown config={dropdownConfig} /> */}
        </div>
    );
}