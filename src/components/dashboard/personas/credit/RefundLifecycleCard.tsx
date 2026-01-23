import DashboardCard, {
  CardTable,
  CardTableHeader,
  CardTableHeaderCell,
  CardTableBody,
  CardTableRow,
  CardTableCellPrimary,
  CardTableCell,
} from '@/components/dashboard/DashboardCard';
import Badge from '@/components/Badge';

const data = [
  {
    order: 'Y10034450',
    type: 'Card Refund',
    amount: '$150.25',
    status: 'Completed',
  },
  {
    order: 'Y10034448',
    type: 'Credit Note',
    amount: '$89.99',
    status: 'Pending',
  },
  {
    order: 'Y10034412',
    type: 'Card Refund',
    amount: '$1,200.00',
    status: 'Failed',
  },
];

const mapStatusToVariant = (s: string) => {
  const key = s.toLowerCase();
  if (key === 'completed') return 'success' as const;
  if (key === 'pending') return 'warning' as const;
  if (key === 'failed') return 'error' as const;
  return 'default' as const;
};

export default function RefundLifecycleCard() {
  return (
    <DashboardCard
      title="Refund Lifecycle Visibility"
      showViewAll={false}
      wrapperClassName="w-full"
    >
      <CardTable>
        <CardTableHeader>
          <CardTableHeaderCell width="w-40">ORDER NO</CardTableHeaderCell>
          <CardTableHeaderCell>TYPE</CardTableHeaderCell>
          <CardTableHeaderCell>AMOUNT</CardTableHeaderCell>
          <CardTableHeaderCell>STATUS</CardTableHeaderCell>
          <CardTableHeaderCell>ACTION</CardTableHeaderCell>
        </CardTableHeader>

        <CardTableBody>
          {data.map((row, idx) => (
            <CardTableRow key={row.order} isLast={idx === data.length - 1}>
              <CardTableCellPrimary width="w-40">{row.order}</CardTableCellPrimary>
              <CardTableCell>{row.type}</CardTableCell>
              <CardTableCell>{row.amount}</CardTableCell>
              <CardTableCell>
                <Badge title={row.status} variant={mapStatusToVariant(row.status)} />
              </CardTableCell>
              <CardTableCell>
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg h-8 px-3 text-sm hover:bg-blue-100"
                >
                  View Refund
                </a>
              </CardTableCell>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </DashboardCard>
  );
}
