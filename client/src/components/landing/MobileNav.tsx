import { SlMenu } from "react-icons/sl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { headerLinks } from "@/data/landing";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const MobileNav = () => {
  const linkClass: string =
    "border-b-2 dark:border-slate-700 border-slate-400 py-4 text-slate-500 px-4 transition-all duration-100 hover:text-green-400";
  const activeLink: string =
    "border-b-2 border-green-500 py-4 text-green-500 px-4 transition-all duration-100 bg-green-50/70 dark:bg-green-300/10";

  return (
    <Sheet>
      <SheetTrigger>
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200 dark:border-neutral-400/30 dark:hover:bg-neutral-200/10">
          <SlMenu />
        </span>
      </SheetTrigger>
      <SheetContent aria-describedby="nav menu" aria-description="menu">
        <SheetTitle></SheetTitle>
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
              className="w-full mt-7 bg-green-400/10 hover:bg-green-400/50 dark:bg-green-300/20 dark:hover:bg-green-400/50"
            >
              Sign In
            </Button>
          </Link>
        </nav>
        <SheetDescription></SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
