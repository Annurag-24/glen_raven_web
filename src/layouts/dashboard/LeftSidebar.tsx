import { menuItems, actionItems, type IMenuItem, type IActionItem } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import LeftSidebarDrawer from '@/layouts/dashboard/LeftSidebarDrawer';

interface IMenuSectionProps {
  items: IMenuItem[];
  onItemClick: (item: IMenuItem) => void;
  isItemActive: (item: IMenuItem) => boolean;
}

interface IQuickActionsProps {
  items: IActionItem[];
  onItemClick: (item: IActionItem) => void;
  isItemActive: (item: IActionItem) => boolean;
}

interface ILeftSidebarProps {
  addTab: (tab: { id: string; title: string; content: React.ReactNode }) => void;
  activeTabId: string | null;
  goToHome: () => void;
}

const MenuSection = ({ items, onItemClick, isItemActive }: IMenuSectionProps) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-1.5">
      <div className="opacity-50 justify-start text-Grey-600 text-xs font-normal leading-3 tracking-wide">
        MENU
      </div>

      {items.map((item, index) => {
        const isActive = isItemActive(item);

        return (
          <button
            key={index}
            onClick={() => onItemClick(item)}
            className="self-stretch flex flex-col justify-start items-center gap-1.5 group"
          >
            <div className="self-stretch inline-flex justify-center items-center gap-1.5">
              <div
                className={cn(
                  'w-10 h-10 relative rounded-md overflow-hidden flex items-center justify-center transition-colors',
                  isActive ? 'bg-tertiary' : 'group-hover:bg-tertiary'
                )}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={cn(
                    'w-5 h-5 transition-all',
                    isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                  )}
                />
              </div>
            </div>
            <p
              className={cn(
                'self-stretch text-center justify-center text-[12px] uppercase leading-3 tracking-wide transition-colors whitespace-pre-line',
                isActive
                  ? 'text-blue-900 font-semibold'
                  : 'text-gray-500 font-normal group-hover:text-tertiary group-hover:font-semibold'
              )}
            >
              {item.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

const QuickActions = ({ items, onItemClick, isItemActive }: IQuickActionsProps) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-2 mb-2">
      {items.map((item, index) => {
        const isActive = isItemActive(item);

        return (
          <button
            key={index}
            onClick={() => onItemClick(item)}
            className="self-stretch flex flex-col justify-start items-center gap-1.5 group"
          >
            <div className="self-stretch inline-flex justify-center items-center gap-1.5">
              <div
                className={cn(
                  'w-10 h-10 relative rounded-md overflow-hidden flex items-center justify-center transition-colors bg-gray-100',
                  isActive ? 'bg-tertiary' : 'group-hover:bg-tertiary'
                )}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={cn(
                    'w-5 h-5 transition-all',
                    isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                  )}
                />
              </div>
            </div>
            <p
              className={cn(
                'self-stretch text-center justify-center text-[11px] uppercase leading-3 tracking-wide transition-colors whitespace-pre-line',
                isActive
                  ? 'text-blue-900 font-semibold'
                  : 'text-gray-500 font-normal group-hover:text-tertiary group-hover:font-semibold'
              )}
            >
              {item.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

const LeftSidebar = ({ addTab, activeTabId, goToHome }: ILeftSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  // Determine if an item is active based on tab or home page
  const isItemActive = (item: IMenuItem | IActionItem) => {
    if (item.path === '/' && currentPath === '/') {
      return activeTabId === null; // Home is active only when no tab is selected
    }
    return activeTabId === item.id; // Check against active tab ID
  };

  const handleMenuClick = (item: IMenuItem) => {
    if (item.isHome || item.path === '/') {
      goToHome();
      navigate('/');
    } else if (item.getContent) {
      // Open as tab with content from getContent
      addTab({
        id: item.id,
        title: item.name.replace('\n', ' '),
        content: item.getContent(),
      });
    }
  };

  const handleActionClick = (item: IActionItem) => {
    if (item.getContent) {
      addTab({
        id: item.id,
        title: item.name,
        content: item.getContent(),
      });
    }
  };

  return (
    <aside className="px-3 py-5 w-32 relative bg-white border-r-[0.50px] border-slate-200 inline-flex flex-col justify-start items-center gap-7 h-screen">
      <div className="flex-1 flex flex-col justify-between items-center w-full">
        <MenuSection items={menuItems} onItemClick={handleMenuClick} isItemActive={isItemActive} />

        {/* Divider */}
        <div className="w-full h-[0.60px] bg-gray-300 my-5"></div>

        <QuickActions
          items={actionItems}
          onItemClick={handleActionClick}
          isItemActive={isItemActive}
        />
      </div>

      {/* Top Right Corner Button */}
      <button
        className="w-6 h-6 top-0 right-0 absolute bg-tertiary rounded-bl-[10px] flex flex-col justify-center items-center gap-2.5 hover:bg-tertiary/90 transition-colors"
        onClick={() => setShowDrawer((prev) => !prev)}
      >
        <img src={ChevronRightIcon} alt="Menu" className="w-5 h-5" />
      </button>

      {showDrawer && (
        <LeftSidebarDrawer
          setShowDrawer={setShowDrawer}
          addTab={addTab}
          activeTabId={activeTabId}
          goToHome={goToHome}
        />
      )}
    </aside>
  );
};

export default LeftSidebar;
