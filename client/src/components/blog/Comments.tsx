import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ImSpinner8 } from "react-icons/im";
import { formatNumber } from "@/lib/formatNumber";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { FormEvent, useEffect, useState } from "react";
import {
  BlogCommentType,
  createBlogComment,
  deleteBlogComments,
  getBlogComments,
  likeBlogComments,
} from "@/apis/blog/blog.api";
import { toast } from "sonner";
import { formatDate } from "@/lib/formatDate";
import LikeButton from "../LikeButton";
import { useAuthContext } from "@/context/AuthProvider";

type PropType = {
  blogId: string;
};

interface BlogComment extends BlogCommentType {
  isToReply: boolean;
  isOpenReply: boolean;
}
const Comments = ({ blogId }: PropType) => {
  const auth = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState<string[]>([]);
  const [comments, setComments] = useState<BlogComment[]>();
  const [pageInfo, setPageInfo] = useState({
    totalPage: 0,
    currentPage: 0,
    canLoadMore: false,
  });

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading((prev) => [...prev, "main"]);
        const data = await getBlogComments(blogId);
        const redyComment = data.comments.map((comment) => {
          return { ...comment, isToReply: false, isOpenReply: false };
        });
        setComments(redyComment);
        setPageInfo({
          totalPage: data.totalPages,
          currentPage: data.currentPage,
          canLoadMore: data.currentPage < data.totalPages,
        });
      } catch (error) {
        throw new Error("Couldn't load comments");
      } finally {
        setLoading((prev) => prev.filter((item) => item !== "main"));
      }
    };
    loadComments();
  }, []);

  const createComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading((prev) => [...prev, "comment"]);
      const res = await createBlogComment(blogId, commentText);
      await loadMoreComments(1);
      setCommentText("");
      console.log(res);
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading((prev) => prev.filter((item) => item !== "comment"));
    }
  };
  if (loading.includes("main")) return <>Loading...</>;

  const loadMoreComments = async (page?: number) => {
    try {
      setLoading((prev) => [...prev, "loadmore"]);
      const loadedComments = await getBlogComments(
        blogId,
        page || pageInfo.currentPage + 1
      );
      const redyComment = loadedComments.comments.map((comment) => {
        return { ...comment, isToReply: false, isOpenReply: false };
      });
      page
        ? setComments(redyComment)
        : setComments((prev: any) => [...prev, ...redyComment]);
      setPageInfo({
        currentPage: loadedComments.currentPage,
        totalPage: loadedComments.totalPages,
        canLoadMore: loadedComments.currentPage < loadedComments.totalPages,
      });
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading((prev) => prev.filter((item) => item !== "loadmore"));
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      setLoading((prev) => [...prev, commentId]);
      const res = await likeBlogComments(commentId);
      setComments((prev) =>
        prev?.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, likes: res };
          }
          return comment;
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
      setLoading((prev) => prev.filter((item) => item !== commentId));
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setLoading((prev) => [...prev, "d" + commentId]);
      await deleteBlogComments(commentId);
      setComments((prev) =>
        prev?.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading((prev) =>
        prev.filter((item) => "d" + item !== "d" + commentId)
      );
    }
  };
  return (
    <div>
      <form onSubmit={createComment} id="comment">
        <label>
          Write Comment
          <Textarea
            placeholder="Add a comment"
            className="h-24"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </label>
        <div className="flex items-center justify-end relative pt-2">
          <Button
            variant="outline"
            className="rounded-full"
            type="submit"
            disabled={loading.includes("comment")}
          >
            {loading.includes("comment") ? (
              <ImSpinner8 className="animate-spin text-gray-500 px-4 box-content" />
            ) : (
              "Comment"
            )}
          </Button>
        </div>
      </form>

      <h3>Comments</h3>
      <Separator />

      <div className="px-3 md:px-5">
        {comments?.map((comment, i) => (
          <div key={comment._id + comment.blogId + i}>
            <Separator />

            <div className="grid grid-cols-[40px,1fr] gap-2 my-3">
              <Avatar className="w-10 h-10 rounded-full object-cover object-center">
                <AvatarImage src={comment.authorId.profileImage} />
                <AvatarFallback className="uppercase">
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="text-xs flex items-center gap-1">
                  <p>@{comment.authorId.userName} - </p>
                  <p className="opacity-60">{formatDate(comment.createdAt)}</p>
                </div>
                <div>
                  <h2 className="text-sm mt-1">{comment.message}</h2>
                </div>
                <div className="mt-1 flex gap-2 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <LikeButton
                      blogId={comment._id}
                      handleLike={handleLike}
                      likes={comment.likes}
                      loading={loading}
                      userId={auth?.user?._id as string}
                      variant="cardLike"
                      size="commetnBtn"
                    />
                    <button
                      className={`flex h-6 items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs ${
                        false ? "bg-slate-500/30" : ""
                      }`}
                      onClick={() => {}}
                    >
                      Reply
                    </button>
                    <button
                      className="flex h-6 items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs"
                      onClick={() => {}}
                    >
                      <IoIosArrowDown className={true ? "rotate-180" : ""} />
                      {formatNumber(3)} replies
                    </button>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 size-7 cursor-pointer border border-slate-500/20 text-xs disabled:opacity-55 disabled:cursor-none disabled:pointer-events-none"
                        disabled={
                          loading.includes("d" + comment._id) ||
                          auth?.user?._id !== comment?.authorId._id
                        }
                      >
                        {loading.includes("d" + comment._id) ? (
                          <ImSpinner8 className="animate-spin text-sm" />
                        ) : (
                          <BsThreeDotsVertical />
                        )}
                      </DropdownMenuTrigger>
                      {auth?.user?._id === comment?.authorId._id && (
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="flex items-center gap-1 text-xs"
                            onClick={() => deleteComment(comment._id)}
                          >
                            <CiTrash /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center ">
          {pageInfo.canLoadMore &&
            (loading.includes("loadmore") ? (
              <div className="flex items-center gap-3 text-xs opacity-70">
                <ImSpinner8 className="animate-spin" />
                loading...
              </div>
            ) : (
              <Button onClick={() => loadMoreComments()} variant="link">
                See More
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
