import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { BiSearch, BiUser } from "react-icons/bi";
import { FiSidebar } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";

import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthProvider";
import { sideLinks } from "@/data/dashboard";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PiSignOutLight } from "react-icons/pi";
import { logoutUser } from "@/apis/auth/auth.api";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import Notification from "../Notification";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DashoardHeader = () => {
  const auth = useAuthContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleCommand = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommand();
      }
    };
    document.addEventListener("keydown", down as EventListener);
    return () => document.removeEventListener("keydown", down as EventListener);
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      auth?.logout();
    } catch (error) {
      toast.error("Coudn't signout please try agin later.");
    } finally {
      setLoading(false);
    }
  };

  const linkClass =
    "mx-[-0.65rem] flex items-center text-sm gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
  const activeClass =
    "mx-[-0.65rem] flex items-center text-sm gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-primary";
  return (
    <header className="flex sticky top-0 h-14 items-center gap-3 border-b dark:bg-muted/40 dark:backdrop-blur-lg backdrop-blur-xl bg-muted/50 px-4 lg:h-[60px] lg:px-6 z-50">
      {/* mobile only menu links */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <FiSidebar className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col"
          aria-describedby="sidebar menu"
        >
          <nav className="grid gap-2 text-lg font-medium">
            <SheetTitle>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold mb-3"
              >
                <img src="/logo.png" className="h-9 w-9" />
                <p>UnitWise Ethiopia</p>
                <span className="sr-only">UnitWise Ethiopia</span>
              </Link>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            {sideLinks.map((link, i) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={i === 0}
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                <div className="h-5 w-5">{link.icon}</div>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto">
            <Link to="/help-support" className={linkClass}>
              <CiCircleQuestion className="size-5" />
              Help & Support
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <div className="relative max-md:hidden">
          <BiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            onClick={toggleCommand}
            placeholder="Search ( ctrl + k ) . . . ."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="ml-auto h-9 w-9 rounded-full md:hidden"
        onClick={toggleCommand}
      >
        <BiSearch className="h-4 w-4" />
        <span className="sr-only">Toggle search</span>
      </Button>
      <Notification />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="rounded-full cursor-pointer">
          <Avatar>
            <AvatarImage
              src={auth?.user?.profileImage}
              className="size-9 rounded-full object-cover object-center"
            />
            <AvatarFallback className="uppercase">
              {auth?.user?.userName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-3">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={auth?.user?.profileImage}
                className="size-9 rounded-full object-cover object-center"
              />
              <AvatarFallback className="uppercase">
                {auth?.user?.userName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p>@{auth?.user?.userName}</p>
              <p className="line-clamp-1 text-wrap text-xs font-normal">
                {auth?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem className="flex items-center gap-3">
              <BiUser /> Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/settings">
            <DropdownMenuItem className="flex items-center gap-3">
              <IoSettingsOutline /> Settings
            </DropdownMenuItem>
          </Link>
          <Link to="/help-support">
            <DropdownMenuItem className="flex items-center gap-3">
              <CiCircleQuestion /> Help & Support
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-3"
            onClick={handleLogout}
          >
            {loading ? (
              <div className="w-full">
                <ImSpinner8 className="animate-spin mx-auto" />
              </div>
            ) : (
              <>
                <PiSignOutLight />
                Logout
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* command */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList className="mx-4">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default DashoardHeader;
