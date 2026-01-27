import React from "react";
import { ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import Badge, { type BadgeVariant } from "@/components/Badge";
import DropdownMenu, { type DropdownOption } from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";

export type OrderStatus = "confirmed" | "pending" | "shipped" | "delivered" | "cancelled";

export interface OrderInfoData {
    orderNumber: string;
    orderStatus: OrderStatus;
    orderDate: Date | string;
    orderNotes?: DropdownOption[];
}

const statusConfig: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
    confirmed: { label: "Confirmed", variant: "confirmed" },
    pending: { label: "Pending", variant: "pending" },
    shipped: { label: "Shipped", variant: "shipped" },
    delivered: { label: "Delivered", variant: "delivered" },
    cancelled: { label: "Cancelled", variant: "cancelled" },
};

/**
 * Default order info – replace with API data
 */
export const getDefaultOrderInfo = (): OrderInfoData => ({
    orderNumber: "4445636",
    orderStatus: "confirmed",
    orderDate: new Date("2024-05-28T10:30:00"),
    orderNotes: [
        { label: "View Order Notes", value: "view", onClick: () => console.log("View order notes") },
        { label: "Add Order Note", value: "add", onClick: () => console.log("Add order note") },
    ],
});

interface IOrderInfoProps {
    data: OrderInfoData;
    onOrderNotesClick?: (option: DropdownOption) => void;
    className?: string;
}

const OrderInfo: React.FC<IOrderInfoProps> = ({ data, onOrderNotesClick, className }) => {
    const status = statusConfig[data.orderStatus];
    const formattedDate =
        typeof data.orderDate === "string"
            ? data.orderDate
            : format(data.orderDate, "EEE, d MMM h:mm a");

    return (
        <div className={cn("flex items-start gap-4", className)}>
            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3">
                    <Badge title={status.label} variant={status.variant} />
                    <div className="flex flex-col items-end">
                        <span className="text-[18px] font-medium text-gray-900">
                            Order #{data.orderNumber}
                        </span>
                    </div>
                    <div className="bg-[#B75E001A] rounded-full w-[60px] h-[60px] flex justify-center items-center">
                        <ShoppingCart className="w-5 h-5" color="#B75E00" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {data.orderNotes && data.orderNotes.length > 0 && (
                        <DropdownMenu
                            trigger={<span className="text-[12px] font-semibold text-[#3F3F46]">Order Notes</span>}
                            options={data.orderNotes}
                            onOptionClick={onOrderNotesClick}
                            align="end"
                        />
                    )}
                    <span className="text-[14px] text-[#71717A]">{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
