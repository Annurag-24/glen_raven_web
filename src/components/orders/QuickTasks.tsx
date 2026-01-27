import QuickTasksIcon from "@/assets/icons/Quicktask.svg";

export type QuickTask = {
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
  }


  export type QuickTaskSection = {
    title: string;
    items: QuickTask[];
  };
  export type QuickTasksProps = {
    title?: string;
    sections: QuickTaskSection[]; // 👈 NEW
    className?: string;
  };

  export default function QuickTasks({
    title = "Quick Tasks",
    sections,
    className,
  }: QuickTasksProps) {
    return (
      <div
        className={`bg-white rounded-lg p-4 outline-1 -outline-offset-1 outline-gray-100 ${className || ""}`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <img src={QuickTasksIcon} alt="Quick Tasks" className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
  
        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section title */}
              <p className="text-[12px] text-[#71717A] mb-2">
                {section.title}
              </p>
  
              {/* Items */}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const baseClass =
                    "block w-full text-left text-[14px] font-semibold transition-colors";
  
                  const stateClass = item.isActive
                    ? "text-[#036FED]"
                    : "text-[#3F3F46] hover:text-blue-600";
  
                  if (item.href) {
                    return (
                      <a
                        key={itemIndex}
                        href={item.href}
                        className={`${baseClass} ${stateClass}`}
                      >
                        {item.label}
                      </a>
                    );
                  }
  
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.onClick}
                      className={`${baseClass} ${stateClass}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  