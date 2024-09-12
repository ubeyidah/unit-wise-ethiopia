import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const StudyHubDetailLoader = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-2 pb-32 ">
      <div className="flex items-center justify-between my-6">
        <Skeleton className="w-24 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
      </div>
      <div>
        <Skeleton className="rounded-md  aspect-auto h-[300px]" />
      </div>
      <Skeleton className="w-80% h-4 rounded-sm" />

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />

          <div>
            <Skeleton className="w-20 h-3 rounded-md" />
            <Skeleton className="w-10 h-2 rounded-md mt-1" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="w-14 h-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
      </div>
      <Skeleton className="w-full rounded-md h-3" />
      <Skeleton className="w-full rounded-md h-3 my-3" />
      <Skeleton className="w-full rounded-md h-3" />
      <div className="display-content mt-4">
        {[0, 9, 8, 7, 3, 4, 98, 78].map((_) => (
          <Skeleton key={_} className="w-full rounded-md h-3 my-3" />
        ))}
      </div>
      <Separator className="my-4" />
      <Skeleton className="w-full rounded-md h-10" />
    </section>
  );
};

export default StudyHubDetailLoader;
