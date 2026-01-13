// React import not required with the new JSX transform
import Search from "@/components/Search";
import QuickActions from "@/components/QuickActions";
import { quickActions } from "@/constants/quickActions";
import AlertsList from "@/components/AlertsList";
import SavedSearches from "@/components/SavedSearches";
import StatusListCard from "@/components/StatusListCard";

const Home = () => {
    // quickActions moved to `src/constants/quickActions`

    return (
        <div className="p-6">
            <div className="mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <Search
                        placeholder="1223|"
                        defaultValue=""
                        onSearch={(v) => console.log("order search", v)}
                        title="Order Search"
                    />

                    <Search
                        placeholder="Enter name, email, phone..."
                        defaultValue=""
                        onSearch={(v) => console.log("customer search", v)}
                        title="Customer Search"
                    />
                </div>

                <QuickActions items={quickActions} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <AlertsList />
                    </div>
                    <div>
                        <SavedSearches />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
                    <StatusListCard
                        title="POs Awaiting Receipt / Validation"
                        columns={3}
                        viewAllLabel="View All"
                        onViewAll={() => console.log("view all POs")}
                        items={[
                            {
                                primary: "PO-008765",
                                secondary: "ACME Corp",
                                center: "500 / 1000",
                                badge: "Partially Received",
                                badgeVariant: "warning",
                                actionLabel: "View",
                                onAction: () => console.log("view PO-008765"),
                            },
                            {
                                primary: "PO-008764",
                                secondary: "Global Tech",
                                center: "0 / 250",
                                badge: "Receipt Started",
                                badgeVariant: "danger",
                                actionLabel: "View",
                                onAction: () => console.log("view PO-008764"),
                            },
                            {
                                primary: "PO-008763",
                                secondary: "Supply Inc.",
                                center: "1500 / 1500",
                                badge: "Received",
                                badgeVariant: "success",
                                actionLabel: "View",
                                onAction: () => console.log("view PO-008763"),
                            },
                        ]}
                    />

                    <StatusListCard
                        title="Transfer Order Movements"
                        columns={2}
                        viewAllLabel="View All"
                        onViewAll={() => console.log("view all transfers")}
                        items={[
                            {
                                primary: "TO-112233",
                                secondary: "NYC-01 → LAX-02 | Pending: 200",
                                badge: "In Transit",
                                badgeVariant: "info",
                                actionLabel: "View",
                                onAction: () => console.log("view TO-112233"),
                            },
                            {
                                primary: "TO-112232",
                                secondary: "CHI-01 → MIA-01 | Pending: 0",
                                badge: "Received",
                                badgeVariant: "success",
                                actionLabel: "View",
                                onAction: () => console.log("view TO-112232"),
                            },
                            {
                                primary: "TO-112234",
                                secondary: "LAX-02 → NYC-01 | Pending: 50",
                                badge: "Pending",
                                badgeVariant: "neutral",
                                actionLabel: "View",
                                onAction: () => console.log("view TO-112234"),
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
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

const quickItems = [
  {
    title: "Create Order",
    icon: createOrderIcon,
    onClick: () => console.log("Create Order"),
  },
  {
    title: "Search Order",
    icon: searchProductIcon,
    onClick: () => console.log("Search Order"),
  },
  {
    title: "Create Business",
    icon: createBusinessIcon,
    onClick: () => console.log("Create Business"),
  },
  {
    title: "Search Business",
    icon: customersIcon,
    onClick: () => console.log("Search Business"),
  },
  {
    title: "Create Return",
    icon: createReturnIcon,
    onClick: () => console.log("Create Return"),
  },
  {
    title: "Manage Return",
    icon: returnsIcon,
    onClick: () => console.log("Manage Return"),
  },
  {
    title: "Track Shipment",
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
          onSearch={(v) => console.log("order search", v)}
          title="Order Search"
        />

        <Search
          placeholder="Enter name, email, phone..."
          defaultValue=""
          onSearch={(v) => console.log("customer search", v)}
          title="Customer Search"
        />
      </div>

      <QuickActions items={quickItems} />

      {/* Inventory Persona cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PosAwaitingReceiptCard />
        <TransferOrderMovements />
        <InventoryAuditAndCostHistoryCard />
        <RecentDropshipOrdersCard />
      </div>
    </div>
  );
};

export default Home;
