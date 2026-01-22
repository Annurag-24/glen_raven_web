import Badge from "@/components/Badge";
import { type OrderStatus } from "./orderHeader";

const statusConfig: Record<OrderStatus, { label: string; variant: "confirmed" | "pending" | "shipped" | "delivered" | "cancelled" }> = {
    confirmed: { label: "Confirmed", variant: "confirmed" },
    pending: { label: "Pending", variant: "pending" },
    shipped: { label: "Shipped", variant: "shipped" },
    delivered: { label: "Delivered", variant: "delivered" },
    cancelled: { label: "Cancelled", variant: "cancelled" },
};

type DeliveryAddress = {
    line1: string;
    area: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    icon: string;
};

type CustomerOrderIdDetailProps = {
    orderNumber: string;
    orderStatus: OrderStatus;
    deliveryAddress?: DeliveryAddress;
    className?: string;
};

const CustomerOrderIdDetail = ({ orderNumber, orderStatus, deliveryAddress, className }: CustomerOrderIdDetailProps) => {
    const status = statusConfig[orderStatus];

    return (
        <div className={className}>
            <div className="flex items-center gap-3">
                <Badge title={status.label} variant={status.variant} />
                <div className="flex flex-col items-end">
                    <span className="text-[18px] font-medium text-gray-900">
                        Order #{orderNumber}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CustomerOrderIdDetail;
export type { DeliveryAddress };
