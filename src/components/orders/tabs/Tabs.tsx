import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// Export TabItem type for use with items prop
export type TabItem = {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
};

type TabsContextType = {
  value: string;
  onChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used inside <Tabs />");
  }
  return ctx;
};

interface ITabsProps {
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
  items?: TabItem[];
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}



const Tabs: React.FC<ITabsProps> & {
  List: React.FC<ITabsListProps>;
  Trigger: React.FC<ITabsTriggerProps>;
  Content: React.FC<ITabsContentProps>;
} = ({ value, onChange, children, items, className, listClassName, contentClassName }) => {
  // If items prop is provided, render using items pattern
  if (items) {
    return (
      <TabsContext.Provider value={{ value, onChange }}>
        <div className={cn(["", className])}>
          <TabsList className={listClassName}>
            {items.map((item) => (
              <TabsTrigger key={item.id} value={item.id} disabled={item.disabled}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => (
            <TabsContent key={item.id} value={item.id} className={contentClassName}>
              {item.content || null}
            </TabsContent>
          ))}
        </div>
      </TabsContext.Provider>
    );
  }

  // Otherwise, use compound component pattern with children
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn(["bg-white rounded-lg", className])}>{children}</div>
    </TabsContext.Provider>
  );
};

/* ---------- Tabs.List ---------- */

interface ITabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<ITabsListProps> = ({ children, className }) => {
  return (
    <div
      className={cn([
        "flex gap-4 border-b border-gray-200 px-4",
        className,
      ])}
    >
      {children}
    </div>
  );
};

/* ---------- Tabs.Trigger ---------- */

interface ITabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const TabsTrigger: React.FC<ITabsTriggerProps> = ({
  value,
  children,
  className,
  disabled = false,
}) => {
  const { value: activeValue, onChange } = useTabs();
  const isActive = value === activeValue;

  return (
    <button
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      className={cn([
        "px-4 py-2 text-[14px] font-medium transition-colors relative",
        disabled
          ? "text-gray-400 cursor-not-allowed opacity-50"
          : isActive
          ? "text-[#036FED] border-b-2 border-[#036FED]"
          : "text-[#3F3F46] hover:text-gray-900",
        className,
      ])}
    >
    {children}
    </button>
  );
};

/* ---------- Tabs.Content ---------- */

interface ITabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<ITabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { value: activeValue } = useTabs();

  if (value !== activeValue) return null;

  return <div className={cn(["p-4", className])}>{children}</div>;
};

/* ---------- Attach subcomponents ---------- */

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
