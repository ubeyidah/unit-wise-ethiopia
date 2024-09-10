import { Skeleton } from "../ui/skeleton";

const StudyHubLoader = () => {
  return [0, 8, 3, 4, 7, 9, 1, 2].map((_) => (
    <div className="border rounded-xl p-1 pb-8 relative" key={_}>
      <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg dark:bg-neutral-800">
        <Skeleton className="w-full h-full rounded-md" />
      </div>

      <div className="pt-4 px-1">
        <Skeleton className="w-full h-4 rounded-full" />
        <Skeleton className="w-[80%] h-4 rounded-full mt-1 mb-3" />
        <Skeleton className="w-full h-2 rounded-full mb-1" />
        <Skeleton className="w-full h-2 rounded-full" />
        <Skeleton className="w-full h-2 rounded-full mt-1" />
      </div>

      <div className="flex gap-6 bg-white dark:bg-black text-xs justify-between px-1 py-1 items-center border rounded-full absolute -bottom-5 left-1/2 -translate-x-1/2 h-[41px] w-full max-w-[240px]">
        <div className="flex items-center gap-1">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        </div>
        <button
          className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1.5 px-3 `}
        >
          <Skeleton className="rounded-full w-10 h-4" />
        </button>
      </div>
    </div>
  ));
};

export default StudyHubLoader;
