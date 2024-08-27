import { headerLinks } from "@/data/landing";
import { Link, NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import { ThemeSwitcher } from "../ThemeSwitcher";

const Header = () => {
  const linkClass: string =
    "py-[19px] px-4 hover:text-green-500 transition-all duration-100";
  const activeLink: string =
    "border-b-2 border-green-500 py-[19px] text-green-500 px-4 transition-all duration-100";

  return (
    <header className="sticky top-0 z-10 bg-white  backdrop-filter backdrop-blur-md bg-opacity-30 border-b border-gray-200 dark:bg-dark dark:bg-opacity-20 dark:border-gray-900">
      <div className="container px-4 flex items-center justify-between  h-[64px]">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>
        {/* only for desktop */}
        <nav className="flex items-center h-full max-sm:hidden">
          {headerLinks.map((link) => (
            <NavLink
              key={link.label}
              className={({ isActive }) => (isActive ? activeLink : linkClass)}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="ml-4"></div>
          <ThemeSwitcher />
          <Separator orientation="vertical" className="mx-4 h-5" />
          <Link to="/signin">
            <Button
              variant="ghost"
              className=" bg-green-400/10 hover:bg-green-400/50 dark:bg-green-300/20 dark:hover:bg-green-400/50 "
            >
              Sign In
            </Button>
          </Link>
        </nav>
        {/* only for mobile */}
        <div className="sm:hidden flex gap-3 items-center">
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
