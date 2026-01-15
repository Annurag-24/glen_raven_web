import DashboardCard, {
    CardPrimaryText,
    CardSecondaryText,
} from "@/components/dashboard/DashboardCard";
import Badge from "@/components/Badge";

const data = [
    {
        order: "Y10034512",
        name: "John Doe",
        holdApplied: "2023-10-26",
        amount: "$1,250.75",
        badge: { label: "Credit Limit Exceeded", variant: "warning" },
    },
    {
        order: "Y10034509",
        name: "Jane Smith",
        holdApplied: "2023-10-25",
        amount: "$845.00",
        badge: { label: "Risk Hold", variant: "error" },
    },
    {
        order: "Y10034498",
        name: "Michael Johnson",
        holdApplied: "2023-10-24",
        amount: "$2,310.20",
        badge: { label: "Validation Failure", variant: "peach" },
    },
];

export default function CreditHoldCard() {
    return (
        <DashboardCard
            title="Orders on Credit Hold"
            showViewAll
            wrapperClassName="w-full"
        >
            <div className="flex flex-col gap-4">
                {data.map((d, idx) => (
                    <div
                        key={d.order}
                        className={`py-4 ${
                            idx !== data.length - 1
                                ? "border-b border-gray-100"
                                : ""
                        }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <CardPrimaryText className="mb-1">
                                    Order: {d.order}
                                </CardPrimaryText>
                                <div className="text-sm text-[#6B7280]">
                                    {d.name}
                                </div>
                                <CardSecondaryText color="text-[#6B7280]">
                                    Hold Applied: {d.holdApplied}
                                </CardSecondaryText>

                                <div className="mt-3 flex items-center gap-4">
                                    <button className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-lg h-9 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/40 cursor-pointer">
                                        Resolve Hold
                                    </button>
                                    <a
                                        href="#"
                                        className="text-sm text-tertiary hover:underline"
                                    >
                                        View Order
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <div className="mb-2 text-right">
                                    <div className="text-lg font-semibold text-gray-800">
                                        {d.amount}
                                    </div>
                                    <div className="mt-2">
                                        <Badge
                                            variant={d.badge.variant as any}
                                            title={d.badge.label}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
