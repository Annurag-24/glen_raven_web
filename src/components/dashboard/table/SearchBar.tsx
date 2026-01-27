import React from "react";
import { cn } from "@/lib/utils";
import {
    Search,
    RotateCw,
    Filter,
    Settings,
    Upload,
    X,
    Check,
    Trash2,
} from "lucide-react";

export type SearchBarCustomButton = {
    key: string;
    title?: string;
    icon?: React.ReactNode;
    show?: boolean;
    className?: string;
    onClick?: () => void;
    showBorder?: boolean;
};

export type SearchBarProps = {
    placeholder?: string;
    widthClass?: string; // e.g. 'sm:w-80 lg:w-96'
    value?: string;
    defaultValue?: string;
    onChange?: (val: string) => void;
    showRefresh?: boolean;
    showFilter?: boolean;
    showSettings?: boolean;
    showExport?: boolean;
    exportLabel?: string;
    onRefresh?: () => void;
    onFilter?: () => void;
    onSettings?: () => void;
    onExport?: () => void;
    customButtons?: SearchBarCustomButton[];
    filtersApplied?: boolean;
    onClearSearch?: () => void;
    onSaveSearch?: () => void;
    onDeleteSearch?: () => void;
    showBorder?: boolean;
};

const IconButton: React.FC<
    {
        title?: string;
        className?: string;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, title, className, ...props }) => {
    const defaultClasses =
        "inline-flex items-center justify-center rounded-[6px] cursor-pointer";
    const baseClasses = className
        ? `${defaultClasses} ${className}`
        : `${defaultClasses} h-9 w-9 bg-white border border-[#E4E4E7]`;

    return (
        <button type="button" title={title} className={baseClasses} {...props}>
            {children}
        </button>
    );
};

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search",
    widthClass = "sm:w-80 lg:w-96",
    value,
    defaultValue,
    onChange,
    showRefresh = true,
    showFilter = true,
    showSettings = true,
    showExport = true,
    exportLabel = "Export",
    onRefresh,
    onFilter,
    onSettings,
    onExport,
    customButtons = [],
    filtersApplied = false,
    onClearSearch,
    onSaveSearch,
    onDeleteSearch,
    showBorder = true,
}) => {
    const isControlled = typeof value !== "undefined";
    const [internal, setInternal] = React.useState(defaultValue ?? "");

    React.useEffect(() => {
        if (!isControlled && typeof defaultValue !== "undefined")
            setInternal(defaultValue);
    }, [defaultValue, isControlled]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e.target.value);
    }

    const inputValue = isControlled ? (value as string) : internal;

    return (
        <div 
        className={cn(
            "w-full bg-white px-3 py-2 flex items-center justify-between",
            showBorder && "border-b border-[#E5E6F0]"
          )}
        >
            <div className={`flex-none w-full ${widthClass} pr-3`}>
                <div className="relative">
                    <input
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleChange}
                        className="w-full h-9 pl-3 pr-10 rounded-[6px] border border-gray-200 bg-gray-100 text-sm placeholder-gray-400"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-900">
                        <Search className="h-4 w-4 text-gray-900" />
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 w-full justify-end">
                <div className="flex items-center gap-2 flex-wrap">
                    {showRefresh && (
                        <IconButton
                            title="Refresh"
                            aria-label="refresh"
                            onClick={onRefresh}
                        >
                            <RotateCw className="h-4 w-4 text-gray-900" />
                        </IconButton>
                    )}

                    {showFilter && (
                        <div className="relative">
                            <IconButton
                                title="Filter"
                                aria-label="filter"
                                onClick={onFilter}
                                className={`h-9 w-9 rounded-[6px] ${
                                    filtersApplied ? "bg-gray-100" : "bg-white"
                                } border border-[#E4E4E7]`}
                            >
                                <Filter className="h-5 w-5 text-[#242424]" />
                            </IconButton>
                            {filtersApplied && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#C50F1F] ring-2 ring-white" />
                            )}
                        </div>
                    )}

                    {showSettings && (
                        <IconButton
                            title="Settings"
                            aria-label="settings"
                            onClick={onSettings}
                        >
                            <Settings className="h-4 w-4 text-gray-900" />
                        </IconButton>
                    )}

                    {customButtons
                        ?.filter((b) => b.show !== false)
                        .map((b) => (
                            <IconButton
                                key={b.key}
                                title={b.title}
                                className={b.className}
                                onClick={b.onClick}
                            >
                                {b.icon}
                            </IconButton>
                        ))}

                    {filtersApplied && (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onClearSearch}
                                className="inline-flex items-center gap-2 px-3 h-9 rounded-[6px] border border-[#C50F1F] bg-[#C50F1F1A] text-[#B91C1C] text-sm"
                            >
                                <X className="h-4 w-4 text-[#B91C1C] border border-[#B91C1C] rounded-[2px] p-0.5" />
                                <span>Clear Search</span>
                            </button>

                            <button
                                type="button"
                                onClick={onSaveSearch}
                                className="inline-flex items-center gap-2 px-3 h-9 rounded-[6px] border border-[#15803D] bg-[#15803D1A] text-[#15803D] text-sm"
                            >
                                <Check className="h-4 w-4 text-[#15803D]" />
                                <span>Save New Search</span>
                            </button>

                            <button
                                type="button"
                                onClick={onDeleteSearch}
                                className="inline-flex items-center gap-2 px-3 h-9 rounded-[6px] border border-[#C50F1F] bg-[#C50F1F1A] text-[#B91C1C] text-sm"
                            >
                                <Trash2 className="h-4 w-4 text-[#B91C1C]" />
                                <span>Delete Search</span>
                            </button>
                        </div>
                    )}
                </div>

                {showExport && (
                    <div className="flex-shrink-0">
                        <button
                            type="button"
                            onClick={onExport}
                            className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 cursor-pointer"
                        >
                            <Upload className="h-4 w-4" />
                            <span>{exportLabel}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
