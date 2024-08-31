import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
type ContactType = {
  name: string;
  school: string;
  email: string;
  message: string;
};
export const sendEmail = async (sendData: ContactType) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  const result = await res.json();
  if (!res.ok) {
    toast.error(result.message, {
      className: "border border-slate-400",
      description: "Please try agian",
      action: {
        label: <IoIosClose className="size-6 dark:text-white" />,
        onClick: () => null,
      },
    });
    throw {
      message: result.message,
      hidden: true,
    };
  }
  toast.success(result.message, {
    className: "border border-slate-400",
    description:
      "Thank you for your message! Your feedback is important to us.",
    action: {
      label: <IoIosClose className="size-6 dark:text-white" />,
      onClick: () => null,
    },
  });
  return result;
};
