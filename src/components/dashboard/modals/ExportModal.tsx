import React, { useEffect, useState } from "react";
import Modal from "../Modal";

export type ExportColumn = { key: string; label: string };

export type ExportModalProps = {
    open: boolean;
    onClose: () => void;
    columns: ExportColumn[];
    onExport: (format: "xlsx" | "csv", selectedColumns: string[]) => void;
    defaultAll?: boolean;
    showAll?: boolean;
    title?: string;
};

export default function ExportModal({
    open,
    onClose,
    columns,
    onExport,
    defaultAll = false,
    showAll = true,
    title = "Export",
}: ExportModalProps) {
    const [format, setFormat] = useState<"xlsx" | "csv">("xlsx");
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (open) {
            const initial: Record<string, boolean> = {};
            columns.forEach((c) => (initial[c.key] = defaultAll));
            setSelected(initial);
        }
    }, [open, columns, defaultAll]);

    function toggle(key: string) {
        setSelected((s) => ({ ...s, [key]: !s[key] }));
    }

    function toggleAll() {
        const all = areAllSelected();
        const next: Record<string, boolean> = {};
        columns.forEach((c) => (next[c.key] = !all));
        setSelected(next);
    }

    function areAllSelected() {
        return columns.every((c) => selected[c.key]);
    }

    function handleExport() {
        const selectedKeys = columns
            .filter((c) => selected[c.key])
            .map((c) => c.key);
        onExport(format, selectedKeys);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            showFooter
            confirmText="Export"
            cancelText="Cancel"
            onConfirm={handleExport}
        >
            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">
                        File Format
                    </h4>
                    <div className="mt-2 flex px-1 items-center gap-6">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="export-format"
                                value="xlsx"
                                checked={format === "xlsx"}
                                onChange={() => setFormat("xlsx")}
                                style={{ accentColor: "#036fed" }}
                            />
                            <span className="text-sm">Excel (.xlsx)</span>
                        </label>

                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="export-format"
                                value="csv"
                                checked={format === "csv"}
                                onChange={() => setFormat("csv")}
                                style={{ accentColor: "#036fed" }}
                            />
                            <span className="text-sm">CSV (.csv)</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-900">
                        Columns to Include
                    </h4>

                    <div className="mt-2 space-y-2">
                        {showAll && (
                            <label className="flex items-center gap-2 px-1 py-1 hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={areAllSelected()}
                                    onChange={toggleAll}
                                    style={{ accentColor: "#036fed" }}
                                    className="w-4 h-4 rounded cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    All
                                </span>
                            </label>
                        )}

                        {columns.map((c) => (
                            <label
                                key={c.key}
                                className="flex items-center gap-2 px-1 py-1 hover:bg-gray-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={!!selected[c.key]}
                                    onChange={() => toggle(c.key)}
                                    style={{
                                        accentColor: "#036fed",
                                    }}
                                    className="w-4 h-4 rounded cursor-pointer"
                                />
                                <span className="text-sm text-gray-700">
                                    {c.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
