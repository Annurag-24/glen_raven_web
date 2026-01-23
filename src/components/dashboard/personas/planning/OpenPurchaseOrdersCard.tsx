import DashboardCard, {
  CardTable,
  CardTableHeader,
  CardTableHeaderCell,
  CardTableBody,
  CardTableRow,
  CardTableCellPrimary,
  CardTableCell,
} from '@/components/dashboard/DashboardCard';
// status shown as colored text instead of badge

const data = [
  {
    poNo: 'SKU-001-A',
    vendor: 'GLobal..',
    eta: '11/12/2023',
    status: 'Created',
  },
  {
    poNo: 'SKU-002-B',
    vendor: 'GLobal..',
    eta: '11/12/2023',
    status: 'Awaiting',
  },
  {
    poNo: 'SKU-003-C',
    vendor: 'GLobal..',
    eta: '11/12/2023',
    status: 'Created',
  },
  {
    poNo: 'SKU-004-D',
    vendor: 'GLobal..',
    eta: '11/12/2023',
    status: 'Received',
  },
];

const mapStatusToColor = (s: string) => {
  const key = s.toLowerCase();
  if (key.includes('awaiting') || key.includes('await')) return '#DC2626'; // red
  if (key.includes('created') || key.includes('received') || key.includes('created'))
    return '#16A34A'; // green
  return '#6B7280'; // gray-500 default
};

export default function OpenPurchaseOrdersCard() {
  return (
    <DashboardCard
      title="Open Purchase Orders"
      showViewAll={false}
      wrapperClassName="w-full"
      showBottomViewAll={true}
      bottomViewAllLabel={"View All PO's"}
      bottomViewAllLink="#"
    >
      <CardTable>
        <CardTableHeader>
          <CardTableHeaderCell width="w-40">PO NO.</CardTableHeaderCell>
          <CardTableHeaderCell>Vendor</CardTableHeaderCell>
          <CardTableHeaderCell>ETA</CardTableHeaderCell>
          <CardTableHeaderCell>Status</CardTableHeaderCell>
        </CardTableHeader>

        <CardTableBody>
          {data.map((row, idx) => (
            <CardTableRow key={row.poNo} isLast={idx === data.length - 1}>
              <CardTableCellPrimary width="w-40">{row.poNo}</CardTableCellPrimary>
              <CardTableCell>{row.vendor}</CardTableCell>
              <CardTableCell>{row.eta}</CardTableCell>
              <CardTableCell>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: mapStatusToColor(row.status),
                  }}
                >
                  {row.status}
                </span>
              </CardTableCell>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </DashboardCard>
  );
}
