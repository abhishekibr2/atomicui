"use client"
import { TableComponent } from "@/components/ReusableUI/Table/Table"
import { userTableConfig } from "@/config/Table/User";

export default function Home() {


    return (
        <main>

            <TableComponent config={userTableConfig} />

        </main>
    )
}
