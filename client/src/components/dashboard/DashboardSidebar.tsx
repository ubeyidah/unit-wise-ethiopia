import { Link, NavLink } from "react-router-dom";
import { sideLinks } from "@/data/dashboard";
import { CiCircleQuestion } from "react-icons/ci";

const DashboardSidebar = () => {
  const activeClass =
    "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  return (
    <aside className="hidden border-r bg-muted/40 md:block ">
      <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img src="/logo.png" className="h-8 w-8" />
            <span className="">UnitWise Ethiopia</span>
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
                <div className="h-4 w-4">{link.icon}</div>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto mb-2 text-sm">
          <Link to="/help-support" className={linkClass}>
            <CiCircleQuestion className="size-5" />
            Help & Support
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
