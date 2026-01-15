import {
    ActiveQuotesCard,
    CustomerSpanshotCard,
    PricingAndMarginInsideCard,
    SalesAlertAndApprovalCard,
} from "@/components/dashboard/personas/inside-sales";

const InsideSalesPersona = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <PricingAndMarginInsideCard />
                <CustomerSpanshotCard />
                <ActiveQuotesCard />

                <div className="col-span-full">
                    <SalesAlertAndApprovalCard />
                </div>
            </div>
        </>
    );
};

export default InsideSalesPersona;
