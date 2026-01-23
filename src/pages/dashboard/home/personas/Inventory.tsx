import {
  PosAwaitingReceiptCard,
  TransferOrderMovements,
  RecentDropshipOrdersCard,
  InventoryAuditAndCostHistoryCard,
} from '@/components/dashboard/personas/inventory';

const InventoryPersona = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PosAwaitingReceiptCard />
        <TransferOrderMovements />
        <InventoryAuditAndCostHistoryCard />
        <RecentDropshipOrdersCard />
      </div>
    </>
  );
};

export default InventoryPersona;
