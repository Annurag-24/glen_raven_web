import {
  CreditHoldCard,
  PaymentAuthFailuresCard,
  ResolvedCreditHoldsCard,
  RefundLifecycleCard,
  AlertsExceptionsCard,
} from '@/components/dashboard/personas/credit';

const CreditPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CreditHoldCard />
        <PaymentAuthFailuresCard />
        <ResolvedCreditHoldsCard />

        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RefundLifecycleCard />
          <AlertsExceptionsCard />
        </div>
      </div>
    </>
  );
};

export default CreditPersona;
