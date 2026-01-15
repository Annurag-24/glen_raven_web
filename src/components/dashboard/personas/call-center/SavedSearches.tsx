import { useState } from "react";
import DashboardCard, {
  CardPrimaryText,
} from "@/components/dashboard/DashboardCard";

interface SavedItem {
  id: string;
  label: string;
}

const ORDERS: SavedItem[] = [
  { id: "1", label: "Customers in California" },
  { id: "2", label: "Orders > $500 (Last 30 Days)" },
  { id: "3", label: "SKU: HD-TV-55-2023" },
  { id: "4", label: "Backordered Shipments" },
];

const CUSTOMERS: SavedItem[] = [
  { id: "1", label: "Top 50 Customers" },
  { id: "2", label: "Inactive > 90 days" },
];

export default function SavedSearches() {
  const [tab, setTab] = useState<"orders" | "customers">("orders");

  const items = tab === "orders" ? ORDERS : CUSTOMERS;

  return (
    <DashboardCard
      title="Saved Searches"
      showViewAll={false}
      wrapperClassName="w-full"
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="w-full border-b border-gray-100">
          <nav className="flex gap-6 -mb-px">
            <button
              onClick={() => setTab("orders")}
              className={`pb-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
                tab === "orders"
                  ? "text-tertiary border-b-2 border-tertiary"
                  : "text-gray-500 hover:text-tertiary/80 hover:border-b-2 hover:border-tertiary/80"
              } cursor-pointer focus:outline-none`}
            >
              Orders
            </button>

            <button
              onClick={() => setTab("customers")}
              className={`pb-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
                tab === "customers"
                  ? "text-tertiary border-b-2 border-tertiary"
                  : "text-gray-500 hover:text-tertiary/80 hover:border-b-2 hover:border-tertiary/80"
              } cursor-pointer focus:outline-none`}
            >
              Customers
            </button>
          </nav>
        </div>

        <div className="w-full">
          <ul className="flex flex-col gap-4">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <CardPrimaryText color="text-grey-500">
                    {it.label}
                  </CardPrimaryText>
                </div>
                <button
                  onClick={() => console.log("run", it.label)}
                  className="text-sm text-tertiary cursor-pointer hover:underline"
                >
                  Run
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardCard>
  );
}
