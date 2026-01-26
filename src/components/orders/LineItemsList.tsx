import LineItem, { type LineItemData } from "./LineItem";
import { cn } from "@/lib/utils";
import Pagination from "@/components/dashboard/table/Pagination";
import { useState, useMemo } from "react";

type LineItemsListProps = {
    items: LineItemData[];
    className?: string;
    itemsPerPage?: number;
    showPagination?: boolean;
};

export default function LineItemsList({ 
    items, 
    className, 
    itemsPerPage = 10,
    showPagination = true 
}: LineItemsListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    }, [items, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (items.length === 0) {
        return (
            <div className={cn("text-center py-8", className)}>
                <p className="text-sm text-gray-500">No line items found</p>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col", className)}>
            <div className="space-y-4 flex-1">
                {paginatedItems.map((item) => (
                    <LineItem key={item.id} item={item} />
                ))}
            </div>
            {showPagination && items.length > itemsPerPage && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        resultsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
}
