import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
};

export default function SearchCard({
    children,
    onClick,
    className = "",
}: Props) {
    return (
        <div
            onClick={onClick}
            className={`bg-[##A1A1A105] rounded-md p-4 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:bg-[#A1A1A112] ${className}`}
        >
            {children}
        </div>
    );
}
