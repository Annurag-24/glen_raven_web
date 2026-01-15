import { Outlet } from "react-router";
import Header from "@/layouts/dashboard/Header";
import LeftSidebar from "@/layouts/dashboard/LeftSidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <LeftSidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
