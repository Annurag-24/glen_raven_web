import { ReactNode, useEffect, useRef } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onCancel?: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string; // e.g. "max-w-3xl", "max-w-md", "max-w-2xl"
    showFooter?: boolean;
    cancelText?: string;
    confirmText?: string;
    onConfirm?: () => void;
    confirmDisabled?: boolean;
};

export default function Modal({
    open,
    onClose,
    onCancel,
    title,
    children,
    maxWidth = "max-w-3xl",
    showFooter = false,
    cancelText = "Cancel",
    confirmText = "Apply",
    onConfirm,
    confirmDisabled = false,
}: Props) {
    const prevOpenRef = useRef(open);

    useEffect(() => {
        prevOpenRef.current = open;
    }, [open]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                handleCancel();
            }
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    if (!open) return null;

    function handleCancel() {
        onCancel?.();
        onClose();
    }

    function handleConfirm() {
        onConfirm?.();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black/40" onClick={handleCancel} />

            <div
                className={`relative w-full ${maxWidth} bg-white rounded-lg shadow-2xl`}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 pb-0">
                        <h3 className="text-lg font-medium text-gray-900">
                            {title}
                        </h3>
                        <button
                            aria-label="Close modal"
                            onClick={handleCancel}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-800 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="p-6">{children}</div>

                {showFooter && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4">
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center rounded-sm bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 cursor-pointer"
                        >
                            {cancelText}
                        </button>

                        <button
                            onClick={handleConfirm}
                            disabled={confirmDisabled}
                            className="inline-flex items-center rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {confirmText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
