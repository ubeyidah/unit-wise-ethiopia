import { BlogsType, getBlogs } from "@/apis/blog/blog.api";
import StudyHubCard from "@/components/dashboard/StudyHubCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunction,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

export const loader: LoaderFunction = () => {
  const blogsPromise = getBlogs();
  return defer({ blogs: blogsPromise });
};

type LoaderData = {
  blogs: Promise<BlogsType[]>;
};

const StudyHub = () => {
  const { blogs } = useLoaderData() as LoaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSeachParams = (key: string, value: string | null) => {
    // setSearchParams(prev => )
  };
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
            placeholder="Search topics, courses . . ."
            aria-label="Search"
          />
          <Button className="my-1 mr-1 rounded-full">Search</Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap pr-2 text-xs sm:text-sm">
        <button className="py-2 px-5 border-b border-green-600 text-green-600 hover:text-green-600">
          Latest
        </button>
        <button className="py-2 px-5 hover:text-green-600">Popular</button>
        <button className="py-2 px-5 hover:text-green-600">Oldest</button>
      </div>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 py-8 gap-y-11">
        <Suspense fallback={<h3>loading....</h3>}>
          <Await resolve={blogs}>
            {(blogsList: BlogsType[]) => {
              return (
                <>
                  {blogsList.map((blog) => (
                    <StudyHubCard key={blog._id} {...blog} />
                  ))}
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default StudyHub;
