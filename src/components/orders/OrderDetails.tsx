import { Grid } from "lucide-react";

export type OrderDetailItem = {
    label: string;
    value: string;
};

export type OrderDetailsProps = {
    title?: string;
    details: OrderDetailItem[];
    className?: string;
};

export default function OrderDetails({
    title = "Order Details",
    details,
    className,
}: OrderDetailsProps) {
    return (
        <div className={`bg-white rounded-lg p-4 ${className || ""}`}>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Grid className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="space-y-2 text-sm">
                {details.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{detail.label}:</span>
                        <span className="text-gray-900">{detail.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
