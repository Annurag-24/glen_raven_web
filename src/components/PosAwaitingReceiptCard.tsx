import DashboardCard, {
  CardPrimaryText,
  CardSecondaryText,
} from "@/components/DashboardCard";
import { cn } from "@/lib/utils";
import Badge from "@/components/Badge";

const data = [
  {
    poNumber: "PO-008765",
    businessName: "ACME Corp",
    receivedQuantity: 500,
    totalQuantity: 1000,
    status: "Partially Received",
  },
  {
    poNumber: "PO-008764",
    businessName: "Global Tech",
    receivedQuantity: 0,
    totalQuantity: 250,
    status: "Receipt Started",
  },
  {
    poNumber: "PO-008763",
    businessName: "Supply Inc.",
    receivedQuantity: 1500,
    totalQuantity: 1500,
    status: "Received",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Partially Received":
      return "warning";
    case "Receipt Started":
      return "error";
    case "Received":
      return "success";
    default:
      return "default";
  }
};

const PosAwaitingReceiptCard = () => {
  return (
    <>
      <DashboardCard
        title="POs Awaiting Receipt / Validation"
        showViewAll={true}
        viewAllLink="#"
      >
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {data.map((item) => (
            <div
              key={item.poNumber}
              className={cn([
                "self-stretch inline-flex justify-between items-center",
                data.indexOf(item) !== data.length - 1 &&
                  "pb-2 border-b border-slate-200",
              ])}
            >
              <div className="w-32 inline-flex flex-col justify-start items-start">
                <CardPrimaryText>{item.poNumber}</CardPrimaryText>
                <p className="self-stretch justify-center text-slate-500 text-xs font-normal leading-4">
                  {item.businessName}
                </p>
              </div>
              <div className="w-20 inline-flex flex-col justify-start items-start">
                <CardSecondaryText>
                  {item.receivedQuantity} / {item.totalQuantity}
                </CardSecondaryText>
              </div>
              <div className="w-32 inline-flex flex-col justify-start items-end">
                <Badge
                  title={item.status}
                  variant={getStatusVariant(item.status)}
                />
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </>
  );
};

export default PosAwaitingReceiptCard;
