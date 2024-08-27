import { SlMenu } from "react-icons/sl";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { headerLinks } from "@/data/landing";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const MobileNav = () => {
  const linkClass: string =
    "border-b-2 border-slate-500 py-4 text-slate-500 px-4 transition-all duration-100";
  const activeLink: string =
    "border-b-2 border-green-500 py-4 text-green-500 px-4 transition-all duration-100 bg-green-50/70";

  return (
    <Sheet>
      <SheetTrigger>
        <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200">
          <SlMenu />
        </button>
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col mt-4">
          {headerLinks.map((link) => (
            <NavLink
              key={link.label}
              className={({ isActive }) => (isActive ? activeLink : linkClass)}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/signin">
            <Button
              variant="ghost"
              className="w-full mt-7 bg-green-400/10 hover:bg-green-400/50"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
