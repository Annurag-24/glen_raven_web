import { List } from "lucide-react";

export type QuickTask = {
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
};

export type QuickTasksProps = {
    title?: string;
    category?: string;
    tasks: QuickTask[];
    className?: string;
};

export default function QuickTasks({
    title = "Quick Tasks",
    category = "Order Related",
    tasks,
    className,
}: QuickTasksProps) {
    return (
        <div className={`bg-white rounded-lg p-4 ${className || ""}`}>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <List className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            </div>
            {category && <p className="text-xs text-gray-600 mb-3">{category}</p>}
            <div className="space-y-2">
                {tasks.map((task, index) => (
                    <a
                        key={index}
                        href={task.href || "#"}
                        onClick={(e) => {
                            if (task.onClick) {
                                e.preventDefault();
                                task.onClick();
                            }
                        }}
                        className={`block text-sm transition-colors ${task.isActive
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-blue-600"
                            }`}
                    >
                        {task.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
