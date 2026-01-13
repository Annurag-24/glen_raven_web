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
    orderId: "DS001",
    vendor: "Acme Wholesale",
    tracking: "1Z09872267T252564276",
  },
  {
    orderId: "DS002",
    vendor: "Global Supply Partner",
    tracking: "1Z09872267T252564276",
  },
  {
    orderId: "DS003",
    vendor: "QuickShip Distributors",
    tracking: "1Z09872267T252564276",
  },
];

const RecentDropshipOrdersCard = () => {
  return (
    <DashboardCard
      title="Recent Dropship Orders (3)"
      showViewAll={true}
      viewAllLink="#"
    >
      <CardTable>
        {/* Table Header */}
        <CardTableHeader>
          <CardTableHeaderCell width="w-32">Order ID</CardTableHeaderCell>
          <CardTableHeaderCell width="w-36">Vendor</CardTableHeaderCell>
          <CardTableHeaderCell width="w-52">Tracking</CardTableHeaderCell>
        </CardTableHeader>

        {/* Table Body */}
        <CardTableBody>
          {data.map((item, index) => (
            <CardTableRow key={item.orderId} isLast={index === data.length - 1}>
              <CardTableCellPrimary width="w-32">
                {item.orderId}
              </CardTableCellPrimary>
              <CardTableCell width="w-36">{item.vendor}</CardTableCell>
              <CardTableCell width="w-52 text-tertiary">
                {item.tracking}
              </CardTableCell>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </DashboardCard>
  );
};

export default RecentDropshipOrdersCard;
