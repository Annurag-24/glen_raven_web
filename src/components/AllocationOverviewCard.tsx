import DashboardCard, {
    CardTable,
    CardTableHeader,
    CardTableHeaderCell,
    CardTableBody,
    CardTableRow,
    CardTableCellPrimary,
    CardTableCell,
} from "@/components/DashboardCard";

const data = [
    { sku: "SKU-001-A", supply: "1,500", demand: "1,250", allocated: 1250 },
    { sku: "SKU-002-B", supply: "800", demand: "950", allocated: 800 },
    { sku: "SKU-003-C", supply: "2,000", demand: "500", allocated: 500 },
    { sku: "SKU-004-D", supply: "300", demand: "300", allocated: 300 },
];

const renderAllocated = (value: number, supply: string, demand: string) => {
    // Simple rule: green if allocated >= demand, red otherwise
    const demandNum = Number(String(demand).replace(/,/g, ""));
    const cls = value >= demandNum ? "text-[#16A34A]" : "text-[#DC2626]";
    return (
        <span className={`${cls} font-medium`}>{value.toLocaleString()}</span>
    );
};

export default function AllocationOverviewCard() {
    return (
        <DashboardCard
            title="Allocation Overview"
            showViewAll={false}
            wrapperClassName="w-full"
            showBottomViewAll={true}
            bottomViewAllLabel={"View Allocation Detail"}
            bottomViewAllLink="#"
        >
            <CardTable>
                <CardTableHeader>
                    <CardTableHeaderCell width="w-40">SKU</CardTableHeaderCell>
                    <CardTableHeaderCell>Supply</CardTableHeaderCell>
                    <CardTableHeaderCell>Demand</CardTableHeaderCell>
                    <CardTableHeaderCell>Allocated</CardTableHeaderCell>
                </CardTableHeader>

                <CardTableBody>
                    {data.map((row, idx) => (
                        <CardTableRow
                            key={row.sku}
                            isLast={idx === data.length - 1}
                        >
                            <CardTableCellPrimary width="w-40">
                                {row.sku}
                            </CardTableCellPrimary>
                            <CardTableCell>{row.supply}</CardTableCell>
                            <CardTableCell>{row.demand}</CardTableCell>
                            <CardTableCell>
                                {renderAllocated(
                                    row.allocated,
                                    row.supply,
                                    row.demand
                                )}
                            </CardTableCell>
                        </CardTableRow>
                    ))}
                </CardTableBody>
            </CardTable>
        </DashboardCard>
    );
}
