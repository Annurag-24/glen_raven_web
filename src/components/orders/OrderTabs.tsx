import { cn } from "@/lib/utils";

export type TabItem = {
    id: string;
    label: string;
    content?: React.ReactNode;
};

type OrderTabsProps = {
    tabs: TabItem[];
    activeTabId: string;
    onTabChange: (tabId: string) => void;
    className?: string;
};

export default function OrderTabs({
    tabs,
    activeTabId,
    onTabChange,
    className,
}: OrderTabsProps) {
    return (
        <div className={cn("bg-white rounded-lg", className)}>
            <div className="flex gap-4 border-b border-gray-200 px-4">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "px-4 py-2 text-[14px] font-medium transition-colors relative",
                                isActive
                                    ? "text-[#036FED] border-b-2 border-[#036FED]"
                                    : "text-[#3F3F46] hover:text-gray-900"
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className="p-4">
                {tabs.find((tab) => tab.id === activeTabId)?.content || (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-500">Coming Soon</p>
                    </div>
                )}
            </div>
        </div>
    );
}
