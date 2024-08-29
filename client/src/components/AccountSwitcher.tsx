import { IoPowerSharp } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PiUserSwitch } from "react-icons/pi";
import { useAuthContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { logoutUser } from "@/apis/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const AccountSwitcher = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      auth?.logout();
      navigate("/signin");
    } catch (error) {
      toast.error("Coudn't signout please try agin later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <IoPowerSharp className="size-[20px] p-2 box-content hover:bg-green-500/20 transition-all duration-200 rounded-full active:bg-transparent" />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <p className="py-2 px-4 text-sm dark:text-slate-300">
          {auth?.user?.email}
        </p>
        <Separator />
        <button
          className="flex w-full p-4  items-center gap-3 dark:hover:bg-slate-700/20 cursor-pointer hover:bg-slate-300/20"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ImSpinner8 className="size-5 mx-auto animate-spin" />
          ) : (
            <>
              <PiUserSwitch /> Switch account
            </>
          )}
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default AccountSwitcher;
