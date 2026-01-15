import DashboardCard, {
  CardPrimaryText,
  CardSecondaryText,
} from "@/components/dashboard/DashboardCard";
import { cn } from "@/lib/utils";
import Badge from "@/components/Badge";

const data = [
  {
    title: "TO-112233",
    from: "NYC-01",
    to: "LAX-02",
    pending: 200,
    status: "In Transit",
  },
  {
    title: "TO-112232",
    from: "CHI-01",
    to: "MIA-01",
    pending: 0,
    status: "Received",
  },
  {
    title: "TO-112234",
    from: "LAX-02",
    to: "NYC-01",
    pending: 50,
    status: "Pending",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "In Transit":
      return "sky";
    case "Received":
      return "success";
    case "Pending":
      return "default";
    default:
      return "default";
  }
};

const TransferOrderMovementsCard = () => {
  return (
    <>
      <DashboardCard title="Transfer Order Movements">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {data.map((item) => (
            <div
              key={item.title}
              className={cn([
                "self-stretch flex flex-col justify-start items-start",
                data.indexOf(item) !== data.length - 1 &&
                  "pb-2 border-b border-slate-200",
              ])}
            >
              <div className="self-stretch inline-flex justify-between items-center">
                <CardPrimaryText>{item.title}</CardPrimaryText>
                <Badge
                  title={item.status}
                  variant={getStatusVariant(item.status)}
                />
              </div>
              <CardSecondaryText className="text-slate-500">
                {item.from} → {item.to} | Pending: {item.pending}
              </CardSecondaryText>
            </div>
          ))}
        </div>
      </DashboardCard>
    </>
  );
};

export default TransferOrderMovementsCard;
