import { useState } from "react";
import MultiSelect from "@/components/input/MultiSelect";
import Select from "@/components/input/Select";
import Calendar from "@/components/input/Calendar";
import { format } from "date-fns";
import Modal from "../Modal";

export type FilterFieldOption = { value: string; label: string };

export type FilterField = {
    key: string;
    label: string;
    type:
        | "select"
        | "multiselect"
        | "text"
        | "input"
        | "date"
        | "number"
        | "select-component";
    placeholder?: string;
    options?: FilterFieldOption[];
};

type Props = {
    open: boolean;
    onClose: () => void;
    onApply: (values: Record<string, string | string[]>) => void;
    onCancel?: () => void;
    fields: FilterField[];
    initialValues?: Record<string, string | string[]>;
    title?: string;
};

export default function FiltersModal({
    open,
    onClose,
    onApply,
    onCancel,
    fields,
    initialValues = {},
    title = "Filters",
}: Props) {
    const [values, setValues] =
        useState<Record<string, string | string[]>>(initialValues);

    function setValue(k: string, v: string | string[]) {
        setValues((s) => ({ ...s, [k]: v }));
    }

    function handleApply() {
        onApply(values);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            onCancel={onCancel}
            title={title}
            showFooter
            confirmText="Apply Filters"
            cancelText="Cancel"
            onConfirm={handleApply}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((f) => (
                    <div key={f.key} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {f.label}
                        </label>

                        {f.type === "select" && (
                            <select
                                value={String(values[f.key] ?? "")}
                                onChange={(e) =>
                                    setValue(f.key, e.target.value)
                                }
                                className="mt-1 block w-full rounded-sm border border-[#E0E0E0] bg-white py-2 px-3 text-sm text-[#242424] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select</option>
                                {(f.options ?? []).map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {f.type === "multiselect" && (
                            <MultiSelect
                                options={f.options ?? []}
                                value={
                                    Array.isArray(values[f.key])
                                        ? (values[f.key] as string[])
                                        : []
                                }
                                onChange={(v) => setValue(f.key, v)}
                                placeholder={f.placeholder ?? "Select options"}
                                showSearch
                                showSelectAll
                            />
                        )}

                        {f.type === "select-component" && (
                            <Select
                                options={f.options ?? []}
                                value={
                                    typeof values[f.key] === "string"
                                        ? (values[f.key] as string)
                                        : ""
                                }
                                onChange={(v) => setValue(f.key, v)}
                                placeholder={f.placeholder ?? "Select option"}
                                showSearch
                            />
                        )}

                        {(f.type === "input" ||
                            f.type === "text" ||
                            f.type === "number") && (
                            <input
                                type={f.type === "number" ? "number" : "text"}
                                placeholder={f.placeholder ?? ""}
                                value={String(values[f.key] ?? "")}
                                onChange={(e) =>
                                    setValue(f.key, e.target.value)
                                }
                                className="mt-1 block w-full rounded-sm border border-[#E0E0E0] bg-white py-2 px-3 text-sm text-[#242424] placeholder-[#707070] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        )}

                        {f.type === "date" && (
                            <Calendar
                                value={
                                    values[f.key]
                                        ? new Date(values[f.key] as string)
                                        : undefined
                                }
                                onChange={(date) => {
                                    if (!date) {
                                        setValue(f.key, "");
                                        return;
                                    }
                                    const dateStr = format(date, "yyyy-MM-dd");
                                    setValue(f.key, dateStr);
                                }}
                                placeholder={f.placeholder ?? "Select date"}
                            />
                        )}
                    </div>
                ))}
            </div>
        </Modal>
    );
}
