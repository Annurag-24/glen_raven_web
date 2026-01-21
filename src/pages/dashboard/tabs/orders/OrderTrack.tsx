import { useState } from "react";
import OrderProgressBar from "./OrderProgressBar";
import QuickTasks from "@/components/orders/QuickTasks";
import OrderDetails from "@/components/orders/OrderDetails";
import OrderSummary from "@/components/orders/OrderSummary";
import DeliverAddress from "./DeliverAddress";
import OrderHeader from "./orderHeader";
import DeliverIcon from "@/assets/icons/delivery.svg";
import OrderTabs, { type TabItem } from "@/components/orders/OrderTabs";
import LineItemsList from "@/components/orders/LineItemsList";
import { type LineItemData } from "@/components/orders/LineItem";

const OrderTracking = () => {
    const [activeTab, setActiveTab] = useState<string>("line-items");

    // Example data - replace with actual data from API/state
    const orderData = {
        customerName: "Anya Sharma",
        customerTags: [
            { label: "Trivantage +", variant: "trivant" as const },
            { label: "Active", variant: "active" as const },
        ],
        poNumber: "#315156465",
        paymentTerms: "Net 30",
        orderNumber: "4445636",
        orderStatus: "confirmed",
        orderDate: new Date("2024-05-28T10:30:00"),

        changeContact: [
            { label: "View Contact", value: "view", onClick: () => console.log("View contact") },
            { label: "Edit Contact", value: "edit", onClick: () => console.log("Edit contact") },
        ],
        contactDetails: [
            { label: "View Details", value: "view", onClick: () => console.log("View contact details") },
            { label: "Edit Details", value: "edit", onClick: () => console.log("Edit contact details") },
        ],
        customerNotes: [
            { label: "View Notes", value: "view", onClick: () => console.log("View notes") },
            { label: "Add Note", value: "add", onClick: () => console.log("Add note") },
        ],
        orderNotes: [
            { label: "View Order Notes", value: "view", onClick: () => console.log("View order notes") },
            { label: "Add Order Note", value: "add", onClick: () => console.log("Add order note") },
        ],
    };

    const progressSteps = [
        {
            id: "created",
            label: "Created",
            date: new Date("2024-12-11"),
            completedBy: "John Doe",
            isCompleted: true,
            isCurrent: false,
        },
        {
            id: "allocated",
            label: "Allocated",
            date: new Date("2024-12-11"),
            completedBy: "System",
            isCompleted: true,
            isCurrent: false,
        },
        {
            id: "confirmed",
            label: "Confirmed",
            date: "Expected by, 12th Dec",
            completedBy: "John Doe",
            isCompleted: true,
            isCurrent: false,
        },
        {
            id: "shipped",
            label: "Shipped",
            isCompleted: false,
            isCurrent: true,
        },
        {
            id: "delivered",
            label: "Delivered",
            isCompleted: false,
            isCurrent: false,
        },
    ];


    const DeliveryAddress = {
        line1: "123, Street Wall",
        area: "Bay Wood",
        city: "New York",
        state: "DC",
        country: "USA",
        postalCode: "10001",
        icon: DeliverIcon
    };

    // Sample line items data
    const lineItems: LineItemData[] = [
        {
            id: "1",
            thumbnail: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop",
            productName: "Sunbrella® Transcend Upholstery54\" Overdraw Neon 87002-0006",
            productCode: "743969",
            color: "Sea green",
            location: "Dallas DC",
            hasSidemarks: true,
            discount: "-20% OFF",
            price: "$130.00",
            stockStatus: "in-stock",
            quantity: "Qty 1.2 Yard",
            onChangePayment: () => console.log("Change Payment"),
            onManageInstruction: () => console.log("Manage Instruction"),
            onCancelProduct: () => console.log("Cancel Product"),
            onAddLines: () => console.log("Add Lines"),
        },
        {
            id: "2",
            thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
            productName: "Sunbrella® Transcend Upholstery54\" Overdraw Neon 87002-0006",
            productCode: "743969",
            color: "Sea green",
            location: "Dallas DC",
            hasSidemarks: true,
            discount: "-20% OFF",
            price: "$130.00",
            stockStatus: "in-stock",
            quantity: "Qty 1.2 Yard",
            onChangePayment: () => console.log("Change Payment"),
            onManageInstruction: () => console.log("Manage Instruction"),
            onCancelProduct: () => console.log("Cancel Product"),
            onAddLines: () => console.log("Add Lines"),
        },
    ];

    // Tab configuration
    const tabs: TabItem[] = [
        {
            id: "line-items",
            label: "Line Items",
            content: <LineItemsList items={lineItems} />,
        },
        {
            id: "discount-pricing",
            label: "Discount & Pricing",
        },
        {
            id: "shipping-fulfillment",
            label: "Shipping & Fulfillment",
        },
        {
            id: "special-services",
            label: "Special Services",
        },
        {
            id: "notes-instructions",
            label: "Notes & Instructions",
        },
    ];

    return (
        <div className="w-full bg-[#F9FAFB] min-h-screen">
            {/* Header Section */}
            <OrderHeader
                customerName={orderData.customerName}
                customerTags={orderData.customerTags}
                poNumber={orderData.poNumber}
                paymentTerms={orderData.paymentTerms}
                contactDetails={orderData.contactDetails}
                customerNotes={orderData.customerNotes}
                orderNumber={orderData.orderNumber}
                orderStatus={orderData.orderStatus as any}
                orderDate={orderData.orderDate}
                orderNotes={orderData.orderNotes}
            />
            {/* Main Content Grid - Left content and Right sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-6 py-6">
                {/* Left Side - Stepper and Main Content */}
                <div className="space-y-6">
                    {/* Stepper Component */}
                    <div className="border-b border-[#A4A4A429] pb-[15px] ">
                        <OrderProgressBar steps={progressSteps} />
                    </div>

                    {/* Deliver To Section */}
                    <DeliverAddress address={DeliveryAddress} />

                    {/* Tabs Section */}
                    <OrderTabs
                        tabs={tabs}
                        activeTabId={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* Right Side - Sidebar */}
                <div className="space-y-6">
                    <QuickTasks
                        tasks={[
                            { label: "Print Order", onClick: () => console.log("Print Order") },
                            { label: "Edit Order", onClick: () => console.log("Edit Order") },
                            { label: "Track Shipment", isActive: true, onClick: () => console.log("Track Shipment") },
                            { label: "Download Invoice", onClick: () => console.log("Download Invoice") },
                        ]}
                    />

                    <OrderDetails
                        details={[
                            { label: "Order Type", value: "Export Order" },
                            { label: "Payment", value: "Net 30" },
                            { label: "Payment Account", value: "Corporate Gear" },
                        ]}
                    />

                    <OrderSummary
                        items={[
                            { label: "Subtotal", value: "$138.00" },
                            { label: "Shipping", value: "$5.00" },
                            { label: "Tax", value: "$7.00" },
                            { label: "Discounts", value: "$0.00" },
                        ]}
                        total="$150.00"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;