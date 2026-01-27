import { cn } from "@/lib/utils";
import OrderUserInfo, { type CustomerTag } from "@/components/orders/OrderUserInfo";
import OrderInfo, { type OrderInfoData } from "@/components/orders/OrderInfo";
import { type DropdownOption } from "@/components/ui/DropdownMenu";

export type OrderStatus = "confirmed" | "pending" | "shipped" | "delivered" | "cancelled";

export type { CustomerTag };

export type OrderHeaderProps = {
    // Left Side – Customer Info (passed to OrderHeaderLeft)
    customerName: string;
    customerTags?: CustomerTag[];
    poNumber?: string;
    paymentTerms?: string;
    contactDetails?: DropdownOption[];
    customerNotes?: DropdownOption[];
    changeContact?: DropdownOption[];
    onChangeContact?: (option: DropdownOption) => void;
    onContactDetailsClick?: (option: DropdownOption) => void;
    onCustomerNotesClick?: (option: DropdownOption) => void;

    // Right Side – Order Info (passed to OrderInfo)
    orderNumber: string;
    orderStatus: OrderStatus;
    orderDate: Date | string;
    orderNotes?: DropdownOption[];
    onOrderNotesClick?: (option: DropdownOption) => void;

    className?: string;
};

export default function OrderHeader({
    customerName,
    customerTags = [],
    poNumber,
    paymentTerms,
    contactDetails,
    customerNotes,
    changeContact,
    onChangeContact,
    onContactDetailsClick,
    onCustomerNotesClick,
    orderNumber,
    orderStatus,
    orderDate,
    orderNotes,
    onOrderNotesClick,
    className,
}: OrderHeaderProps) {
    const orderInfoData: OrderInfoData = {
        orderNumber,
        orderStatus,
        orderDate,
        orderNotes,
    };

    return (
        <div
            className={cn(
                "w-full border-b border-[#A4A4A429] px-6 py-4 bg-[#FFFFFF] py-[18px] px-[24px]",
                className
            )}
        >
            
            <div className="flex items-start justify-between gap-6">
                <OrderUserInfo
                    customerName={customerName}
                    customerTags={customerTags}
                    poNumber={poNumber}
                    paymentTerms={paymentTerms}
                    contactDetails={contactDetails}
                    customerNotes={customerNotes}
                    changeContact={changeContact}
                    onChangeContact={onChangeContact}
                    onContactDetailsClick={onContactDetailsClick}
                    onCustomerNotesClick={onCustomerNotesClick}
                />
                <OrderInfo
                    data={orderInfoData}
                    onOrderNotesClick={onOrderNotesClick}
                />
            </div>
        </div>
    );
}
