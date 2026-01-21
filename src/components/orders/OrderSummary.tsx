import {
    RightSideDrawerAccordion,
    RightSideDrawerAccordionItem,
} from "@/components/dashboard/table/right-side-drawer";
import Divider from "@/components/Divider";

export type OrderSummaryItem = {
    label: string;
    value: string;
};

export type OrderSummaryProps = {
    title?: string;
    items: OrderSummaryItem[];
    total: string;
    isInitiallyOpen?: boolean;
    className?: string;
};

export default function OrderSummary({
    title = "Order Summary",
    items,
    total,
    isInitiallyOpen = true,
    className,
}: OrderSummaryProps) {
    return (
        <div className={className || ""}>
            <RightSideDrawerAccordion title={title} isInitiallyOpen={isInitiallyOpen}>
                <div className="flex flex-col gap-2">
                    {items.map((item, index) => (
                        <RightSideDrawerAccordionItem
                            key={index}
                            label={item.label}
                            value={item.value}
                        />
                    ))}

                    <Divider />

                    <RightSideDrawerAccordionItem
                        label="Total"
                        value={total}
                        labelClassName="text-tertiary font-bold"
                        valueClassName="text-tertiary font-bold"
                    />
                </div>
            </RightSideDrawerAccordion>
        </div>
    );
}
