import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";

export type SelectOption = {
    value: string;
    label: string;
};

export type SelectProps = {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    showSearch?: boolean;
    isOpen?: boolean;
    disabled?: boolean;
    className?: string;
    maxHeight?: string;
    showClear?: boolean;
};

export default function Select({
    label,
    placeholder = "Select option",
    options,
    value,
    defaultValue = "",
    onChange,
    showSearch = true,
    isOpen: controlledOpen,
    disabled = false,
    className = "",
    maxHeight = "max-h-64",
    showClear = true,
}: SelectProps) {
    const isControlled = typeof value !== "undefined";
    const [internal, setInternal] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selected = isControlled ? (value as string) : internal;
    const displayOpen =
        typeof controlledOpen !== "undefined" ? controlledOpen : open;

    useEffect(() => {
        if (!isControlled && defaultValue !== internal) {
            setInternal(defaultValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue, isControlled]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        if (displayOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [displayOpen]);

    function handleChange(optionValue: string) {
        if (!isControlled) setInternal(optionValue);
        onChange?.(optionValue);
        setOpen(false);
    }

    function handleClear(e: React.MouseEvent) {
        e.stopPropagation();
        if (!isControlled) setInternal("");
        onChange?.("");
    }

    const filteredOptions = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    const selectedLabel = options.find((o) => o.value === selected)?.label;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen(!displayOpen)}
                className={`flex items-center justify-between px-3 py-2 text-sm hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed ${
                    className ||
                    "w-full bg-white border border-[#E0E0E0] rounded-sm disabled:bg-gray-50"
                }`}
            >
                <span
                    className={
                        selectedLabel ? "text-[#242424]" : "text-[#707070]"
                    }
                >
                    {selectedLabel || placeholder}
                </span>
                <div className="flex items-center gap-2">
                    {selectedLabel && showClear && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear(e as any);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClear(e as any);
                                }
                            }}
                            className="hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </span>
                    )}
                    <ChevronDown
                        className={`h-4 w-4 text-[#616161] transition-transform ${
                            displayOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>
            </button>

            {displayOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#E0E0E0] rounded-md shadow-lg">
                    {showSearch && (
                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-8 pr-8 py-2 text-sm border border-[#E0E0E0] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`overflow-y-auto ${maxHeight}`}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleChange(option.value)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                        selected === option.value
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-8 text-center text-sm text-gray-500">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
