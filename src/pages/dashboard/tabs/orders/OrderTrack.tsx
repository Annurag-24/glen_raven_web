import { useState } from "react";
import { Plus } from "lucide-react";
import OrderHeader from "./OrderHeader";
import OrderProgressBar from "./OrderProgressBar";
import { Tabs } from "@/components/orders/tabs";
import { getOrderTabs } from "./OrderTabsConfig";
import QuickTasks from "@/components/orders/QuickTasks";
import OrderDetails from "@/components/orders/OrderDetails";
import OrderSummary from "@/components/orders/OrderSummary";
import LineItem, { type LineItemData } from "@/components/orders/LineItem";
import PricingContent from "@/components/orders/PricingContent";
import OrderUserInfo from "@/components/orders/OrderUserInfo";
import { Button } from "@/components/ui/button";
import DeliverIcon from "@/assets/icons/deliver.svg";
import DeliverAddress from "./DeliverAddress";
import TableSearchHeader from "@/components/dashboard/search/TableSearchHeader";
import OrdersTable from "@/components/dashboard/table/OrdersTable";
import OrderRightBar from "./OrderRightBar";

const OrderTracking = () => {
    const [searchValue, setSearchValue] = useState("");
    const [activeTab, setActiveTab] = useState<string>("line-items");

    // Order data - replace with actual data from API/state
    const orderData = {
        customerName: "Anya Sharma",
        customerTags: [
            { label: "Trivantage +", variant: "trivant" as const },
            { label: "Active", variant: "active" as const },
        ],
        paymentTerms: "Net 30",
        orderNumber: "4445636",
        poNumber: "#315156465",
        orderStatus: "confirmed",
        orderDate: new Date("2024-05-28T10:30:00"),
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
            isCompleted: false,
            isCurrent: true,
        },
        {
            id: "shipped",
            label: "Shipped",
            isCompleted: false,
            isCurrent: false,
        },
        {
            id: "delivered",
            label: "Delivered",
            isCompleted: false,
            isCurrent: false,
        },
    ];

    // Line items data - replace with actual data from API
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

    // Discount & Pricing data
    const pricingData = {
        subtotal: "$260.00",
        discounts: [
            { label: "Bulk Order Discount", value: "-$52.00", type: "percentage" },
            { label: "Customer Loyalty", value: "-$10.00", type: "fixed" },
        ],
        totalDiscount: "-$62.00",
        finalPrice: "$198.00",
    };


    const DeliveryAddress = {
        line1: "123, Street Wall",
        area: "Bay Wood",
        city: "New York",
        state: "DC",
        country: "USA",
        postalCode: "10001",
        icon: DeliverIcon
    };

    const tabs = getOrderTabs({
        lineItemsContent: (
            <>
                <div className="p-4 flex space-y-[12px] flex-col">
                    {lineItems.map((item) => (
                        <LineItem key={item.id} item={item} />

                    ))}
                </div>
            </>
        ),
        pricingContent: <PricingContent data={pricingData} className="p-4" />,
    });


    const discounts = [
        {
            title: "15% off Bulk Orders",
            description: "Applied to orders over $5,000",
            icon: "tag" as const,
        },
        {
            title: "Free Freight Shipping",
            description: "Active on all shipments",
            icon: "truck" as const,
        },
    ];

    const paymentTerm = orderData.paymentTerms;


    return (
        <>
            <div className="w-full  min-h-screen">
                {/* Header Section */}
                <div className="">
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
                </div>
                {/* Main Content Grid - Left content and Right sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]   ">
                    {/* Left Side - Stepper and Main Content */}
                    <div className="space-y-6 border-r border-[#A4A4A429]">
                        {/* Stepper Component */}
                        <div className="border-b border-[#A4A4A429] py-[15px] mb-0  bg-[#FFFFFF] ">
                            <OrderProgressBar steps={progressSteps} />
                        </div>

                        <DeliverAddress address={DeliveryAddress} />
                        {/* Tabs Section */}
                        <Tabs
                            value={activeTab}
                            onChange={setActiveTab}
                            items={tabs}
                        />

                    </div>

                    {/* Right Side - Sidebar */}
                    <div className="space-y-6 p-[20px] bg-[#FFFFFF]">

                        <QuickTasks
                        sections={[
                            {
                              title: "Order Related",
                              items: [
                                { label: "Print Order", onClick: () => console.log("Print Order") },
                                { label: "Edit Order", onClick: () => console.log("Edit Order") },
                                { label: "Track Shipment", isActive: true, onClick: () => console.log("Track Shipment") },
                                { label: "Download Invoice", onClick: () => console.log("Download Invoice") },
                              ],
                            },
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



            {/* Order User Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]   ">
                <div className="">
                <div className="flex items-center justify-between bg-[#FFFFFF] py-[18px] px-[24px]">
                    <OrderUserInfo
                        customerName={orderData.customerName}
                        customerTags={orderData.customerTags}
                        poNumber={orderData.poNumber}
                        paymentTerms={orderData.paymentTerms}
                        contactDetails={orderData.contactDetails}
                        customerNotes={orderData.customerNotes}
                    />
                    <div className="">
                        <Button
                            variant="tertiary"
                            size="default"
                            onClick={() => console.log("Create Order")}
                            className="gap-2"
                        >
                            Create Order
                            <Plus className="w-4 h-4" />

                        </Button>
                    </div>

                </div>

                <div className="mt-[12px]">

                    <TableSearchHeader
                        title="All Orders"
                        className="px-[24px]"           // padding lives on the header itself
                          searchBarProps={{
                            placeholder: "Search orders",
                            value: searchValue,
                            onChange: setSearchValue,
                            showRefresh: true,
                            showFilter: true,
                            showSettings: false,
                            showExport: false,
                            // onFilter: () => setFilterOpen(true),
                            // onSettings: () => setPreferencesOpen(true),
                        }}

                    />
                </div>
                <div className="mt-[12px]"> 
                <OrdersTable/>
                </div>
                </div>
                <div className="bg-[#FFFFFF] border-l border-[#E4E4E7] p-[20px]">
                    <OrderRightBar discounts={discounts} paymentTerm={paymentTerm} />
                </div>

            </div>

        </>
    );
};

export default OrderTracking;