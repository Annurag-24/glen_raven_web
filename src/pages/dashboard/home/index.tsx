import createOrderIcon from "@/assets/icons/create-order-tertiary.svg";
import searchProductIcon from "@/assets/icons/search-order-tertiary.svg";
import createBusinessIcon from "@/assets/icons/create-business-tertiary.svg";
import customersIcon from "@/assets/icons/search-business-tertiary.svg";
import createReturnIcon from "@/assets/icons/returns-tertiary.svg";
import returnsIcon from "@/assets/icons/returns-tertiary.svg";
import trackShipmentIcon from "@/assets/icons/track-shipment-tertiary.svg";
import PosAwaitingReceiptCard from "@/components/PosAwaitingReceiptCard";
import TransferOrderMovements from "@/components/TransferOrderMovementsCard";
import InventoryAuditAndCostHistoryCard from "@/components/InventoryAuditAndCostHistoryCard";
import RecentDropshipOrdersCard from "@/components/RecentDropshipOrdersCard";
import Search from "@/components/Search";
import QuickActions from "@/components/QuickActions";
import AlertsListCard from "@/components/AlertsListCard";
import SavedSearches from "@/components/SavedSearches";
import OpenPurchaseOrdersCard from "@/components/OpenPurchaseOrdersCard";
import AllocationOverviewCard from "@/components/AllocationOverviewCard";
import InboundReceiptExceptionsCard from "@/components/InboundReceiptExceptionsCard";
import AlertsExceptionsCard from "@/components/AlertsExceptionsCard";

const quickItems = [
    {
        name: "Create Order",
        icon: createOrderIcon,
        onClick: () => console.log("Create Order"),
    },
    {
        name: "Search Order",
        icon: searchProductIcon,
        onClick: () => console.log("Search Order"),
    },
    {
        name: "Create Business",
        icon: createBusinessIcon,
        onClick: () => console.log("Create Business"),
    },
    {
        name: "Search Business",
        icon: customersIcon,
        onClick: () => console.log("Search Business"),
    },
    {
        name: "Create Return",
        icon: createReturnIcon,
        onClick: () => console.log("Create Return"),
    },
    {
        name: "Manage Return",
        icon: returnsIcon,
        onClick: () => console.log("Manage Return"),
    },
    {
        name: "Track Shipment",
        icon: trackShipmentIcon,
        onClick: () => console.log("Track Shipment"),
    },
];

const Home = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Search
                    placeholder="1223|"
                    defaultValue=""
                    onSearch={(v: string) => console.log("order search", v)}
                    title="Order Search"
                />

                <Search
                    placeholder="Enter name, email, phone..."
                    defaultValue=""
                    onSearch={(v: string) => console.log("customer search", v)}
                    title="Customer Search"
                />
            </div>

            <QuickActions items={quickItems} />

            {/* Call Center Persona cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertsListCard />
                <SavedSearches />
            </div>

            {/* Inventory Persona cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PosAwaitingReceiptCard />
                <TransferOrderMovements />
                <InventoryAuditAndCostHistoryCard />
                <RecentDropshipOrdersCard />
            </div>

            {/* Planning Persona */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OpenPurchaseOrdersCard />
                <InboundReceiptExceptionsCard />
                <AllocationOverviewCard />

                <div className="lg:col-span-3">
                    <AlertsExceptionsCard />
                </div>
            </div>
        </div>
    );
};

export default Home;
