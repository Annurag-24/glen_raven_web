import DashboardCard, {
  CardTable,
  CardTableHeader,
  CardTableHeaderCell,
  CardTableBody,
  CardTableRow,
  CardTableCell,
  CardTableCellPrimary,
} from "@/components/DashboardCard";

const data = [
  {
    itemId: "H-CHAIR-01",
    costChangeFrom: "$1100",
    costChangeTo: "$1125",
    date: "2023-10-25",
    changedBy: "A. Johnson",
  },
  {
    itemId: "L-DSK-03",
    costChangeFrom: "$750",
    costChangeTo: "$750",
    date: "2023-10-24",
    changedBy: "SYSTEM",
  },
  {
    itemId: "H-CHAIR-01",
    costChangeFrom: "$1050",
    costChangeTo: "$1100",
    date: "2023-09-15",
    changedBy: "M. Davis",
  },
];

const InventoryAuditAndCostHistoryCard = () => {
  return (
    <DashboardCard title="Inventory Audit & Cost History">
      <CardTable>
        {/* Table Header */}
        <CardTableHeader>
          <CardTableHeaderCell width="w-32">Item ID</CardTableHeaderCell>
          <CardTableHeaderCell width="w-36">Cost Change</CardTableHeaderCell>
          <CardTableHeaderCell width="w-36">Date</CardTableHeaderCell>
          <CardTableHeaderCell width="w-36">Changed By</CardTableHeaderCell>
        </CardTableHeader>

        {/* Table Body */}
        <CardTableBody>
          {data.map((item, index) => (
            <CardTableRow
              key={`${item.itemId}-${item.date}-${index}`}
              isLast={index === data.length - 1}
            >
              <CardTableCellPrimary width="w-32">
                {item.itemId}
              </CardTableCellPrimary>
              <CardTableCell width="w-36">
                {item.costChangeFrom} → {item.costChangeTo}
              </CardTableCell>
              <CardTableCell width="w-36">{item.date}</CardTableCell>
              <CardTableCell width="w-36">{item.changedBy}</CardTableCell>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </DashboardCard>
  );
};

export default InventoryAuditAndCostHistoryCard;
