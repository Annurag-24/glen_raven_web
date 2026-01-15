import React from "react";
import DashboardCard, {
    CardTable,
    CardTableHeader,
    CardTableHeaderCell,
    CardTableBody,
    CardTableRow,
    CardTableCell,
} from "@/components/dashboard/DashboardCard";

const data = [
    {
        id: "Q-882341",
        customer: "Global Tech",
        amount: "$15,250",
        margin: 22.5,
    },
    { id: "Q-882340", customer: "Innovate", amount: "$8,400", margin: 18.1 },
    { id: "Q-882339", customer: "Quantum", amount: "$2,150", margin: 31.0 },
    {
        id: "Q-882335",
        customer: "Apex Retail",
        amount: "$11,800",
        margin: 12.4,
    },
];

const marginClass = (m: number) => {
    if (m >= 20) return "text-green-600"; // good
    if (m >= 15) return "text-amber-500"; // moderate
    return "text-red-500"; // low
};

export default function ActiveQuotesCard() {
    return (
        <DashboardCard
            title="Active Quotes"
            showViewAll={false}
            wrapperClassName="w-full"
        >
            <CardTable>
                <CardTableHeader>
                    <CardTableHeaderCell>QUOTE ID</CardTableHeaderCell>
                    <CardTableHeaderCell>CUSTOMER</CardTableHeaderCell>
                    <CardTableHeaderCell>AMOUNT</CardTableHeaderCell>
                    <CardTableHeaderCell>MARGIN %</CardTableHeaderCell>
                </CardTableHeader>

                <CardTableBody>
                    {data.map((r, idx) => (
                        <CardTableRow
                            key={r.id}
                            isLast={idx === data.length - 1}
                        >
                            <CardTableCell>
                                <a
                                    href="#"
                                    className="text-blue-600 hover:underline"
                                >
                                    {r.id}
                                </a>
                            </CardTableCell>
                            <CardTableCell>{r.customer}</CardTableCell>
                            <CardTableCell>{r.amount}</CardTableCell>
                            <CardTableCell className={marginClass(r.margin)}>
                                {r.margin.toFixed(1)}%
                            </CardTableCell>
                        </CardTableRow>
                    ))}
                </CardTableBody>
            </CardTable>
        </DashboardCard>
    );
}
