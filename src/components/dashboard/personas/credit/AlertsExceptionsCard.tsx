import DashboardCard, {
  CardPrimaryText,
  CardSecondaryText,
} from '@/components/dashboard/DashboardCard';
import Badge, { type BadgeVariant } from '@/components/Badge';

interface AlertEntry {
  ref: string;
  detail: string;
  time: string;
}

const tags: Array<{ label: string; variant: BadgeVariant }> = [
  { label: 'High-Value Holds', variant: 'error' },
  { label: 'Repeated Failed Payments', variant: 'warning' },
  { label: 'Fraud / Risk Alerts', variant: 'peach' },
  { label: 'Expired Card Alerts', variant: 'default' },
];

const data: AlertEntry[] = [
  {
    ref: 'Y10034498',
    detail: 'High-Value Hold > $2k',
    time: '2023-10-26 10:15 AM',
  },
  {
    ref: 'CUST-002',
    detail: 'Fraud / Risk Alert',
    time: '2023-10-26 09:30 AM',
  },
];

export default function AlertsExceptionsCard() {
  return (
    <DashboardCard title="Alerts & Exceptions" showViewAll={true} wrapperClassName="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t.label} variant={t.variant} title={t.label} />
          ))}
        </div>

        <div className="w-full">
          <div className="flex flex-col">
            {data.map((d, idx) => (
              <div
                key={d.ref}
                className={`py-4 flex items-center justify-between ${
                  idx !== data.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <CardPrimaryText className="mb-1">Ref: {d.ref}</CardPrimaryText>
                  <CardSecondaryText color="text-[#6B7280]">{d.detail}</CardSecondaryText>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">{d.time}</div>
                  <a href="#" className="text-sm text-tertiary hover:underline">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
