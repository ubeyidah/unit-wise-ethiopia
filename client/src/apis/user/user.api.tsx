import { User } from "@/context/AuthProvider";
import { ProfileType } from "@/pages/MoreInfo";
import { IoIosClose } from "react-icons/io";
import { redirect } from "react-router-dom";
import { toast } from "sonner";
export const takeInfoToServer = async (
  data: ProfileType,
  login: (userData: User) => void
) => {
  const res = await fetch("/api/user/take-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    return toast.error(result.message, {
      className: "border border-slate-400",
      action: {
        label: <IoIosClose className="size-6 dark:text-white" />,
        onClick: () => null,
      },
    });
  }
  login(result.user);
  return redirect("/payment-verify");
};
