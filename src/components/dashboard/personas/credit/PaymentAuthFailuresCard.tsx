import DashboardCard, {
    CardPrimaryText,
    CardSecondaryText,
} from "@/components/dashboard/DashboardCard";

const data = [
    {
        order: "Y10034502",
        card: "Visa **** 4242",
        attempts: 3,
        error: "CyberSource: 204 - Invalid CVV",
        amount: "$300.50",
    },
    {
        order: "Y10034491",
        card: "Amex **** 1005",
        attempts: 2,
        error: "CyberSource: 202 - Expired Card",
        amount: "$1,580.00",
    },
];

export default function PaymentAuthFailuresCard() {
    return (
        <DashboardCard
            title="Payment Authorization Failures"
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
                                <div className="text-sm text-gray-600">
                                    {d.card}
                                </div>
                                <CardSecondaryText>
                                    Attempts: {d.attempts}
                                </CardSecondaryText>

                                <div className="mt-2 text-sm text-[#DC2626]">
                                    {d.error}
                                </div>

                                <div className="mt-3 flex items-center gap-4">
                                    <button className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-lg h-9 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/40 cursor-pointer">
                                        Retry Payment
                                    </button>

                                    <a
                                        href="#"
                                        className="text-sm text-tertiary hover:underline"
                                    >
                                        View Payment Details
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <div className="text-lg font-semibold text-gray-800">
                                    {d.amount}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
