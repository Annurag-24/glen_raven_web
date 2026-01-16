import { useState } from "react";
import { Outlet } from "react-router";
import Header from "@/layouts/dashboard/Header";
import LeftSidebar from "@/layouts/dashboard/LeftSidebar";
import TabBar, { type ITab } from "@/layouts/dashboard/TabBar";

const DashboardLayout = () => {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addTab = (tab: ITab) => {
    // Check if tab already exists
    const existingTab = tabs.find((t) => t.id === tab.id);
    if (existingTab) {
      setActiveTabId(tab.id);
      return;
    }

    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tabIndex = tabs.findIndex((t) => t.id === tabId);

    setTabs((prev) => prev.filter((t) => t.id !== tabId));

    // If closing active tab, switch to another tab or home
    if (activeTabId === tabId) {
      if (tabs.length > 1) {
        const newActiveTab =
          tabIndex > 0 ? tabs[tabIndex - 1] : tabs[tabIndex + 1];
        setActiveTabId(newActiveTab.id);
      } else {
        setActiveTabId(null);
      }
    }
  };

  const goToHome = () => {
    setTabs([]);
    setActiveTabId(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <LeftSidebar
            addTab={addTab}
            activeTabId={activeTabId}
            goToHome={goToHome}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onTabSelect={setActiveTabId}
            onTabClose={closeTab}
          />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
            {activeTabId === null ? (
              <Outlet context={{ addTab }} />
            ) : (
              tabs.find((t) => t.id === activeTabId)?.content
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
