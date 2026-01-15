import createOrderIcon from "@/assets/icons/create-order-tertiary.svg";
import searchProductIcon from "@/assets/icons/search-order-tertiary.svg";
import createBusinessIcon from "@/assets/icons/create-business-tertiary.svg";
import customersIcon from "@/assets/icons/search-business-tertiary.svg";
import createReturnIcon from "@/assets/icons/returns-tertiary.svg";
import returnsIcon from "@/assets/icons/returns-tertiary.svg";
import trackShipmentIcon from "@/assets/icons/track-shipment-tertiary.svg";

import Search from "@/components/dashboard/Search";
import QuickActions from "@/components/dashboard/QuickActions";

import CallCenterPersona from "@/pages/dashboard/home/personas/CallCenter";
import InventoryPersona from "@/pages/dashboard/home/personas/Inventory";
import ItTeamPersona from "@/pages/dashboard/home/personas/ItTeam";
import PlanningPersona from "@/pages/dashboard/home/personas/Planning";
import CreditPersona from "@/pages/dashboard/home/personas/Credit";
import InsideSalesPersona from "@/pages/dashboard/home/personas/InsideSales";

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

      {/* Call Center Persona */}
      <CallCenterPersona />

      {/* Inventory Persona */}
      <InventoryPersona />

      {/* IT Team Persona */}
      <ItTeamPersona />

      {/* Planning Persona */}
      <PlanningPersona />

      {/* Credit Persona */}
      <CreditPersona />

      {/* Inside Sales Persona */}
      <InsideSalesPersona />
    </div>
  );
};

export default Home;
