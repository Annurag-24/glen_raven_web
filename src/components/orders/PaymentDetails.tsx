import { CreditCard ,MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentDetailsProps = {
    title?: string;
    label?: string;
    value: string;
    className?: string;
};

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
    title = "Payment Details",
    label = "Payment Terms",
    value,
    className,
}) => {
    return (
        <div
            className={cn(
                "bg-white rounded-lg p-4  shadow-sm",
                className,
            )}
        >
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#002D72]" />
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            
                </div>
            </div>
            <button
                type="button"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="More actions"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>
            </div>

            <div className="mt-[6px] pl-[10px]">
            <p className="text-[12px] text-[#71717A]">{label}</p>
            <p className="text-[12px] font-semibold text-gray-900 mt-[2.5px]">{value}</p>
            </div>
        </div>
    );
};


export default PaymentDetails;
