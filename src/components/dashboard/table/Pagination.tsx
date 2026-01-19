import React, { useState } from "react";
import Select from "../../input/Select";

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    resultsPerPage?: number;
    resultsPerPageOptions?: number[];
    onPageChange: (page: number) => void;
    onResultsPerPageChange?: (resultsPerPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    currentPage: initialPage,
    totalPages,
    resultsPerPage: initialResultsPerPage = 15,
    resultsPerPageOptions = [10, 15, 20, 25, 50],
    onPageChange,
    onResultsPerPageChange,
}) => {
    // Fully manage local state - don't rely on parent to update props
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1 && val <= totalPages) {
            onPageChange(val);
        }
    };

    const handlePageInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) {
            e.target.value = String(currentPage);
        } else if (val > totalPages) {
            e.target.value = String(totalPages);
            onPageChange(totalPages);
        }
    };

    const handlePageIncrement = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageDecrement = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const selectOptions = resultsPerPageOptions.map((opt) => ({
        value: String(opt),
        label: String(opt),
    }));

    return (
        <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-t border-[#E4E4E7]">
            {/* Left group: Previous, Page select, Next */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm font-medium bg-white rounded-[6px] ${
                        currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-tertiary hover:bg-gray-50 cursor-pointer"
                    }`}
                >
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    <Select
                        options={Array.from({ length: totalPages }, (_, i) => ({
                            value: String(i + 1),
                            label: String(i + 1),
                        }))}
                        value={String(currentPage)}
                        onChange={(val) => {
                            const newPage = parseInt(val, 10);
                            setCurrentPage(newPage);
                            onPageChange(newPage);
                        }}
                        placeholder="Page"
                        showSearch={false}
                        showClear={false}
                        className="w-18 rounded-[12px] border border-[#E4E4E7] bg-[#F4F4F5]"
                    />
                    <span className="text-sm text-gray-900 whitespace-nowrap">
                        of {totalPages}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm font-medium bg-white rounded-[6px] ${
                        currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-tertiary hover:bg-gray-50 cursor-pointer"
                    }`}
                >
                    Next
                </button>
            </div>

            {/* Right group: Results per page label + dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900 whitespace-nowrap">
                    Results per page
                </span>
                <Select
                    options={selectOptions}
                    value={String(resultsPerPage)}
                    onChange={(val) => {
                        const newValue = parseInt(val, 10);
                        setResultsPerPage(newValue);
                        onResultsPerPageChange?.(newValue);
                    }}
                    placeholder="Select"
                    showSearch={false}
                    showClear={false}
                    className="w-16 bg-white border border-[#E0E0E0] rounded-sm disabled:bg-gray-50"
                />
            </div>
        </div>
    );
};

export default Pagination;
