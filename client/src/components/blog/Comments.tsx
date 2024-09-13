import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ImSpinner8 } from "react-icons/im";
import { BiLike, BiSolidLike } from "react-icons/bi";
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
  getBlogComments,
} from "@/apis/blog/blog.api";
import { toast } from "sonner";
import { formatDate } from "@/lib/formatDate";

type PropType = {
  blogId: string;
};
const Comments = ({ blogId }: PropType) => {
  const isLikedComment = [0].includes(0);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState<string[]>([]);
  const [comments, setComments] = useState<BlogCommentType[]>();
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
        setComments(data.comments);
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
        {comments?.map((comment) => (
          <div key={comment._id}>
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
                    <button
                      className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 ${
                        false ? "bg-slate-500/30" : ""
                      }`}
                      onClick={() => {}}
                      // disabled={loadingId.includes(comment._id)}
                    >
                      {[3].includes(0) ? (
                        <ImSpinner8 className="animate-spin text-sm" />
                      ) : isLikedComment ? (
                        <BiSolidLike className="size-4" />
                      ) : (
                        <BiLike className="size-4" />
                      )}

                      {![3].includes(0) && (
                        <span className="text-xs">{formatNumber(3)}</span>
                      )}
                    </button>
                    <button
                      className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs ${
                        false ? "bg-slate-500/30" : ""
                      }`}
                      onClick={() => {}}
                    >
                      Reply
                    </button>
                    <button
                      className="flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs"
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
                        disabled={false}
                      >
                        {[3].includes(0) ? (
                          <ImSpinner8 className="animate-spin text-sm" />
                        ) : (
                          <BsThreeDotsVertical />
                        )}
                      </DropdownMenuTrigger>
                      {true && (
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="flex items-center gap-1 text-xs"
                            onClick={() => {}}
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
      </div>
    </div>
  );
};

export default Comments;
