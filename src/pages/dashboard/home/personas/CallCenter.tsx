import {
  AlertsListCard,
  SavedSearches,
} from "@/components/dashboard/personas/call-center";

const CallCenterPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsListCard />
        <SavedSearches />
      </div>
    </>
  );
};

export default CallCenterPersona;
