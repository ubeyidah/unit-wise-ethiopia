import "@blocknote/mantine/style.css";
import { BlogType, getBlog, likeBlogs } from "@/apis/blog/blog.api";
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
import { IoMdMore } from "react-icons/io";
import { formatDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaRegCommentDots } from "react-icons/fa";
import Comments from "@/components/blog/Comments";
import StudyHubDetailLoader from "@/components/loaders/StudyHubDetailLoader";
import { useAuthContext } from "@/context/AuthProvider";
import { followUser } from "@/apis/user/user.api";
import { toast } from "sonner";
import LikeButton from "@/components/LikeButton";
import FollowButton from "@/components/FollowButton";

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
  const [loading, setLoading] = useState<string[]>([]);
  const auth = useAuthContext();

  const handleFollow = async (id: string) => {
    try {
      setLoading((prev) => [...prev, "follow"]);
      const res = await followUser(id);
      setSingleBlog((prev: any) => ({
        ...prev,
        author: { ...prev?.author, followers: res },
      }));
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading((prev) => prev.filter((item) => item !== "follow"));
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      setLoading((prev) => [...prev, "like"]);
      const res = await likeBlogs(blogId);
      setSingleBlog((prev: any) => ({ ...prev, likes: res }));
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading((prev) => prev.filter((item) => item !== "like"));
    }
  };
  return (
    <Suspense fallback={<StudyHubDetailLoader />}>
      <Await resolve={blog}>
        {(blogDetail: BlogType) => {
          useEffect(() => {
            setSingleBlog(blogDetail);
          }, []);

          if (!singleBlog) return;
          const followerLen: number = singleBlog.author.followers.length;

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
                  {formatDate(singleBlog.updatedAt)}
                </p>
              </div>
              <div>
                <img
                  src={singleBlog.coverImage}
                  alt="blog cover image"
                  className="w-full rounded-md object-center object-cover"
                />
              </div>
              <h1 className="text-xl my-3 font-bold">{singleBlog.title}</h1>

              <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 rounded-full object-cover object-center">
                    <AvatarImage src={singleBlog.author.profileImage} />
                    <AvatarFallback className="uppercase">
                      <Skeleton className="w-full h-full rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-wrap text-sm leading-3 max-sm:max-w-40 line-clamp-1">
                      {singleBlog.author.userName}
                    </h3>
                    <p className="text-xs opacity-70 mt-0.5">
                      {followerLen} &#183; follower
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FollowButton
                    followers={singleBlog.author.followers}
                    handleFollow={handleFollow}
                    loading={loading}
                    myId={auth?.user?._id as string}
                    userId={singleBlog.author._id as string}
                  />
                  <LikeButton
                    blogId={singleBlog._id}
                    handleLike={handleLike}
                    likes={singleBlog.likes}
                    loading={loading}
                    userId={auth?.user?._id as string}
                  />
                  <a href="#comment">
                    <Button className="rounded-full" variant="blogDetail">
                      <FaRegCommentDots />
                    </Button>
                  </a>
                  {auth?.user?._id === singleBlog.author._id && (
                    <Button
                      className="rounded-full text-xl"
                      variant="blogDetail"
                    >
                      <IoMdMore />
                    </Button>
                  )}
                </div>
              </div>
              <Separator />
              <p className="opacity-70 mt-3 mb-5">{blogDetail.description}</p>
              <div className="display-content mt-4">
                <Editor
                  initialContent={singleBlog.content}
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
