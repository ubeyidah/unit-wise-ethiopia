import {
  getUserBlogs,
  UserBlogInfoType,
  UserBlogsType,
} from "@/apis/user/user.api";
import { Suspense } from "react";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import PostCard from "./PostCard";

type LoaderType = {
  data: UserBlogInfoType;
};
export const loader: LoaderFunction = ({ params }) => {
  const { username } = params;
  const userBlogPromise = getUserBlogs(username as string);
  return defer({ data: userBlogPromise });
};

const Posts = () => {
  const { data } = useLoaderData() as LoaderType;
  return (
    <Suspense fallback={<h3>Loading ... .. .</h3>}>
      <Await resolve={data}>
        {(blogsInfo: UserBlogInfoType) => {
          console.log(blogsInfo);
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 py-8 gap-y-11">
              {blogsInfo.blogs.map((blog) => (
                <PostCard key={blog._id} {...blog} />
              ))}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Posts;
