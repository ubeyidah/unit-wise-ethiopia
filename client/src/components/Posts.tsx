import {
  getUserBlogs,
  UserBlogInfoType,
  UserBlogsType,
} from "@/apis/user/user.api";
import { Suspense, useEffect, useState } from "react";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSpinner } from "react-icons/fa";
import PostLoader from "./loaders/PostLoader";
import EmptyPostProfile from "./EmptyPostProfile";
import { useAuthContext } from "@/context/AuthProvider";

type LoaderType = {
  data: UserBlogInfoType;
  username: string;
};
export const loader: LoaderFunction = ({ params }) => {
  const { username } = params;
  const userBlogPromise = getUserBlogs(username as string);
  return defer({ data: userBlogPromise, username });
};

const Posts = () => {
  const { data, username } = useLoaderData() as LoaderType;
  const auth = useAuthContext();
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
              const data = await getUserBlogs(username, page);
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
                    <PostCard key={blog._id} {...blog} />
                  ))}
                </div>
              </InfiniteScroll>
            );
          } else {
            return (
              <EmptyPostProfile isAuthor={auth?.user?.userName === username} />
            );
          }
        }}
      </Await>
    </Suspense>
  );
};

export default Posts;
