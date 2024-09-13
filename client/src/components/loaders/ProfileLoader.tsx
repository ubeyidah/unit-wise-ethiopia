import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const ProfileLoader = () => {
  return (
    <>
      <div className="flex gap-6 mt-10">
        <Skeleton className="size-24 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-[40%] rounded-md" />
          <Skeleton className="h-3 w-[70%] rounded-md my-3" />
          <Skeleton className="h-3 w-[40%] rounded-md" />
          <Skeleton className="w-24 h-8 rounded-full mt-5" />
        </div>
      </div>

      <div className="flex items-center mt-7 ">
        <Skeleton className="w-14 h-4 rounded-sm mb-2 ml-3" />
        <Skeleton className="w-14 h-4 rounded-sm mb-2 ml-3" />
      </div>
      <Separator />
    </>
  );
};

export default ProfileLoader;
