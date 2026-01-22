import Badge from "@/components/Badge";
import PencilIcon from "@/assets/icons/orderpencil.svg";
import { cn } from "@/lib/utils";

export type LineItemData = {
    id: string;
    thumbnail: string;
    productName: string;
    productCode: string;
    color: string;
    location: string;
    hasSidemarks?: boolean;
    discount?: string;
    price: string;
    stockStatus: "in-stock" | "out-of-stock" | "low-stock";
    quantity: string;
    onChangePayment?: () => void;
    onManageInstruction?: () => void;
    onCancelProduct?: () => void;
    onAddLines?: () => void;
    className?: string;
};

type LineItemProps = {
    item: LineItemData;
};

export default function LineItem({ item }: LineItemProps) {
    const stockStatusConfig = {
        "in-stock": { label: "In Stock", variant: "active" as const },
        "out-of-stock": { label: "Out of Stock", variant: "error" as const },
        "low-stock": { label: "Low Stock", variant: "warning" as const },
    };

    const status = stockStatusConfig[item.stockStatus];

    return (
        <div className={cn(" rounded-lg p-4 border border-[#E4E4E7] bg-[#FFFFFF]", item.className)}>
            <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={item.thumbnail}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    <h3 className="text-[18px] font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.productName}
                    </h3>

                    {/* Product Info Row */}
                    <div className="flex items-center gap-2 text-xs text-[#71717A] mb-2 flex-wrap">
                        <span>{item.productCode}</span>
                        <span className="text-gray-300">|</span>
                        <span>{item.color}</span>
                        <span className="text-gray-300">|</span>
                        <span>{item.location}</span>
                        {item.hasSidemarks && (
                            <>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1">
                                    <span>Sidemarks</span>
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Allocation & Charges */}
                    <div className="flex items-center gap-4 text-xs text-[#71717A] mb-3">
                        <span>Allocation</span>
                        <span>Charges</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 flex-wrap">
                        {item.onChangePayment && (
                            <button
                                onClick={item.onChangePayment}
                                className="flex items-center gap-1 text-xs text-[#036FED] hover:text-gray-900 transition-colors border-r px-2"
                            >
                                <span>Change Payment</span>
                                <img src={PencilIcon} alt="Edit" className="w-3 h-3 " />

                            </button>
                        )}
                        {item.onManageInstruction && (
                            <button
                                onClick={item.onManageInstruction}
                                className="flex items-center gap-1 text-xs text-[#036FED] hover:text-gray-900 transition-colors border-r px-2"
                            >
                                <span>Manage Instruction</span>
                                <img src={PencilIcon} alt="Edit" className="w-3 h-3" />

                            </button>
                        )}
                        {item.onCancelProduct && (
                            <button
                                onClick={item.onCancelProduct}
                                className="flex items-center gap-1 text-xs text-[#036FED] hover:text-gray-900 transition-colors border-r px-2"
                            >
                                <span>Cancel Product</span>
                                <img src={PencilIcon} alt="Edit" className="w-3 h-3" />

                            </button>
                        )}
                        {item.onAddLines && (
                            <button
                                onClick={item.onAddLines}
                                className="flex items-center gap-1 text-xs text-[#036FED] hover:text-gray-900 transition-colors "
                            >

                                <span>Add Lines</span>
                                <img src={PencilIcon} alt="Edit" className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Pricing & Quantity Section */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                    {item.discount && (
                        <span className="text-sm font-medium text-[#036FED]">
                            {item.discount}
                        </span>
                    )}
                    <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                    <Badge title={status.label} variant={status.variant} className="rounded-none" />
                    <span className="text-xs text-gray-600">{item.quantity}</span>
                </div>
            </div>
        </div>
    );
}
