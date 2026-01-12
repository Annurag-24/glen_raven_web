import HomeIcon from "@/assets/icons/home.svg";
import OrdersIcon from "@/assets/icons/orders.svg";
import CustomersIcon from "@/assets/icons/customers.svg";
import ReturnsIcon from "@/assets/icons/returns.svg";
import InventoryIcon from "@/assets/icons/inventory.svg";
import QuoteCreationIcon from "@/assets/icons/quote-creation.svg";
import SearchProductIcon from "@/assets/icons/search-product.svg";
import CreateOrderIcon from "@/assets/icons/create-order.svg";
import CreateReturnIcon from "@/assets/icons/create-return.svg";
import CreateBusinessIcon from "@/assets/icons/create-business.svg";
import DraftOrderIcon from "@/assets/icons/draft-orders.svg";
import FindInvoiceIcon from "@/assets/icons/find-invoice.svg";
import ResolveHoldsIcon from "@/assets/icons/resolve-holds.svg";
import TrackShipmentIcon from "@/assets/icons/track-shipment.svg";

export interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

export interface ActionItem {
  name: string;
  icon: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { name: "Home", icon: HomeIcon, path: "/" },
  { name: "Orders", icon: OrdersIcon, path: "/orders" },
  { name: "Customers", icon: CustomersIcon, path: "/customers" },
  { name: "Returns", icon: ReturnsIcon, path: "/returns" },
  { name: "Inventory", icon: InventoryIcon, path: "/inventory" },
  { name: "Quote\nCreation", icon: QuoteCreationIcon, path: "/quote-creation" },
  { name: "Search\nProduct", icon: SearchProductIcon, path: "/search-product" },
];

export const actionItems: ActionItem[] = [
  { name: "Create Order", icon: CreateOrderIcon, path: "/create-order" },
  { name: "Create Return", icon: CreateReturnIcon, path: "/create-return" },
  {
    name: "Create Business",
    icon: CreateBusinessIcon,
    path: "/create-business",
  },
  { name: "Draft Orders", icon: DraftOrderIcon, path: "/draft-orders" },
  { name: "Find Invoice", icon: FindInvoiceIcon, path: "/find-invoice" },
  { name: "Resolve Holds", icon: ResolveHoldsIcon, path: "/resolve-holds" },
  { name: "Track Shipment", icon: TrackShipmentIcon, path: "/track-shipment" },
];
