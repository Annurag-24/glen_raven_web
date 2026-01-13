import createOrderIcon from "@/assets/icons/create-order-tertiary.svg?url";
import searchOrderIcon from "@/assets/icons/search-order-tertiary.svg?url";
import createBusinessIcon from "@/assets/icons/create-business-tertiary.svg?url";
import searchBusinessIcon from "@/assets/icons/search-business-tertiary.svg?url";
import createReturnIcon from "@/assets/icons/returns-tertiary.svg?url";
import manageReturnIcon from "@/assets/icons/returns-tertiary.svg?url";
import trackShipmentIcon from "@/assets/icons/track-shipment-tertiary.svg?url";

export interface QuickActionItem {
    name: string;
    icon: string;
    onClick?: () => void;
}

export const quickActions: QuickActionItem[] = [
    {
        name: "Create Order",
        icon: createOrderIcon,
        onClick: () => console.log("Create Order"),
    },
    {
        name: "Search Order",
        icon: searchOrderIcon,
        onClick: () => console.log("Search Order"),
    },
    {
        name: "Create Business",
        icon: createBusinessIcon,
        onClick: () => console.log("Create Business"),
    },
    {
        name: "Search Business",
        icon: searchBusinessIcon,
        onClick: () => console.log("Search Business"),
    },
    {
        name: "Create Return",
        icon: createReturnIcon,
        onClick: () => console.log("Create Return"),
    },
    {
        name: "Manage Return",
        icon: manageReturnIcon,
        onClick: () => console.log("Manage Return"),
    },
    {
        name: "Track Shipment",
        icon: trackShipmentIcon,
        onClick: () => console.log("Track Shipment"),
    },
];
