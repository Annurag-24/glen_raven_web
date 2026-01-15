import {
  UserAccessSummaryCard,
  IntegrationHealthMonitorCard,
  JobExecutionSummaryCard,
} from "@/components/dashboard/personas/it-team";

const ItTeamPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <UserAccessSummaryCard />
        <IntegrationHealthMonitorCard />
        <JobExecutionSummaryCard />
      </div>
    </>
  );
};

export default ItTeamPersona;
