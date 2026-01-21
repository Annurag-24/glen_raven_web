import React from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export type DropdownOption = {
    label: string;
    value: string;
    onClick?: () => void;
};

export type DropdownMenuProps = {
    trigger: React.ReactNode;
    options?: DropdownOption[];
    onOptionClick?: (option: DropdownOption) => void;
    align?: "start" | "end" | "center";
    className?: string;
    contentClassName?: string;
    showChevron?: boolean;
};

export default function DropdownMenu({
    trigger,
    options,
    onOptionClick,
    align = "start",
    className,
    contentClassName,
    showChevron = true,
}: DropdownMenuProps) {
    if (!options || options.length === 0) {
        return <>{trigger}</>;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={`flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors ${className || ""}`}
                >
                    {trigger}
                    {showChevron && <ChevronDown className="w-4 h-4" />}
                </button>
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className={`w-56 p-1 ${contentClassName || ""}`}
            >
                <div className="flex flex-col">
                    {options.map((option, index) => (
                        <button
                            key={option.value || index}
                            onClick={() => {
                                onOptionClick?.(option);
                                option.onClick?.();
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
