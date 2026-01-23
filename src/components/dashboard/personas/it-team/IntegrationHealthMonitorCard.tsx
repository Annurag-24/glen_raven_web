import { cn } from '@/lib/utils';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface IntegrationStatusItemProps {
  name: string;
  lastSync: string;
  errors: number;
  status: 'success' | 'warning' | 'error';
}

const statusColors = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

const errorColors = {
  success: 'text-gray-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

const integrations = [
  {
    name: 'NAV Sync',
    lastSync: '2m ago',
    errors: 0,
    status: 'success' as const,
  },
  {
    name: 'CRM Sync',
    lastSync: '5m ago',
    errors: 0,
    status: 'success' as const,
  },
  {
    name: 'Acuver Vendor API',
    lastSync: '15m ago',
    errors: 2,
    status: 'warning' as const,
  },
  {
    name: 'Tax Engine',
    lastSync: '1h ago',
    errors: 8,
    status: 'error' as const,
  },
  {
    name: 'CyberSource',
    lastSync: '1m ago',
    errors: 0,
    status: 'success' as const,
  },
];

const IntegrationStatusItem = ({ name, lastSync, errors, status }: IntegrationStatusItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
      <div className={cn('w-2.5 h-2.5 rounded-full', statusColors[status])} />
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-base font-medium">{name}</p>
        <p className="text-gray-500 text-xs">Last Sync: {lastSync}</p>
      </div>
      <p className={cn('text-sm font-medium whitespace-nowrap', errorColors[status])}>
        Errors: {errors}
      </p>
    </div>
  );
};

const IntegrationHealthMonitorCard = () => {
  return (
    <>
      <DashboardCard
        title="Integration Health Monitor"
        showBottomViewAll={true}
        bottomViewAllLabel={'View Details'}
        bottomViewAllLink="#"
      >
        <div className="flex flex-col gap-3">
          {integrations.map((integration) => (
            <IntegrationStatusItem key={integration.name} {...integration} />
          ))}
        </div>
      </DashboardCard>
    </>
  );
};

export default IntegrationHealthMonitorCard;
