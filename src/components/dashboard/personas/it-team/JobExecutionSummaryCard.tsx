import DashboardCard from '@/components/dashboard/DashboardCard';
import Badge, { type BadgeVariant } from '@/components/Badge';

const data = [
  {
    job: {
      name: 'Order Sync',
      time: '1m 32s',
    },
    status: 'Success',
    nextRun: '10:00 AM',
  },
  {
    job: {
      name: 'Inventory Feed',
      time: '5m 04s',
    },
    status: 'Failed',
    nextRun: '10:15 AM',
  },
  {
    job: {
      name: 'Customer Data Sync',
      time: '2m 11s',
    },
    status: 'Success',
    nextRun: '10:30 AM',
  },
  {
    job: {
      name: 'ASN Processing',
      time: '-',
    },
    status: 'Skipped',
    nextRun: '11:00 AM',
  },
];

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case 'Success':
      return 'success';
    case 'Failed':
      return 'error';
    case 'Skipped':
      return 'default';
    default:
      return 'default';
  }
};

const JobExecutionSummaryCard = () => {
  return (
    <>
      <DashboardCard
        title="Job Execution Summary"
        showBottomViewAll={true}
        bottomViewAllLabel={'View Job Logs'}
        bottomViewAllLink="#"
      >
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-gray-200">
          <p className="text-gray-900 text-sm font-semibold">Job</p>
          <p className="text-gray-900 text-sm font-semibold w-24">Status</p>
          <p className="text-gray-900 text-sm font-semibold w-24">Next Run</p>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {data.map((item) => (
            <div key={item.job.name} className="grid grid-cols-[1fr_auto_auto] gap-4 py-4">
              <div>
                <p className="text-gray-900 text-sm font-medium">{item.job.name}</p>
                <p className="text-gray-500 text-sm">{item.job.time}</p>
              </div>
              <div className="w-24 flex items-center">
                <Badge title={item.status} variant={getStatusVariant(item.status)} />
              </div>
              <p className="w-24 flex items-center text-gray-500 text-sm">{item.nextRun}</p>
            </div>
          ))}
        </div>
      </DashboardCard>
    </>
  );
};

export default JobExecutionSummaryCard;
