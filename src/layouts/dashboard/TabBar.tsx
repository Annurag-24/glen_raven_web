import { cn } from '@/lib/utils';
import XIcon from '@/assets/icons/x.svg';
import { useEffect, useRef, forwardRef } from 'react';

export interface ITab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TabProps {
  tab: ITab;
  isActive: boolean;
  onSelect: () => void;
  onClose: (e: React.MouseEvent) => void;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(({ tab, isActive, onSelect, onClose }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={cn([
        'h-14 px-3 py-2.5 bg-white border-t-2 hover:bg-gray-50 hover:text-tertiary hover:border-tertiary flex flex-col justify-center items-start gap-1 transition-colors group whitespace-nowrap cursor-pointer',
        isActive ? 'border-tertiary text-tertiary bg-gray-50' : 'border-transparent text-gray-600',
      ])}
    >
      <div className="w-44 inline-flex justify-between items-center">
        <p className="justify-center text-gray-700 text-sm font-medium">{tab.title}</p>
        <img
          src={XIcon}
          alt="Close"
          className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-all brightness-0 saturate-100 group-hover:brightness-0 group-hover:saturate-100 group-hover:invert-[48%] group-hover:sepia-[13%] group-hover:hue-rotate-[169deg]"
          onClick={onClose}
        />
      </div>
    </button>
  );
});

interface TabBarProps {
  tabs: ITab[];
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string, e: React.MouseEvent) => void;
}

const TabBar = ({ tabs, activeTabId, onTabSelect, onTabClose }: TabBarProps) => {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (activeTabId && tabRefs.current[activeTabId]) {
      tabRefs.current[activeTabId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTabId]);

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center gap-0.5 bg-white border-b overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          ref={(el) => {
            tabRefs.current[tab.id] = el;
          }}
          tab={tab}
          isActive={activeTabId === tab.id}
          onSelect={() => onTabSelect(tab.id)}
          onClose={(e) => onTabClose(tab.id, e)}
        />
      ))}
    </div>
  );
};

export default TabBar;
