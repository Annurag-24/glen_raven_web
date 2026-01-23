import {
  UserAccessSummaryCard,
  IntegrationHealthMonitorCard,
  JobExecutionSummaryCard,
  RecentAuditActivityCard,
  ErrorCenterAndExceptionQueueCard,
} from '@/components/dashboard/personas/it-team';

const ItTeamPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <UserAccessSummaryCard />
        <IntegrationHealthMonitorCard />
        <JobExecutionSummaryCard />

        <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentAuditActivityCard />
          <ErrorCenterAndExceptionQueueCard />
        </div>
      </div>
    </>
  );
};

export default ItTeamPersona;
