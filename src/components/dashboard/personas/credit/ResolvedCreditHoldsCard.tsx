import DashboardCard, { CardPrimaryText } from '@/components/dashboard/DashboardCard';
import Badge from '@/components/Badge';

const data = [
  {
    custId: 'CUST-001',
    creditLimit: '$10,000.00',
    currentBalance: '$4,500.00',
    available: '$5,500.00',
    overdue: '$0.00',
    status: 'Good',
  },
  {
    custId: 'CUST-002',
    creditLimit: '$5,000.00',
    currentBalance: '$5,800.00',
    available: '($800.00)',
    overdue: '$1,200.00',
    status: 'Blocked',
  },
];

const mapStatusToVariant = (s: string) => {
  const key = s.toLowerCase();
  if (key === 'good') return 'success' as const;
  if (key === 'blocked') return 'error' as const;
  return 'default' as const;
};

const hasOverdue = (s: string) => {
  if (!s) return false;
  const cleaned = s.replace(/[^0-9.-]/g, '');
  const num = Number(cleaned);
  return !isNaN(num) && Math.abs(num) > 0;
};

const isNegative = (s: string) => {
  if (!s) return false;
  // detect parentheses like ( $800.00 ) or leading minus
  return s.includes('(') || s.trim().startsWith('-');
};

export default function ResolvedCreditHoldsCard() {
  return (
    <DashboardCard title="Resolved Credit Holds" showViewAll={false} wrapperClassName="w-full">
      <div className="flex flex-col gap-4">
        {data.map((d, idx) => (
          <div
            key={d.custId}
            className={`py-4 ${idx !== data.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardPrimaryText className="mb-1">Cust ID: {d.custId}</CardPrimaryText>
                  </div>
                  <div>
                    <Badge title={d.status} variant={mapStatusToVariant(d.status)} />
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 text-sm">
                  <div className="flex justify-between">
                    <div className="text-gray-600">Credit Limit:</div>
                    <div className="text-gray-800">{d.creditLimit}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Current Balance:</div>
                    <div className="text-gray-800">{d.currentBalance}</div>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-gray-600">Available Credit:</div>
                    <div style={isNegative(d.available) ? { color: '#DC2626' } : undefined}>
                      {d.available}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Overdue Balance:</div>
                    <div style={hasOverdue(d.overdue) ? { color: '#DC2626' } : undefined}>
                      {d.overdue}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <a href="#" className="text-sm text-tertiary hover:underline">
                    View Customer
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
