import "@blocknote/mantine/style.css";
import { BlogType, getBlog } from "@/apis/blog/blog.api";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  LoaderFunction,
  useLoaderData,
  Link,
} from "react-router-dom";
import Editor from "@/components/Editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import Comments from "@/components/blog/Comments";

export const loader: LoaderFunction = ({ params }) => {
  const blogId = params.id || "";
  const blogPromise = getBlog(blogId);
  return defer({ blog: blogPromise });
};
type LoaderData = {
  blog: Promise<BlogType>;
};
const StudyHubDetail = () => {
  const { blog } = useLoaderData() as LoaderData;
  const [singleBlog, setSingleBlog] = useState<BlogType>();

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={blog}>
        {(blogDetail: BlogType) => {
          useEffect(() => {
            setSingleBlog(blogDetail);
          }, []);

          if (!singleBlog) return;
          return (
            <section className="max-w-4xl mx-auto px-2 pb-32 ">
              <div className="flex items-center justify-between my-6">
                <Link
                  className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500 border rounded-md py-1 px-2 "
                  to="/dashboard/study-hub"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to all Blogs
                </Link>
                <p className="text-md opacity-80">
                  {formatDate(blogDetail.updatedAt)}
                </p>
              </div>
              <div>
                <img
                  src={blogDetail.coverImage}
                  alt="blog cover image"
                  className="w-full rounded-md object-center object-cover"
                />
              </div>
              <h1 className="text-xl my-3 font-bold">{blogDetail.title}</h1>

              <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 rounded-full object-cover object-center">
                    <AvatarImage src={blogDetail.author.profileImage} />
                    <AvatarFallback className="uppercase">
                      <Skeleton className="w-full h-full rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-wrap text-sm leading-3 max-sm:max-w-40 line-clamp-1">
                      {blogDetail.author.userName}
                    </h3>
                    <p className="text-xs opacity-70 mt-0.5">
                      20k &#183; follower
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="rounded-full" variant="blogDetail">
                    follow
                  </Button>
                  <Button
                    className="rounded-full flex gap-1"
                    variant="blogDetail"
                  >
                    <BiLike /> 8k
                  </Button>
                  <a href="#comment">
                    <Button className="rounded-full" variant="blogDetail">
                      <FaRegCommentDots />
                    </Button>
                  </a>
                </div>
              </div>
              <Separator />
              <p className="opacity-70 mt-3 mb-5">{blogDetail.description}</p>
              <div className="display-content mt-4">
                <Editor
                  initialContent={blogDetail.content}
                  onChange={() => null}
                  editable={false}
                />
              </div>
              <Separator className="my-4" />
              <Comments />
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default StudyHubDetail;
