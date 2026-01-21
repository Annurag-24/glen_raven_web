import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, setMonth, setYear } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import Select from "./Select";
import "react-day-picker/dist/style.css";

export type CalendarProps = {
    value?: Date;
    onChange?: (date?: Date) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
};

export default function Calendar({
    value,
    onChange,
    disabled = false,
    placeholder = "Select date",
    className = "",
}: CalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalDate, setInternalDate] = useState<Date | undefined>(value);
    const [displayMonth, setDisplayMonth] = useState<Date>(value || new Date());
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                isOpen &&
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleDayClick = (date?: Date) => {
        if (!date) return;
        setInternalDate(date);
        onChange?.(date);
        setIsOpen(false);
    };

    
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInternalDate(undefined);
        onChange?.(undefined);
    };

    const onMonthSelect = (val: string) => {
        const newMonth = parseInt(val, 10);
        const newDate = setMonth(displayMonth, newMonth);
        setDisplayMonth(newDate);
    };

    const onYearSelect = (val: string) => {
        const newYear = parseInt(val, 10);
        const newDate = setYear(displayMonth, newYear);
        setDisplayMonth(newDate);
    };

    const displayDate = value || internalDate;
    const displayText = displayDate
        ? format(displayDate, "MMM dd, yyyy")
        : placeholder;
    const currentMonth = displayMonth.getMonth();
    const currentYear = displayMonth.getFullYear();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-3 py-2 text-sm hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed ${className ||
                    "w-full bg-white border border-[#E0E0E0] rounded-sm disabled:bg-gray-50"
                    }`}
            >
                <span
                    className={
                        displayDate ? "text-[#242424]" : "text-[#707070]"
                    }
                >
                    {displayText}
                </span>
                <div className="flex items-center gap-2">
                    {displayDate && (
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
                            <X className="h-4 w-4 text-[#616161]" />
                        </span>
                    )}
                    <ChevronDown className="h-4 w-4 text-[#616161] transition-transform" />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 z-50 mt-2 p-4 bg-white border border-[#E4E4E7] rounded-[12px] shadow-lg">
                    <style>{`.rdp-month_caption{display:none !important}`}</style>
                    {/* Month, Year Selectors, and Navigation Arrows */}
                    <div className="flex gap-2 mb-4">
                        <Select
                            options={months.map((month, idx) => ({
                                value: String(idx),
                                label: month,
                            }))}
                            value={String(currentMonth)}
                            onChange={onMonthSelect}
                            placeholder="Month"
                            showSearch={false}
                            showClear={false}
                            className="flex-1 w-24 rounded-[12px] border border-[#E4E4E7] bg-[#F4F4F5]"
                        />
                        <Select
                            options={years.map((year) => ({
                                value: String(year),
                                label: String(year),
                            }))}
                            value={String(currentYear)}
                            onChange={onYearSelect}
                            placeholder="Year"
                            showSearch={false}
                            showClear={false}
                            className="w-20 rounded-[12px] border border-[#E4E4E7] bg-[#F4F4F5]"
                        />
                        <button
                            onClick={() =>
                                setDisplayMonth(
                                    new Date(currentYear, currentMonth - 1)
                                )
                            }
                            className="h-10 w-10 bg-white border border-[#E4E4E7] rounded-[6px] hover:bg-[#F4F4F5] p-0 flex items-center justify-center cursor-pointer"
                        >
                            <ChevronLeft className="h-5 w-12 text-[#616161]" />
                        </button>
                        <button
                            onClick={() =>
                                setDisplayMonth(
                                    new Date(currentYear, currentMonth + 1)
                                )
                            }
                            className="h-10 w-10 bg-white border border-[#E4E4E7] rounded-[6px] hover:bg-[#F4F4F5] p-0 flex items-center justify-center cursor-pointer"
                        >
                            <ChevronRight className="h-5 w-12 text-[#616161]" />
                        </button>
                    </div>

                    <DayPicker
                        required={false}
                        mode="single"
                        month={displayMonth}
                        onMonthChange={setDisplayMonth}
                        selected={displayDate}
                        onSelect={handleDayClick}
                        disabled={disabled}
                        showOutsideDays={true}
                        classNames={{
                            months: "flex flex-col space-y-4",
                            month: "space-y-4",
                            caption: "hidden",
                            caption_label: "hidden",
                            nav: "hidden",
                            nav_button: "hidden",
                            nav_button_previous: "hidden",
                            nav_button_next: "hidden",
                            table: "w-full border-collapse",
                            head_cell:
                                "w-8 h-8 text-center text-xs font-medium text-[#616161] uppercase",
                            day: "h-8 w-8 p-0 font-normal text-sm cursor-pointer rounded-[6px] hover:bg-[#F4F4F5] text-[#242424]",
                            day_selected:
                                "bg-white text-[#0F172A] font-semibold rounded-full border-2 border-[#3B82F6] shadow-sm",
                            day_today:
                                "bg-[#F4F4F5] text-[#242424] font-semibold rounded-[6px] border border-[#E4E4E7]",
                            day_outside:
                                "text-[#A1A1A1] opacity-50 aria-disabled:cursor-not-allowed",
                            day_disabled:
                                "text-[#A1A1A1] cursor-not-allowed opacity-50",
                            day_hidden: "invisible",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
