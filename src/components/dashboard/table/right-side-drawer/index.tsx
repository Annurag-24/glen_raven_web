import { cn } from "@/lib/utils";
import { useState } from "react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

interface IRightSideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

interface IRightSideDrawerAccordion {
    title: string;
    children: React.ReactNode;
    isInitiallyOpen?: boolean;
    openBg?: string;
    closedBg?: string;
}

interface IRightSideDrawerAccordionItem {
    label: string;
    value: string;
    labelClassName?: string;
    valueClassName?: string;
}

const RightSideDrawer: React.FC<IRightSideDrawerProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            {/* Drawer */}
            <div
                className="fixed right-0 top-14 bottom-0 w-96 px-4 py-6 bg-white shadow-lg z-50 border border-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>
    );
};

export const RightSideDrawerAccordion: React.FC<IRightSideDrawerAccordion> = ({
    title,
    children,
    isInitiallyOpen = false,
    openBg = "bg-white",
    closedBg = "bg-gray-50",
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(isInitiallyOpen);

    return (
        <div
            className={cn([
                "p-4 rounded-md outline-1 -outline-offset-1 outline-gray-100",
                isOpen ? openBg : closedBg,
            ])}
        >
            <div
                className={cn([
                    "w-full flex justify-between items-center cursor-pointer",
                    isOpen && "border-b border-gray-200 pb-3 mb-3",
                ])}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-gray-700 text-sm font-semibold leading-3">
                    {title}
                </div>
                <img
                    src={ChevronDownIcon}
                    alt="Chevron Down"
                    className={cn([
                        "w-3.5 h-3.5 transition-transform",
                        isOpen && "rotate-180",
                    ])}
                />
            </div>

            {isOpen && <div>{children}</div>}
        </div>
    );
};

export const RightSideDrawerAccordionItem: React.FC<
    IRightSideDrawerAccordionItem
> = ({ label, value, labelClassName, valueClassName }) => {
    return (
        <div className="w-full flex justify-between items-start gap-4">
            <span
                className={cn([
                    "text-gray-500 text-sm font-normal w-24 shrink-0",
                    labelClassName && labelClassName,
                ])}
            >
                {label}
            </span>
            <span
                className={cn([
                    "text-gray-700 text-sm font-semibold text-right",
                    valueClassName && valueClassName,
                ])}
            >
                {value}
            </span>
        </div>
    );
};

export default RightSideDrawer;
