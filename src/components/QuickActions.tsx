// React import not required with the new JSX transform

interface QuickActionItem {
    title: string;
    icon: string; // url to the icon image
    onClick?: () => void;
}

export default function QuickActions({ items }: { items: QuickActionItem[] }) {
    return (
        <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Quick Actions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {items.map((it, idx) => (
                    <button
                        key={idx}
                        onClick={it.onClick}
                        className="flex flex-col items-center gap-3 bg-white border border-[#F4F4F5] rounded-2xl p-4 hover:shadow-sm transition-shadow focus:outline-none"
                        aria-label={it.title}
                    >
                        <div className="bg-[#2B7CEE1A] rounded-lg p-3 flex items-center justify-center">
                            <img src={it.icon} alt="" className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                            {it.title}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
