import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashoardHeader from "../dashboard/DashoardHeader";
import { useState } from "react";

const DashoardLayout = () => {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(true);
  const toggleSidebar = () => {
    setIsSideOpen((prev) => !prev);
  };
  const sideToggleClass = "md:grid-cols-[70px_1fr] lg:grid-cols-[70px_1fr]";
  // py-4 px-1 lg:gap-6 lg:p-6
  return (
    <div
      className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-all duration-100 ${
        isSideOpen ? "" : sideToggleClass
      }`}
    >
      <DashboardSidebar side={isSideOpen} toggle={toggleSidebar} />
      <div className="flex flex-col lg:gap-6">
        <DashoardHeader />
        <main className="flex flex-1 flex-col gap-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashoardLayout;
