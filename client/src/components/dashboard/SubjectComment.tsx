import {
  SubjectComType,
  likeSubjectComment,
  loadMoreSubjectComments,
} from "@/apis/dashboard/subjects.api";
import TimeAgo from "javascript-time-ago";
import { Card } from "../ui/card";
import en from "javascript-time-ago/locale/en";
import { Separator } from "../ui/separator";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import { LoaderType } from "@/pages/app/SubjectDetail";
import SubjectDetailOverview from "./SubjectDetailOverview";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { formatNumber } from "@/lib/formatNumber";
import { useAuthContext } from "@/context/AuthProvider";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

type PropType = {
  data: LoaderType;
  progress: { completed: number; total: number; percent: number };
};

interface SubjectCommentRederType extends SubjectComType {
  isReplyOpen?: boolean;
  isToReply?: boolean;
}
const SubjectComment = ({ data, progress }: PropType) => {
  const auth = useAuthContext();
  const [isOpenComment, setIsOpenComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string[]>([]);
  const [comments, setComments] = useState<SubjectCommentRederType[]>(
    data.comments.comments
  );
  useEffect(() => {
    setComments((prev) =>
      prev.map((cm) => ({ ...cm, isReplyOpen: false, isToReply: false }))
    );
  }, [loading, loadingId]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: data.comments.currentPage,
    totalPage: data.comments.totalPages,
    canLoadMore: data.comments.currentPage < data.comments.totalPages,
  });

  const loadMoreComments = async (page?: number) => {
    try {
      setLoading(true);
      const loadedComments = await loadMoreSubjectComments(
        data.subjectName,
        page || pageInfo.currentPage + 1
      );
      page
        ? setComments(loadedComments.comments)
        : setComments((prev) => [...prev, ...loadedComments.comments]);
      setPageInfo({
        currentPage: loadedComments.currentPage,
        totalPage: loadedComments.totalPages,
        canLoadMore: loadedComments.currentPage < loadedComments.totalPages,
      });
    } catch (error) {
      toast.error("Opps! No internet connection");
    } finally {
      setLoading(false);
    }
  };

  const toggleReply = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === id
          ? { ...comment, isToReply: !comment.isToReply }
          : comment
      )
    );
  };

  const toggleOpenReply = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === id
          ? { ...comment, isReplyOpen: !comment.isReplyOpen }
          : comment
      )
    );
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      setLoadingId((prev) => [...prev, commentId]);
      const modified = await likeSubjectComment(commentId);
      setComments((prev) =>
        prev.map((comment) => (comment._id === commentId ? modified : comment))
      );
    } catch (error) {
      toast.error("Opps! No internet connection");
    } finally {
      setLoadingId((prev) => prev.filter((id) => id !== commentId));
    }
  };
  return (
    <>
      <SubjectDetailOverview
        data={data}
        reloadComment={loadMoreComments}
        progress={progress}
      />
      <Card className="rounded-md shadow-none p-4 mt-3">
        <div className="flex justify-between items-end py-1 px-1">
          <h4 className="text-lg">Comments</h4>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setIsOpenComment((prev) => !prev)}
          >
            <IoIosArrowDown />
          </Button>
        </div>
        {isOpenComment &&
          (comments.length > 0 ? (
            comments.map((comment) => {
              const userId = auth?.user?._id as string;
              const isLikedComment = comment.likes.includes(userId);
              return (
                <div key={comment._id} className="mb-1">
                  <Separator />
                  <div className="grid grid-cols-[40px_1fr] p-3 gap-1">
                    <img
                      src={comment.authorId.profileImage}
                      alt={comment.authorId.userName}
                      className="size-7 rounded-full object-cover object-center"
                    />
                    <div>
                      <div className="text-xs flex items-center gap-1">
                        <p>@{comment.authorId.userName} - </p>
                        <p className="opacity-60">
                          {timeAgo.format(new Date(comment.createdAt))}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-sm">{comment.message} </h2>
                      </div>
                      <div className="mt-1 flex gap-2 items-center">
                        <button
                          className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 ${
                            isLikedComment ? "bg-slate-500/30" : ""
                          }`}
                          onClick={() => handleCommentLike(comment._id)}
                          disabled={loadingId.includes(comment._id)}
                        >
                          {loadingId.includes(comment._id) ? (
                            <ImSpinner8 className="animate-spin text-sm" />
                          ) : isLikedComment ? (
                            <BiSolidLike className="size-4" />
                          ) : (
                            <BiLike className="size-4" />
                          )}

                          {!loadingId.includes(comment._id) && (
                            <span className="text-xs">
                              {formatNumber(comment.likes.length)}
                            </span>
                          )}
                        </button>
                        <button
                          className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs ${
                            comment.isToReply ? "bg-slate-500/30" : ""
                          }`}
                          onClick={() => toggleReply(comment._id)}
                        >
                          Reply
                        </button>
                        <button
                          className="flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1 px-3 border border-slate-500/20 text-xs"
                          onClick={() => toggleOpenReply(comment._id)}
                        >
                          <IoIosArrowDown
                            className={comment.isReplyOpen ? "rotate-180" : ""}
                          />
                          {formatNumber(comment.replies.length)} replies
                        </button>
                      </div>
                      {comment?.isToReply && (
                        <div className="mt-3 text-sm">
                          <Separator className="my-3" />
                          <input
                            className="bg-transparent border-b w-full border-green-500/30 py-1 px-2 outline-none focus:border-green-500"
                            placeholder="add a reply.."
                          />
                          <div className="flex justify-end gap-3 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={() => toggleReply(comment._id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}
                      {comment?.isReplyOpen && comment.replies.length > 0 && (
                        <div className="mt-3">
                          {comment.replies.map((replie) => (
                            <>
                              <Separator />
                              <div className="mr-4 grid grid-cols-[30px_1fr] gap-1 text-xs my-3">
                                <div>
                                  <img
                                    src={replie?.userId?.profileImage}
                                    alt={replie?.userId?.userName}
                                    className="rounded-full size-6"
                                  />
                                </div>
                                <div>
                                  <p className="opacity-60">
                                    @{replie?.userId?.userName}
                                  </p>
                                  <p>{replie.replie}</p>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center py-6 opacity-50">
              No comments
            </div>
          ))}
        {pageInfo.canLoadMore &&
          isOpenComment &&
          (loading ? (
            <div className="flex items-center gap-3 text-xs opacity-70">
              <ImSpinner8 className="animate-spin" />
              loading...
            </div>
          ) : (
            <Button onClick={() => loadMoreComments()} variant="link">
              See More
            </Button>
          ))}
      </Card>
    </>
  );
};

export default SubjectComment;
