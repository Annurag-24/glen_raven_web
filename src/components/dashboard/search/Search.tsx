import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
    placeholder?: string;
    defaultValue?: string;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    title?: string;
}

export default function Search({
    placeholder = "",
    defaultValue = "",
    onSearch,
    onChange,
    title = "",
}: SearchProps) {
    const [value, setValue] = useState(defaultValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-bold leading-7 text-grey-600 mb-3">
                {title}
            </h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch?.(value);
                }}
                className="flex items-center gap-3"
            >
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="flex-1 h-12 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 input-border"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-lg h-12 w-16 focus:outline-none focus:ring-2 focus:ring-tertiary/40 cursor-pointer"
                >
                    <SearchIcon size={18} />
                </button>
            </form>
        </div>
    );
}
