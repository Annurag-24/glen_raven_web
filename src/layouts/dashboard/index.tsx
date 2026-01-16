import { useState } from "react";
import { Outlet } from "react-router";
import Header from "@/layouts/dashboard/Header";
import LeftSidebar from "@/layouts/dashboard/LeftSidebar";
import { X } from "lucide-react";

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

const DashboardLayout = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addTab = (tab: Tab) => {
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

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <LeftSidebar addTab={addTab} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          {tabs.length > 0 && (
            <div className="flex items-center gap-1 bg-white border-b px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Other Tabs */}
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors group whitespace-nowrap ${
                    activeTabId === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{tab.title}</span>
                  <X
                    size={16}
                    className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-opacity"
                    onClick={(e) => closeTab(tab.id, e)}
                  />
                </button>
              ))}
            </div>
          )}

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
