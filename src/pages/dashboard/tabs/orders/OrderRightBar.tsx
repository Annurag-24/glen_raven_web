import React from "react";
import QuickTasks, { type QuickTask, type QuickTaskSection } from "@/components/orders/QuickTasks";
import { PaymentDetails } from "@/components/orders/PaymentDetails";
import { ActiveDiscounts, type DiscountItem } from "@/components/orders/ActiveDiscount";

export interface OrderRightBarProps {
    paymentTerm: string;
    discounts: DiscountItem[];
}
const orderMenuData: QuickTaskSection[] = [
    {
      title: "Order Related",
      items: [
        { label: "Order Search", onClick: () => console.log("Order Search") },
        { label: "Create Order", onClick: () => console.log("Create Order") },
        { label: "Past Orders", onClick: () => console.log("Past Orders") },
        { label: "Draft Orders", onClick: () => console.log("Draft Orders") },
      ],
    },
    {
      title: "Returns",
      items: [
        { label: "Return Orders", onClick: () => console.log("Return Orders") },
        { label: "Create Return", onClick: () => console.log("Create Return") },
      ],
    },
    {
      title: "Products",
      items: [
        { label: "Recently Ordered", onClick: () => console.log("Recently Ordered") },
      ],
    },
    {
      title: "Others",
      items: [
        { label: "Notes", onClick: () => console.log("Notes") },
        { label: "Payment Methods", onClick: () => console.log("Payment Methods") },
        { label: "Ordering Permission", onClick: () => console.log("Ordering Permission") },
      ],
    },
  ];
  

const OrderRightBar: React.FC<OrderRightBarProps> = ({
    paymentTerm,
    discounts,
}) => {
  

    return (
        <div className="space-y-4">
          <QuickTasks sections={orderMenuData} />

            <PaymentDetails value={paymentTerm} />
            <ActiveDiscounts items={discounts} />
         
        </div>
    );
};

export default OrderRightBar;