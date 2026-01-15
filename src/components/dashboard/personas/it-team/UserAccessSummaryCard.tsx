import { cn } from "@/lib/utils";
import DashboardCard, {
  CardPrimaryText,
} from "@/components/dashboard/DashboardCard";

interface IStatCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
  fullWidth?: boolean;
  className?: string;
}

const StatCard: React.FC<IStatCardProps> = ({
  label,
  value,
  valueClassName,
  fullWidth = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 p-4",
        fullWidth && "md:col-span-2",
        className
      )}
    >
      <CardPrimaryText className="mb-2 text-sm">{label}</CardPrimaryText>
      <p
        className={cn("text-2xl font-bold", valueClassName || "text-gray-900")}
      >
        {value}
      </p>
    </div>
  );
};

const UserAccessSummaryCard = () => {
  return (
    <>
      <DashboardCard title="User Access Summary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard label="Total Active Users" value="1,423" />
          <StatCard label="Inactive / Disabled" value="88" />
          <StatCard label="Roles Count" value="56" />
          <StatCard
            label="Users Pending Approval"
            value="12"
            valueClassName="text-yellow-600"
          />
          <StatCard label="Recently Modified Roles" value="3" fullWidth />
        </div>
      </DashboardCard>
    </>
  );
};

export default UserAccessSummaryCard;
