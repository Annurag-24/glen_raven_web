import DashboardCard from "@/components/dashboard/DashboardCard";

interface IInfoRowProps {
  label: string;
  value: string;
  valueClassName?: string;
  layout?: "inline" | "stacked";
}

const InfoRow: React.FC<IInfoRowProps> = ({
  label,
  value,
  valueClassName = "text-slate-700",
  layout = "stacked",
}) => {
  if (layout === "inline") {
    return (
      <div className="text-sm">
        <span className="text-slate-800 font-semibold">{label} </span>
        <span className={`${valueClassName}`}>{value}</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className={`text-sm font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
};

const CustomerSnapshotCard = () => {
  const creditUsedPercentage = (17500 / 50000) * 100; // 35%

  return (
    <>
      <DashboardCard title="Customer Snapshot">
        <div className="flex flex-col gap-4">
          {/* Customer Info */}
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="text-slate-500">Customer ID: </span>
              <span className="text-slate-700 font-medium">APX-RET-001</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-500">Account Status: </span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>

          {/* Credit Details */}
          <div className="flex flex-col gap-3">
            <InfoRow
              label="Credit Limit:"
              value="$50,000.00"
              valueClassName="text-slate-800"
            />
            <InfoRow
              label="Available Credit:"
              value="$32,500.00"
              valueClassName="text-green-600"
            />

            {/* Credit Usage Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${creditUsedPercentage}%` }}
              />
            </div>
          </div>

          {/* Order & Quote History */}
          <div className="flex flex-col gap-2">
            <InfoRow
              label="Last 5 Orders:"
              value="ORD-991, ORD-985, ..."
              layout="inline"
            />
            <InfoRow
              label="Last 5 Quotes:"
              value="Q-882335, Q-87110, ..."
              layout="inline"
            />
            <InfoRow
              label="Average Order Size:"
              value="$7,820.00"
              layout="inline"
            />
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default CustomerSnapshotCard;
