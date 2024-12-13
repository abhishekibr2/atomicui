"use client"
import { TableComponent } from "@/components/ReusableUI/Table/Table"
import { invoiceTableConfig } from "@/config/Table/Invoice";

export default function Home() {


    return (
        <main>

            <TableComponent config={invoiceTableConfig} />

        </main>
    )
}
