import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
  const notification = [];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-9 w-9 rounded-full"
        >
          <IoNotificationsOutline className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-lg overflow-hidden w-[460px] max-md:w-[300px] mt-3 mr-5">
        <h1 className="px-4 py-1 pt-4">Notifications</h1>
        <Separator />
        <div className="p-4">
          {notification.length > 0 ? (
            <div>your most notifications</div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <IoIosNotificationsOutline className="size-44 text-slate-700/30 dark:text-slate-400/20" />
              <p className="text-sm text-slate-500/90">
                Your notifications live here
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
