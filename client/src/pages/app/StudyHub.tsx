import StudyHubCard from "@/components/dashboard/StudyHubCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const StudyHub = () => {
  return (
    <section className="min-h-full px-2">
      <div className="text-center py-3 pb-6">
        <h4 className="font-serif font-thin inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-lg max-sm:text-sm py-4 text-transparent">
          “Share your knowledge, learn from others, and grow together.”
        </h4>
        <div className="border max-w-3xl mx-auto flex items-center rounded-full pl-6">
          <input
            type="text"
            className="bg-transparent outline-none border-none w-full h-full text-md"
            placeholder="Search topics, courses, or resources"
            aria-label="Search"
          />
          <Button className="my-1 mr-1 rounded-full">Search</Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap pr-2 text-xs sm:text-sm">
        <button className="py-2 px-5 border-b border-green-600 text-green-600">
          Latest
        </button>
        <button className="py-2 px-5">Popular</button>
        <button className="py-2 px-5">Oldest</button>
      </div>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4 py-8">
        {[0, 3, 3, 3, 3].map((_) => (
          <StudyHubCard />
        ))}
      </div>
    </section>
  );
};

export default StudyHub;
