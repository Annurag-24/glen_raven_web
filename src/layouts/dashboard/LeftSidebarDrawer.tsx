import {
  actionItems,
  drawerMenuItems,
  type DrawerMenuItem,
  type ActionItem,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";

interface IMenuSectionProps {
  items: DrawerMenuItem[];
  currentPath: string;
  expandedItems: number[];
  toggleExpanded: (index: number) => void;
}

interface IQuickLinksProps {
  items: ActionItem[];
}

const MenuSection = ({
  items,
  currentPath,
  expandedItems,
  toggleExpanded,
}: IMenuSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(index);
        const hasChildren = item.children && item.children.length > 0;
        const isActive = item.path && currentPath === item.path;

        return (
          <div key={index} className="flex flex-col">
            {hasChildren ? (
              <button
                onClick={() => toggleExpanded(index)}
                className={cn(
                  "p-2 rounded-md flex items-center justify-between gap-3 transition-colors w-full text-left",
                  isExpanded
                    ? "bg-tertiary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={cn(
                      "w-5 h-5 transition-all",
                      isExpanded && "brightness-0 invert"
                    )}
                  />
                  <span
                    className={cn(
                      "justify-start text-base font-normal",
                      isExpanded ? "text-white" : "text-gray-500"
                    )}
                  >
                    {item.name}
                  </span>
                </div>
                <img
                  src={ChevronRightIcon}
                  alt="Menu"
                  className={cn(
                    "w-6 h-6 transition-transform",
                    isExpanded ? "rotate-270" : "rotate-90 invert opacity-70"
                  )}
                />
              </button>
            ) : (
              <Link
                to={item.path!}
                className={cn(
                  "p-2 rounded-md flex items-center gap-3 transition-colors",
                  isActive
                    ? "bg-tertiary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "brightness-0 invert"
                  )}
                />
                <span
                  className={cn(
                    "justify-start text-base font-normal",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )}

            {/* Nested Children */}
            {hasChildren && isExpanded && (
              <div className="ml-5 mt-1 flex flex-col gap-1 border-l-2 border-gray-200 pl-6">
                {item.children!.map((child, childIndex) => {
                  const isChildActive = currentPath === child.path;
                  return (
                    <Link
                      key={childIndex}
                      to={child.path}
                      className={cn(
                        "p-1.5 rounded-md text-sm transition-colors",
                        isChildActive
                          ? "bg-tertiary/20 text-tertiary font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const QuickLinks = ({ items }: IQuickLinksProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">
        Quick Links
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col justify-start items-center gap-1 group"
          >
            <div className="p-2.5 bg-white rounded shadow-[0px_0px_5px_0px_rgba(0,0,0,0.08)] flex flex-col justify-start items-start gap-2.5 overflow-hidden group-hover:bg-tertiary">
              <div className="w-6 h-6 relative overflow-hidden">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full group-hover:brightness-0 group-hover:invert transition-all"
                />
              </div>
            </div>
            <div className="justify-start text-gray-500 text-[12px] font-medium group-hover:text-tertiary">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface ILeftSidebarDrawerProps {
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSidebarDrawer: React.FC<ILeftSidebarDrawerProps> = ({
  setShowDrawer,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowDrawer(false)}
      />

      {/* Drawer */}
      <div className="fixed top-14 left-0 w-64 h-full bg-white shadow-lg z-50 border-r border-slate-200">
        <div className="px-6 py-8 bg-white flex flex-col gap-6 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Menu Items Section */}
          <MenuSection
            items={drawerMenuItems}
            currentPath={currentPath}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
          />

          {/* Divider */}
          <div className="w-full h-[0.60px] bg-gray-300"></div>

          {/* Quick Links Section */}
          <QuickLinks items={actionItems} />
        </div>

        {/* Top Right Corner Button */}
        <button
          className="w-6 h-6 top-0 right-0 absolute bg-tertiary rounded-bl-[10px] flex flex-col justify-center items-center gap-2.5 hover:bg-tertiary/90 transition-colors"
          onClick={() => setShowDrawer((prev) => !prev)}
        >
          <img
            src={ChevronRightIcon}
            alt="Menu"
            className="w-5 h-5 rotate-180"
          />
        </button>
      </div>
    </>
  );
};

export default LeftSidebarDrawer;
