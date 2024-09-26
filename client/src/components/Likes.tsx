import {
  getUserLikedBlogs,
  UserBlogInfoType,
  UserBlogsType,
} from "@/apis/user/user.api";
import { Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import PostCard from "./PostCard";
import PostLoader from "./loaders/PostLoader";

type LoaderType = {
  data: UserBlogInfoType;
  username: string;
};
export const loader: LoaderFunction = ({ params }) => {
  const { username } = params;
  const userBlogPromise = getUserLikedBlogs(username as string);
  return defer({ data: userBlogPromise, username });
};

const Likes = () => {
  const { data, username } = useLoaderData() as LoaderType;
  return (
    <Suspense fallback={<PostLoader />}>
      <Await resolve={data}>
        {(blogsInfo: UserBlogInfoType) => {
          const [blogs, setBlogs] = useState(blogsInfo.blogs);
          const [page, setPage] = useState(2);
          const [hasMore, setHasMore] = useState(true);
          useEffect(() => {
            setBlogs(blogsInfo.blogs);
          }, [blogsInfo]);
          const fetchMoreBlog = async () => {
            try {
              if (!blogs) return;
              const data = await getUserLikedBlogs(username, page);
              setBlogs((prevBlogs) => [
                ...(prevBlogs as UserBlogsType[]),
                ...data.blogs,
              ]);
              setPage(data.currentPage + 1);
              setHasMore(data.currentPage < data.totalPages);
            } catch (error) {
              throw new Error("unable to fetch blogs");
            }
          };
          if (blogs.length > 0) {
            return (
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
                  {blogs.map((blog) => (
                    <PostCard key={blog._id} {...blog} options={false} />
                  ))}
                </div>
              </InfiniteScroll>
            );
          } else {
            return (
              <div className="flex items-center justify-center mt-16 flex-col gap-4">
                <img
                  src="/like.svg"
                  alt="illustrations for empty post"
                  className="w-[40%] md:w-[20%] opacity-50"
                />
                <h3 className="text-center text-sm opacity-70 max-w-md max-sm:max-w-sm">
                  No Likes Yet! It seems like you haven't liked anything yet.
                  Explore the content, find something you love, and give it a
                  like.
                </h3>
              </div>
            );
          }
        }}
      </Await>
    </Suspense>
  );
};

export default Likes;
