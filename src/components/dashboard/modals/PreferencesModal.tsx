import { useEffect, useState } from "react";
import Modal from "../Modal";

export type PreferenceItem = { key: string; label: string };

type Props = {
    open: boolean;
    onClose: () => void;
    onApply: (preferences: Record<string, boolean>) => void;
    onCancel?: () => void;
    items: PreferenceItem[];
    initialPreferences?: Record<string, boolean>;
    title?: string;
    sectionTitle?: string;
};

export default function PreferencesModal({
    open,
    onClose,
    onApply,
    onCancel,
    items,
    initialPreferences = {},
    title = "Preferences",
    sectionTitle = "Attributes",
}: Props) {
    const [preferences, setPreferences] =
        useState<Record<string, boolean>>(initialPreferences);

    useEffect(() => {
        if (open) {
            setPreferences(initialPreferences);
        }
    }, [open, initialPreferences]);

    function toggle(key: string) {
        setPreferences((s) => ({ ...s, [key]: !s[key] }));
    }

    function handleApply() {
        onApply(preferences);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            onCancel={onCancel}
            title={title}
            showFooter
            confirmText="Apply"
            cancelText="Cancel"
            onConfirm={handleApply}
        >
            <div className="space-y-4 px-2">
                <h3 className="text-sm font-medium text-gray-500">
                    {sectionTitle}
                </h3>
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex items-center justify-between hover:bg-gray-50 rounded cursor-pointer"
                        >
                            <label className="text-sm text-gray-500 cursor-pointer">
                                {item.label}
                            </label>
                            <button
                                type="button"
                                onClick={() => toggle(item.key)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    preferences[item.key]
                                        ? "bg-blue-600"
                                        : "bg-white border border-gray-500"
                                }`}
                                aria-label={`Toggle ${item.label}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                                        preferences[item.key]
                                            ? "bg-white translate-x-6"
                                            : "bg-gray-500 translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}
