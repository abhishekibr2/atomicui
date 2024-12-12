"use client"
import { TableComponent } from "@/components/ReusableUI/Table/Table"
import { propertyTableConfig } from "@/config/Table/Property";

export default function Home() {


    return (
        <main>

            <TableComponent config={propertyTableConfig} />

        </main>
    )
}
