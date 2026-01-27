import { cn } from "@/lib/utils";
import { Tag ,Truck} from "lucide-react";
import DiscountIcon from "@/assets/icons/discount.svg";
export type DiscountItem = {
    title: string;
    description: string;
    icon?: "tag" | "truck";
};

export type ActiveDiscountsProps = {
    title?: string;
    items: DiscountItem[];
    className?: string;
};

export const ActiveDiscounts: React.FC<ActiveDiscountsProps> = ({
    title = "Active Discounts",
    items,
    className,
}) => {
    const renderIcon = (icon?: "tag" | "truck") => {
        if (icon === "truck") return <Truck className="w-4 h-4 text-green-700" />;
        return <Tag className="w-4 h-4 text-green-700" />;
    };

    return (
        <div
            className={cn(
                "rounded-lg border border-dashed border-[#16A34A] bg-[#16A34A0F]/60 p-4 flex flex-col gap-3",
                className,
            )}
        >
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center border border-green-200">
                    {/* simple settings-like icon built from Tag */}
                    <img src={DiscountIcon} alt="Discount" className="w-4 h-4 text-green-700" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-[#0B6936]">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="mt-1 space-y-3 pl-[13px]">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-[13px]">
                        <div className="mt-1">{renderIcon(item.icon)}</div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-[#0B6936]">
                                {item.title}
                            </p>
                        <p className="text-xs text-[#333333]">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
