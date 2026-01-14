import DashboardCard, {
    CardTable,
    CardTableHeader,
    CardTableHeaderCell,
    CardTableBody,
    CardTableRow,
    CardTableCellPrimary,
    CardTableCell,
} from "@/components/DashboardCard";
import Badge from "@/components/Badge";

const data = [
    { po: "PO-987115", ordered: 500, received: 498, issue: "Shortage" },
    { po: "PO-987118", ordered: 1000, received: 1000, issue: "ASN Mismatch" },
    { po: "PO-987120", ordered: 250, received: 255, issue: "Overage" },
    { po: "PO-987121", ordered: 250, received: 255, issue: "Overage" },
];

const mapIssueToVariant = (issue: string) => {
    const key = issue.toLowerCase();
    if (key.includes("shortage")) return "error" as const;
    if (key.includes("asn")) return "peach" as const;
    if (key.includes("overage")) return "warning" as const;
    return "default" as const;
};

export default function InboundReceiptExceptionsCard() {
    return (
        <DashboardCard
            title="Inbound Receipt Exceptions"
            showViewAll={false}
            wrapperClassName="w-full"
            showBottomViewAll={true}
            bottomViewAllLabel={"View All Exceptions"}
            bottomViewAllLink="#"
        >
            <CardTable>
                <CardTableHeader>
                    <CardTableHeaderCell width="w-40">
                        PO Number
                    </CardTableHeaderCell>
                    <CardTableHeaderCell>Ordered</CardTableHeaderCell>
                    <CardTableHeaderCell>Received</CardTableHeaderCell>
                    <CardTableHeaderCell>Issue</CardTableHeaderCell>
                </CardTableHeader>

                <CardTableBody>
                    {data.map((row, idx) => (
                        <CardTableRow
                            key={row.po}
                            isLast={idx === data.length - 1}
                        >
                            <CardTableCellPrimary width="w-40">
                                {row.po}
                            </CardTableCellPrimary>
                            <CardTableCell>{row.ordered}</CardTableCell>
                            <CardTableCell>{row.received}</CardTableCell>
                            <CardTableCell>
                                <Badge
                                    title={row.issue}
                                    variant={mapIssueToVariant(row.issue)}
                                />
                            </CardTableCell>
                        </CardTableRow>
                    ))}
                </CardTableBody>
            </CardTable>
        </DashboardCard>
    );
}
