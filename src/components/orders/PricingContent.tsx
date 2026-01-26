import React from "react";
import {
    CardTable,
    CardTableHeader,
    CardTableHeaderCell,
    CardTableBody,
    CardTableRow,
    CardTableCell,
    CardTableCellPrimary,
} from "@/components/dashboard/DashboardCard";

export interface PricingData {
    subtotal: string;
    discounts: Array<{
        label: string;
        value: string;
        type?: string;
    }>;
    totalDiscount: string;
    finalPrice: string;
}

interface IPricingContentProps {
    data: PricingData;
    className?: string;
}

const PricingContent: React.FC<IPricingContentProps> = ({ data, className }) => {
    return (
        <div className={className}>
            <CardTable>
                <CardTableHeader>
                    <CardTableHeaderCell width="w-48">ITEM</CardTableHeaderCell>
                    <CardTableHeaderCell>AMOUNT</CardTableHeaderCell>
                </CardTableHeader>
                <CardTableBody>
                    <CardTableRow>
                        <CardTableCellPrimary width="w-48">Subtotal</CardTableCellPrimary>
                        <CardTableCell>{data.subtotal}</CardTableCell>
                    </CardTableRow>

                    {data.discounts.map((discount, idx) => (
                        <CardTableRow key={idx}>
                            <CardTableCellPrimary width="w-48" className="text-[#036FED]">
                                {discount.label}
                            </CardTableCellPrimary>
                            <CardTableCell className="text-[#036FED] font-medium">
                                {discount.value}
                            </CardTableCell>
                        </CardTableRow>
                    ))}

                    <CardTableRow>
                        <CardTableCellPrimary width="w-48">Total Discount</CardTableCellPrimary>
                        <CardTableCell className="text-[#036FED] font-semibold">
                            {data.totalDiscount}
                        </CardTableCell>
                    </CardTableRow>

                    <CardTableRow isLast>
                        <CardTableCellPrimary width="w-48" className="text-base font-bold">
                            Final Price
                        </CardTableCellPrimary>
                        <CardTableCell className="text-base font-bold text-gray-900">
                            {data.finalPrice}
                        </CardTableCell>
                    </CardTableRow>
                </CardTableBody>
            </CardTable>
        </div>
    );
};

export default PricingContent;
