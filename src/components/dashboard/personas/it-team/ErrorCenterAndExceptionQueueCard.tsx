import DashboardCard from '@/components/dashboard/DashboardCard';

const errors = [
  {
    code: 'E502: NAV Sync Failure',
    system: 'OMS System',
    reference: 'Order #84521',
    severity: 'error',
    action: 'Retry',
  },
  {
    code: 'E401: Payment Auth Failed',
    system: 'CyberSource',
    reference: 'Order #84519',
    severity: 'error',
    action: null,
  },
  {
    code: 'W211: Duplicate Receipt',
    system: 'WMS Sync',
    reference: 'ASN #77204',
    severity: 'warning',
    action: null,
  },
];

const ErrorCenterAndExceptionQueueCard = () => {
  return (
    <>
      <DashboardCard
        title="Error Center and Exception Queue"
        showBottomViewAll={true}
        bottomViewAllLabel="Go to Error Center"
        bottomViewAllLink="#"
      >
        <div className="overflow-x-auto">
          <div className="flex flex-col min-w-150">
            {/* Header */}
            <div className="grid grid-cols-[minmax(200px,2fr)_minmax(120px,1fr)_80px] gap-4 pb-3">
              <div className="text-gray-900 text-sm font-semibold font-['Inter'] leading-5">
                Error
              </div>
              <div className="text-gray-900 text-sm font-semibold font-['Inter'] leading-5">
                Reference
              </div>
              <div className="text-gray-900 text-sm font-semibold font-['Inter'] leading-5">
                Action
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col border-t border-gray-200">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[minmax(200px,2fr)_minmax(120px,1fr)_80px] gap-4 py-4 border-t first:border-t-0 border-gray-200 items-center"
                >
                  {/* Error column */}
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium font-['Inter'] leading-5 ${
                        error.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                      }`}
                    >
                      {error.code}
                    </span>
                    <span className="text-gray-500 text-sm font-normal font-['Inter'] leading-5">
                      {error.system}
                    </span>
                  </div>

                  {/* Reference column */}
                  <div className="text-gray-700 text-sm font-normal font-['Inter'] leading-5">
                    {error.reference}
                  </div>

                  {/* Action column */}
                  <div>
                    {error.action && (
                      <button className="px-3 py-1.5 bg-tertiary/10 rounded-md shadow-sm hover:bg-tertiary/20 transition-colors cursor-pointer">
                        <span className="text-tertiary text-xs font-semibold font-['Inter'] leading-4">
                          {error.action}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default ErrorCenterAndExceptionQueueCard;
