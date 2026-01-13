// React import not required with the new JSX transform
import Search from "@/components/Search";
import QuickActions from "@/components/QuickActions";
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
