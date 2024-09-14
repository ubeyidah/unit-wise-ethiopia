import { Skeleton } from "../ui/skeleton";

const PostLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 py-8 gap-y-11">
      {[0, 99, 84, 7, 8, 9, 30, 98].map((_) => (
        <div key={_}>
          <div className="mb-2">
            <Skeleton className="w-full rounded-md h-[170px] object-cover object-center " />
          </div>
          <div>
            <Skeleton className="text-sm font-bold leading-4 mb-1 w-full h-3" />
            <Skeleton className="text-sm font-bold leading-4 mb-1 w-2/4 h-3" />
            <Skeleton className="text-sm font-bold leading-4 mt-2 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostLoader;
