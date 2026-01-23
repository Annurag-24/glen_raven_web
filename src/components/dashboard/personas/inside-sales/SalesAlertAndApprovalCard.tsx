import DashboardCard from '@/components/dashboard/DashboardCard';

const items = [
  {
    title: 'Quote needs approval',
    id: 'Q-882342',
    time: '2m ago',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
  },
  {
    title: 'Low-margin quote',
    id: 'Q-882335',
    time: '1h ago',
    bg: 'bg-red-50',
    text: 'text-red-700',
  },
  {
    title: 'Customer on hold',
    id: 'CUST-012',
    time: '3d ago',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
  },
];

export default function SalesAlertsApprovalsCard() {
  return (
    <DashboardCard title="Sales Alerts & Approvals" showViewAll={false} wrapperClassName="w-full">
      <div className="flex flex-col gap-3">
        {items.map((it) => (
          <div key={it.id} className={`${it.bg} rounded-lg p-4 flex items-center justify-between`}>
            <div>
              <div className={`text-sm font-semibold ${it.text}`}>{it.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {it.id} | {it.time}
              </div>
            </div>

            <div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
