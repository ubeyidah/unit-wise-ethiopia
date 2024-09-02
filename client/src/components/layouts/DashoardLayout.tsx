import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashoardHeader from "../dashboard/DashoardHeader";
import { useState } from "react";

const DashoardLayout = () => {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSideOpen((prev) => !prev);
  };
  const sideToggleClass = "md:grid-cols-[70px_1fr] lg:grid-cols-[70px_1fr]";
  return (
    <div
      className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-all duration-100 ${
        isSideOpen ? "" : sideToggleClass
      }`}
    >
      <DashboardSidebar side={isSideOpen} toggle={toggleSidebar} />
      <div className="flex flex-col">
        <DashoardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashoardLayout;
