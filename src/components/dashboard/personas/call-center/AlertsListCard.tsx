import DashboardCard, {
  CardPrimaryText,
  CardSecondaryText,
} from '@/components/dashboard/DashboardCard';
import Badge from '@/components/Badge';

interface AlertItem {
  id: string;
  time: string;
  name: string;
  variant?: 'danger' | 'warning' | 'info' | 'neutral';
}

const getBadgeVariant = (variant: string) => {
  switch (variant) {
    case 'danger':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    case 'neutral':
      return 'default';
    default:
      return 'default';
  }
};

export default function AlertsListCard({ items }: { items?: AlertItem[] }) {
  const data = items ?? [
    {
      id: '#ORD-00117',
      time: '2 min ago',
      name: 'Credit Hold',
      variant: 'danger',
    },
    {
      id: '#ORD-00115',
      time: '1 hour ago',
      name: 'Payment Failure',
      variant: 'danger',
    },
    {
      id: '#ORD-00114',
      time: '4 hours ago',
      name: 'Shipment Exception',
      variant: 'warning',
    },
    {
      id: '#ORD-00112',
      time: '1 day ago',
      name: 'Return Exception',
      variant: 'warning',
    },
  ];

  return (
    <DashboardCard title="Open Alerts & Exception" showViewAll={false} wrapperClassName="w-full">
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        {data.map((item) => (
          <div key={item.id} className="self-stretch inline-flex justify-between items-center">
            <div className="flex-1 inline-flex flex-col justify-start items-start">
              <CardPrimaryText>{item.id}</CardPrimaryText>
              <CardSecondaryText>{item.time}</CardSecondaryText>
            </div>
            <div className="flex items-center gap-4">
              <Badge title={item.name} variant={getBadgeVariant(item.variant || 'neutral')} />
              <button className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-lg h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/40 cursor-pointer">
                View Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
