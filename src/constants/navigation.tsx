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
import AllOrders from "@/pages/dashboard/tabs/orders/All";

import OrderTracking from "@/pages/dashboard/tabs/orders/OrderTrack";
import AllCustomers from "@/pages/dashboard/tabs/customers/All";
import OrderLines from "@/pages/dashboard/tabs/order-lines/OrderLines";

export interface IMenuItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  isHome?: boolean;
  getContent?: () => React.ReactNode;
}

export interface IActionItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  getContent?: () => React.ReactNode;
}

export interface IDrawerMenuItem {
  id: string;
  name: string;
  icon: string;
  path?: string;
  getContent?: () => React.ReactNode;
  children?: {
    id: string;
    name: string;
    path: string;
    getContent?: () => React.ReactNode;
  }[];
}

export const menuItems: IMenuItem[] = [
  {
    id: "home",
    name: "Home",
    icon: HomeIcon,
    path: "/",
    isHome: true,
  },
  {
    id: "orders",
    name: "Orders",
    icon: OrdersIcon,
    path: "/orders",
    getContent: () => <AllOrders />,
  },
  {
    id: "ordertracking",
    name: "Orders Tracking",
    icon: OrdersIcon,
    path: "/orders",
    getContent: () => <OrderTracking />,
  },
  {
    id: "customers",
    name: "Customers",
    icon: CustomersIcon,
    path: "/customers",
    getContent: () => <AllCustomers />,
  },
  {
    id: "order-lines",
    name: "Order Lines",
    icon: CustomersIcon,
    path: "/order-lines",
    getContent: () => <OrderLines />,
  },
  {
    id: "returns",
    name: "Returns",
    icon: ReturnsIcon,
    path: "/returns",
    getContent: () => <p>under development</p>,
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: InventoryIcon,
    path: "/inventory",
    getContent: () => <p>under development</p>,
  },
  {
    id: "quote-creation",
    name: "Quote\nCreation",
    icon: QuoteCreationIcon,
    path: "/quote-creation",
    getContent: () => <p>under development</p>,
  },
  {
    id: "search-product",
    name: "Search\nProduct",
    icon: SearchProductIcon,
    path: "/search-product",
    getContent: () => <p>under development</p>,
  },
];

export const actionItems: IActionItem[] = [
  {
    id: "create-order",
    name: "Create Order",
    icon: CreateOrderIcon,
    path: "/create-order",
    getContent: () => <p>under development</p>,
  },
  {
    id: "create-return",
    name: "Create Return",
    icon: CreateReturnIcon,
    path: "/create-return",
    getContent: () => <p>under development</p>,
  },
  {
    id: "create-business",
    name: "Create Business",
    icon: CreateBusinessIcon,
    path: "/create-business",
    getContent: () => <p>under development</p>,
  },
  {
    id: "draft-orders",
    name: "Draft Orders",
    icon: DraftOrderIcon,
    path: "/draft-orders",
    getContent: () => <p>under development</p>,
  },
  {
    id: "find-invoice",
    name: "Find Invoice",
    icon: FindInvoiceIcon,
    path: "/find-invoice",
    getContent: () => <p>under development</p>,
  },
  {
    id: "resolve-holds",
    name: "Resolve Holds",
    icon: ResolveHoldsIcon,
    path: "/resolve-holds",
    getContent: () => <p>under development</p>,
  },
  {
    id: "track-shipment",
    name: "Track Shipment",
    icon: TrackShipmentIcon,
    path: "/track-shipment",
    getContent: () => <p>under development</p>,
  },
];

export const drawerMenuItems: IDrawerMenuItem[] = [
  {
    id: "home",
    name: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    id: "orders",
    name: "Orders",
    icon: OrdersIcon,
    path: "/orders",
    getContent: () => <AllOrders />,
  },
  {
    id: "customers",
    name: "Customers",
    icon: CustomersIcon,
    path: "/customers",
    getContent: () => <p>under development</p>,
  },
  {
    id: "returns",
    name: "Returns",
    icon: ReturnsIcon,
    path: "/returns",
    getContent: () => <p>under development</p>,
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: InventoryIcon,
    children: [
      {
        id: "inventory-console",
        name: "Inventory Console",
        path: "/inventory",
        getContent: () => <p>under development</p>,
      },
      {
        id: "adjust-inventory",
        name: "Adjust Inventory",
        path: "/inventory/adjust",
        getContent: () => <p>under development</p>,
      },
    ],
  },
  {
    id: "quote-creation",
    name: "Quote Creation",
    icon: QuoteCreationIcon,
    path: "/quote-creation",
    getContent: () => <p>under development</p>,
  },
  {
    id: "search-product",
    name: "Search Product",
    icon: SearchProductIcon,
    path: "/search-product",
    getContent: () => <p>under development</p>,
  },
];
