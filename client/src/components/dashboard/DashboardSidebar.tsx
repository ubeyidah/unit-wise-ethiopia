import { Link, NavLink } from "react-router-dom";
import { sideLinks } from "@/data/dashboard";
import { CiCircleQuestion } from "react-icons/ci";

type PropType = {
  side: boolean;
  toggle: () => void;
};

const DashboardSidebar = ({ side, toggle }: PropType) => {
  const activeClass =
    "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  return (
    <aside className="hidden border-r bg-muted/40 md:block ">
      <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
        <button
          className="absolute -right-[5px] hover:-right-[7px] w-2 h-9 dark:bg-green-400/30 bg-green-500/50 hover:bg-green-500/80 dark:hover:bg-green-400/60 hover:w-3 transition-all duration-150 rounded-md top-1/2"
          onClick={toggle}
          title="toggle"
        ></button>
        <div
          className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ${
            side ? "" : "p-0 lg:p-0 justify-center"
          }`}
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img src="/logo.png" className="w-11" />
            <span className={side ? "" : "hidden"}>UnitWise Ethiopia</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideLinks.map((link, i) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={i === 0}
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                <div className={`text-md ${side ? "" : "text-[17px] my-1"}`}>
                  {link.icon}
                </div>
                <span className={side ? "" : "hidden"}>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto mb-2 text-sm">
          <Link to="/help-support" className={linkClass}>
            <CiCircleQuestion className={`size-5 ${side ? " " : " mx-auto"}`} />
            <span className={side ? "" : "hidden"}>Help & Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
