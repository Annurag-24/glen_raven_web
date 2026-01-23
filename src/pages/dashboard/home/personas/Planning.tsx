import {
  AlertsExceptionsCard,
  OpenPurchaseOrdersCard,
  AllocationOverviewCard,
  InboundReceiptExceptionsCard,
} from '@/components/dashboard/personas/planning';

const PlanningPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OpenPurchaseOrdersCard />
        <InboundReceiptExceptionsCard />
        <AllocationOverviewCard />

        <div className="lg:col-span-3">
          <AlertsExceptionsCard />
        </div>
      </div>
    </>
  );
};

export default PlanningPersona;
