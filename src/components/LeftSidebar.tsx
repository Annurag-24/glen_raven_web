import {
  menuItems,
  actionItems,
  type MenuItem,
  type ActionItem,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import LeftSidebarDrawer from "@/components/LeftSidebarDrawer";

interface MenuSectionProps {
  items: MenuItem[];
}

const MenuSection = ({ items }: MenuSectionProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-1.5">
      <div className="opacity-50 justify-start text-Grey-600 text-xs font-normal leading-3 tracking-wide">
        MENU
      </div>

      {items.map((item, index) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className="self-stretch flex flex-col justify-start items-center gap-1.5 group"
          >
            <div className="self-stretch inline-flex justify-center items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 relative rounded-md overflow-hidden flex items-center justify-center transition-colors",
                  isActive ? "bg-tertiary" : "group-hover:bg-tertiary"
                )}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={cn(
                    "w-4 h-4 transition-all",
                    isActive
                      ? "brightness-0 invert"
                      : "group-hover:brightness-0 group-hover:invert"
                  )}
                />
              </div>
            </div>
            <div
              className={cn(
                "self-stretch text-center justify-center text-[10px] uppercase leading-3 tracking-wide transition-colors whitespace-pre-line",
                isActive
                  ? "text-blue-900 font-semibold"
                  : "text-gray-500 font-normal group-hover:text-tertiary group-hover:font-semibold"
              )}
            >
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

interface QuickActionsProps {
  items: ActionItem[];
}

const QuickActions = ({ items }: QuickActionsProps) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-1.5">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="self-stretch px-2.5 py-1 bg-white rounded-xl flex flex-col justify-center items-center gap-1 overflow-hidden group"
        >
          <div
            className={cn(
              "w-8 h-8 p-0.5 rounded-md inline-flex justify-center items-center gap-2.5 transition-colors",
              "bg-gray-100 group-hover:bg-tertiary"
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-4 h-4 transition-all group-hover:brightness-0 group-hover:invert"
            />
          </div>
          <div
            className={cn(
              "text-center justify-center text-[8px] leading-5 transition-colors",
              "text-gray-500 font-normal group-hover:text-tertiary"
            )}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

const LeftSidebar = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <aside className="px-3 py-5 relative bg-white border-r-[0.50px] border-slate-200 inline-flex flex-col justify-start items-center gap-7 h-screen">
      <div className="flex-1 flex flex-col justify-between items-center">
        <MenuSection items={menuItems} />

        {/* Divider */}
        <div className="w-full h-[0.60px] bg-gray-300 my-5"></div>

        <QuickActions items={actionItems} />
      </div>

      {/* Top Right Corner Button */}
      <button
        className="w-5 h-5 top-0 right-0 absolute bg-tertiary rounded-bl-[10px] flex flex-col justify-center items-center gap-2.5 hover:bg-tertiary/90 transition-colors"
        onClick={() => setShowDrawer((prev) => !prev)}
      >
        <img src={ChevronRightIcon} alt="Menu" className="w-4 h-4" />
      </button>

      {showDrawer && <LeftSidebarDrawer setShowDrawer={setShowDrawer} />}
    </aside>
  );
};

export default LeftSidebar;
