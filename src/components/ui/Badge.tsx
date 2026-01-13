import React from "react";

export type BadgeVariant =
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "neutral";

export default function Badge({
    children,
    variant = "neutral",
}: {
    children: React.ReactNode;
    variant?: BadgeVariant;
}) {
    const map: Record<BadgeVariant, string> = {
        danger: "bg-red-100 text-red-700",
        warning: "bg-yellow-100 text-yellow-800",
        success: "bg-green-100 text-green-700",
        info: "bg-blue-100 text-blue-800",
        neutral: "bg-gray-100 text-gray-800",
    };

    return (
        <span
            className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${map[variant]}`}
        >
            {children}
        </span>
    );
}
