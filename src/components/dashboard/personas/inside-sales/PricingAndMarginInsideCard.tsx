import DashboardCard from '@/components/dashboard/DashboardCard';
import { cn } from '@/lib/utils';

interface IPriceRowProps {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
}

const PriceRow: React.FC<IPriceRowProps> = ({
  label,
  value,
  labelClassName = 'text-slate-500',
  valueClassName = 'text-slate-800',
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className={cn(['text-sm font-medium', labelClassName])}>{label}</span>
      <span className={cn(['text-sm font-medium', valueClassName])}>{value}</span>
    </div>
  );
};

const PricingAndMarginInsideCard = () => {
  return (
    <>
      <DashboardCard title="Pricing and Margin Inside">
        <div className="flex flex-col gap-4">
          {/* SKU Info */}
          <div className="text-sm">
            <span className="text-slate-500">SKU / Item ID: </span>
            <span className="text-slate-700 font-medium">IB-LT-23A4</span>
          </div>

          {/* Pricing Details */}
          <div className="flex flex-col gap-3">
            <PriceRow label="Base Price:" value="$2,499.00" />
            <PriceRow label="Contract Price:" value="$2,199.00" />
            <PriceRow label="Applied Discounts:" value="- $150.00" valueClassName="text-red-600" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Final Price */}
          <PriceRow
            label="Final Price:"
            value="$2,049.00"
            labelClassName="text-slate-800 font-bold"
            valueClassName="text-slate-900 text-xl font-bold"
          />

          {/* Margin */}
          <PriceRow
            label="Margin %:"
            value="12.4%"
            labelClassName="text-red-600 font-bold"
            valueClassName="text-red-600 text-xl font-bold"
          />

          {/* Action Button */}
          <button className="w-full py-2.5 bg-blue-500/10 rounded-lg text-tertiary text-base font-bold hover:bg-tertiary/20 transition-colors cursor-pointer">
            Open Pricing Tool
          </button>
        </div>
      </DashboardCard>
    </>
  );
};

export default PricingAndMarginInsideCard;
