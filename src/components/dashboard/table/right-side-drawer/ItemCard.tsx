import React from "react";
import { Input } from "@/components/ui/input";

interface ILineItem {
    trackingId: string;
    description: string;
    details: string;
    quantity: string;
    unit: string;
    price: string;
    imageUrl: string;
}

interface IItemCardProps {
    item: ILineItem;
}

export const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
    return (
        <div className="w-full p-2.5 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-200 flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
                <img
                    className="w-20 h-20 rounded-lg shrink-0"
                    src={item.imageUrl}
                    alt={item.description}
                />
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center flex-wrap gap-1">
                        <span className="text-gray-800 text-sm font-semibold leading-5">
                            Tracking ID:{" "}
                        </span>
                        <span className="text-tertiary text-sm font-semibold leading-5">
                            {item.trackingId}
                        </span>
                    </div>
                    <div className="text-gray-800 text-xs font-medium leading-5">
                        {item.description}
                    </div>
                    <div className="text-gray-500 text-xs font-medium leading-4">
                        {item.details}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 text-xs font-normal">
                        Qty.
                    </span>
                    <Input
                        value={item.quantity}
                        className="w-16 h-7 px-3 py-1.5 rounded outline-[0.30px] outline-offset-[-0.30px] outline-gray-500 flex justify-center items-center text-gray-500 text-xs! font-normal disabled:opacity-70"
                        disabled
                    />
                    <span className="text-gray-500 text-xs font-normal">
                        {item.unit}
                    </span>
                </div>
                <div className="text-gray-800 text-xs font-semibold leading-5">
                    {item.price}
                </div>
            </div>
        </div>
    );
};

export type { ILineItem };
