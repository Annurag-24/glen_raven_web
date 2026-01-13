interface AlertItem {
    id: string;
    time: string;
    name: string;
    variant?: "danger" | "warning" | "info" | "neutral";
}

import Badge from "@/components/ui/Badge";

export default function AlertsList({ items }: { items?: AlertItem[] }) {
    const data = items ?? [
        {
            id: "#ORD-00117",
            time: "2 min ago",
            name: "Credit Hold",
            variant: "danger",
        },
        {
            id: "#ORD-00115",
            time: "1 hour ago",
            name: "Payment Failure",
            variant: "danger",
        },
        {
            id: "#ORD-00114",
            time: "4 hours ago",
            name: "Shipment Exception",
            variant: "warning",
        },
        {
            id: "#ORD-00112",
            time: "1 day ago",
            name: "Return Exception",
            variant: "warning",
        },
    ];

    return (
        <div className="mt-6 bg-white border border-[#EEF2F6] rounded-2xl p-6 w-full h-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Open Alerts & Exception
            </h3>

            <ul className="space-y-4">
                {data.map((it) => (
                    <li
                        key={it.id}
                        className="flex items-center justify-between gap-4"
                    >
                        <div>
                            <div className="text-sm text-gray-700 font-medium">
                                {it.id}
                            </div>
                            <div className="text-xs text-gray-400">
                                {it.time}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant={it.variant}>{it.name}</Badge>
                            <button className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-lg h-10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/40 cursor-pointer">
                                View Order
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
