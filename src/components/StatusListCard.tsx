import React from "react";
import Badge from "@/components/ui/Badge";

type BadgeVariant = "danger" | "warning" | "success" | "info" | "neutral";

export interface StatusItem {
    id?: string; // left primary id or code
    primary: string; // main left text
    secondary?: string; // small left text under primary
    center?: string; // center text (e.g., progress or route)
    badge?: string; // badge text
    badgeVariant?: BadgeVariant;
    actionLabel?: string; // right action label
    onAction?: () => void;
}

// Badge moved to shared component at src/components/ui/Badge.tsx

interface Props {
    title: string;
    viewAllLabel?: string;
    onViewAll?: () => void;
    items: StatusItem[];
    columns?: 2 | 3;
}

export default function StatusListCard({
    title,
    viewAllLabel,
    onViewAll,
    items,
    columns = 3,
}: Props) {
    return (
        <div className="mt-6 bg-white border border-[#EEF2F6] rounded-2xl p-6 w-full h-full flex flex-col">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                {viewAllLabel && (
                    <button
                        onClick={onViewAll}
                        className="text-sm text-tertiary cursor-pointer hover:underline"
                    >
                        {viewAllLabel}
                    </button>
                )}
            </div>

            <ul className="mt-4 divide-y divide-gray-100 flex-1">
                {items.map((it, idx) => (
                    <li key={idx} className="flex items-center py-4">
                        <div className={columns === 3 ? "w-1/3" : "w-1/2"}>
                            <div className="text-sm text-gray-700 font-medium">
                                {it.primary}
                            </div>
                            {it.secondary && (
                                <div className="text-xs text-gray-400">
                                    {it.secondary}
                                </div>
                            )}
                        </div>

                        {columns === 3 && (
                            <div className="w-1/3 pl-20 text-left text-sm text-gray-500">
                                {it.center}
                            </div>
                        )}

                        <div
                            className={
                                columns === 3
                                    ? "w-1/3 flex items-center justify-end gap-4"
                                    : "w-1/2 flex items-center justify-end gap-4"
                            }
                        >
                            {columns === 2 && it.center && (
                                <div className="text-sm text-gray-500">
                                    {it.center}
                                </div>
                            )}

                            {it.badge && (
                                <Badge variant={it.badgeVariant || "neutral"}>
                                    {it.badge}
                                </Badge>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
