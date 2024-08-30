import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col ">
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">some content</h3>
          <p className="text-sm text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <Button className="mt-4">start</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
