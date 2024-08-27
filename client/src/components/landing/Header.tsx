import { headerLinks } from "@/data/landing";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMoon } from "react-icons/ai";
import { Separator } from "../ui/separator";
import IconButton from "../IconButton";
import { Button } from "../ui/button";

const Header = () => {
  const linkClass: string =
    "py-[19px] px-4 hover:text-green-500 transition-all duration-100";
  const activeLink: string =
    "border-b-2 border-green-500 py-[19px] text-green-500 px-4 transition-all duration-100";

  return (
    <header className="sticky top-0 z-10 bg-white  backdrop-filter backdrop-blur-md bg-opacity-30 border-b border-gray-200">
      <div className="container px-4 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>
        <nav className="flex items-center h-full">
          {headerLinks.map((link) => (
            <NavLink
              key={link.label}
              className={({ isActive }) => (isActive ? activeLink : linkClass)}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
          <IconButton icon={<AiOutlineMoon />} />
          <Separator orientation="vertical" className="mx-4 h-5" />
          <Link to="/signin">
            <Button
              variant="ghost"
              className=" bg-green-400/10 hover:bg-green-400/50"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
