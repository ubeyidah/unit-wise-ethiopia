import {
  BlogInfoType,
  BlogsType,
  getBlogs,
  likeBlogs,
} from "@/apis/blog/blog.api";
import StudyHubCard from "@/components/dashboard/StudyHubCard";
import StudyHubLoader from "@/components/loaders/StudyHubLoader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSearchOff } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { toast } from "sonner";

export const loader: LoaderFunction = () => {
  const blogsPromise = getBlogs();
  return defer({ data: blogsPromise });
};

type LoaderData = {
  data: Promise<BlogInfoType>;
};

const StudyHub = () => {
  const { data } = useLoaderData() as LoaderData;
  const [blogs, setBlogs] = useState<BlogsType[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    try {
      setLoading(true);
      const data = await getBlogs(1, searchText.trim());
      setBlogs(data.blogs);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      throw new Error("unable to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreBlog = async () => {
    try {
      if (!blogs) return;
      const data = await getBlogs(page);
      setBlogs((prevBlogs) => [...(prevBlogs as BlogsType[]), ...data.blogs]);
      setPage(data.currentPage + 1);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      throw new Error("unable to fetch blogs");
    }
  };

  const clearSearch = async () => {
    try {
      setLoading(true);
      if (!searchText) return;
      setSearchText("");
      const data = await getBlogs();
      setBlogs(data.blogs);
      setPage(2);
      setHasMore(true);
    } catch (error) {
      throw new Error("unable to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      setLoadingId((prev) => [...prev, blogId]);
      const res = await likeBlogs(blogId);
      setBlogs((prev) =>
        prev?.map((blog) => {
          if (blog._id === blogId) {
            return { ...blog, likes: res };
          }
          return blog;
        })
      );
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoadingId((prev) => prev.filter((item) => item !== blogId));
    }
  };

  return (
    <section className="min-h-full px-4 max-sm:px-2">
      <div className="text-center py-3 pb-6">
        <h4 className="font-serif font-thin inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-lg max-sm:text-sm py-4 text-transparent">
          “Share your knowledge, learn from others, and grow together.”
        </h4>
        <form
          onSubmit={handleSearch}
          className="border max-w-3xl mx-auto flex items-center rounded-full pl-6 overflow-hidden"
        >
          <input
            type="text"
            className="bg-transparent outline-none border-none w-full h-full text-md"
            placeholder="Search topics, courses . . ."
            aria-label="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          {searchText && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-3xl w-12"
              onClick={clearSearch}
            >
              <IoIosClose className="opacity-60" />
            </Button>
          )}
          <Button
            type="submit"
            className="text-sm flex items-center gap-1"
            disabled={loading || !blogs}
          >
            {loading ? (
              <FaSpinner className="animate-spin size-4 px-4 box-content opacity-80" />
            ) : (
              <>
                <IoSearchOutline /> Search
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="flex items-center flex-wrap pr-2 text-xs sm:text-sm">
        <button
          className={`py-2 px-5 border-green-600 hover:text-green-600 transition-all duration-150 latest border-b text-green-600`}
        >
          Our Latest Topics
        </button>
      </div>
      <Separator />

      <InfiniteScroll
        dataLength={blogs?.length || 0}
        next={fetchMoreBlog}
        hasMore={!!blogs && hasMore}
        loader={
          <div className="flex items-center justify-center my-5 gap-3">
            <FaSpinner className="animate-spin size-6 opacity-80" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 py-8 gap-y-11">
          {loading ? (
            <StudyHubLoader />
          ) : (
            <Suspense fallback={<StudyHubLoader />}>
              <Await resolve={data}>
                {(blogInfo: BlogInfoType) => {
                  useEffect(() => {
                    if (!blogs) {
                      setBlogs(blogInfo.blogs);
                    }
                  }, []);
                  if (blogs == undefined || blogs.length <= 0)
                    return (
                      <div className="w-full h-full flex items-center justify-center text-center col-span-4 row-span-8 flex-col">
                        <MdOutlineSearchOff className="size-16 opacity-40" />
                        <h3 className="mt-2 opacity-50 max-md:text-sm text-center max-w-md">
                          Oops! The topic you're looking for isn't available at
                          the moment. Please try searching for a different topic
                          or check back later.
                        </h3>
                        <Button variant="link" onClick={clearSearch}>
                          clear
                        </Button>
                      </div>
                    );
                  return (
                    <>
                      {blogs.map((blog, i) => (
                        <StudyHubCard
                          key={blog._id + i + blog.title}
                          {...blog}
                          handleLike={handleLike}
                          loadingId={loadingId}
                        />
                      ))}
                    </>
                  );
                }}
              </Await>
            </Suspense>
          )}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default StudyHub;
