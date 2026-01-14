// React import not required with the new JSX transform

interface QuickActionItem {
    name: string;
    icon: string; // url to the icon image
    onClick?: () => void;
}

export default function QuickActions({ items }: { items: QuickActionItem[] }) {
    return (
        <>
            <h3 className="text-lg font-bold leading-7 text-grey-600 mb-4">
                Quick Actions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {items.map((it, idx) => (
                    <button
                        key={idx}
                        onClick={it.onClick}
                        className="flex flex-col items-center justify-center gap-3 bg-white outline-1 -outline-offset-1 outline-slate-200 rounded-[32px] p-6 hover:shadow-md transition-shadow focus:outline-none h-36"
                        aria-label={it.name}
                    >
                        <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-center w-12 h-12">
                            <img
                                src={it.icon}
                                alt={it.name}
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                            {it.name}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
