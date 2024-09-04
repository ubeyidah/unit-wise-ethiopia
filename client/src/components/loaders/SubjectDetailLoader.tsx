import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SubjectDetailLoader = () => {
  return [0, 8, 3, 4, 7].map((subject) => {
    return (
      <div key={subject}>
        <Card className="rounded-md shadow-none p-4 hover:border-green-500/60 transition-all duration-300 flex items-center w-full gap-4">
          <Skeleton className="w-[50px] h-[50px] rounded-full" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="w-[60%] h-3 rounded-md" />
              <Skeleton className="w-4 h-3 rounded-md" />
            </div>
            <div>
              <Skeleton className="w-6 h-3 rounded-md mb-1 mt-3" />
              <Skeleton className="w-full h-3 rounded-md" />
            </div>
          </div>
        </Card>
      </div>
    );
  });
};

export default SubjectDetailLoader;
