import React from "react";
import { cn } from "@/lib/utils";

export interface DeliveryAddress {
    line1: string;
    area?: string;
    city: string;
    state?: string;
    country?: string;
    postalCode?: string;
    icon: string;
}

interface DeliverAddressProps {
    address: DeliveryAddress;
    className?: string;
}

const DeliverAddress: React.FC<DeliverAddressProps> = ({
    address,
    className,
}) => {
    const formattedAddress = [
        address.line1,
        address.area,
        address.city,
        address.state,
        address.country,
        address.postalCode,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className={cn("bg-white p-4 rounded-lg", className)}>
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-[28px] h-[28px] rounded-full bg-[#E6F1FD] flex items-center justify-center">
                <img
                    src={address.icon}
                    alt="Deliver Icon"
                    className="object-contain"
                />
</div>
                {/* Text Content */}
                <div className="flex flex-col gap-[8px]">
                    <span className="text-sm font-semibold text-gray-800">
                        Deliver To
                    </span>
                    <span className="text-sm text-gray-500">
                        {formattedAddress}
                    </span>
                </div>
            </div>
        </div>

    );
};

export default DeliverAddress;
