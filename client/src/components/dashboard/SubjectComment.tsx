import {
  SubjectComType,
  deleteReplySubjectComment,
  deleteSubjectComment,
  likeSubjectComment,
  loadMoreSubjectComments,
  replySubjectComment,
  SubjectCommentsListType,
} from "@/apis/dashboard/subjects.api";
import TimeAgo from "javascript-time-ago";
import { Card } from "../ui/card";
import en from "javascript-time-ago/locale/en";
import { Separator } from "../ui/separator";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import SubjectDetailOverview from "./SubjectDetailOverview";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { formatNumber } from "@/lib/formatNumber";
import { useAuthContext } from "@/context/AuthProvider";
import { CiTrash } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

type PropType = {
  commentsArray: SubjectCommentsListType;
  subjectName: string;
  progress: { completed: number; total: number; percent: number };
};

interface SubjectCommentRederType extends SubjectComType {
  isReplyOpen?: boolean;
  isToReply?: boolean;
}
const SubjectComment = ({ commentsArray, subjectName, progress }: PropType) => {
  const auth = useAuthContext();
  const [isOpenComment, setIsOpenComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string[]>([]);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string[]>([]);
  const [comments, setComments] = useState<SubjectCommentRederType[]>(
    commentsArray.comments
  );
  useEffect(() => {
    setComments((prev) =>
      prev.map((cm) => ({ ...cm, isReplyOpen: false, isToReply: false }))
    );
  }, [loading, loadingId]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: commentsArray.currentPage,
    totalPage: commentsArray.totalPages,
    canLoadMore: commentsArray.currentPage < commentsArray.totalPages,
  });

  const loadMoreComments = async (page?: number) => {
    try {
      setLoading(true);
      const loadedComments = await loadMoreSubjectComments(
        subjectName,
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
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
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
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoadingId((prev) => prev.filter((id) => id !== commentId));
    }
  };

  const handleReplySubmit = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    try {
      e.preventDefault();
      const inputElement = e.currentTarget.querySelector<HTMLInputElement>(
        'input[name="reply"]'
      );
      const submitButton =
        e.currentTarget.querySelector<HTMLButtonElement>(".submit-btn");

      if (inputElement && submitButton) {
        const replyValue = inputElement.value;
        if (replyValue.length < 2 || replyValue.length >= 110) {
          toast.info("write a riply between 2 to 110 characters", {
            action: {
              label: "x",
              onClick: () => null,
            },
          });
          return;
        }
        submitButton.innerHTML = `<ImSpinner8 className="animate-spin text-sm mr-1" /> Loading...`;
        submitButton.disabled = true;
        const modifiedComment = await replySubjectComment(id, replyValue);
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === id ? modifiedComment : comment
          )
        );
        submitButton.innerHTML = "Reply";
        submitButton.disabled = false;
      }
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setDeleteLoadingId((prev) => [...prev, commentId]);
      await deleteSubjectComment(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      toast.error("Opps! No internet connection", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setDeleteLoadingId((prev) => prev.filter((id) => id !== commentId));
    }
  };
  const deleteReply = async (commentId: string, replyId: string) => {
    try {
      setDeleteLoadingId((prev) => [...prev, replyId]);
      await deleteReplySubjectComment(commentId, replyId);
      setComments((prev) =>
        prev.map((comment) => {
          const modifiedCom = comment.replies.filter(
            (reply) => reply._id !== replyId
          );
          return comment._id === commentId
            ? { ...comment, replies: modifiedCom }
            : comment;
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
      setDeleteLoadingId((prev) => prev.filter((id) => id !== replyId));
    }
  };

  return (
    <>
      <SubjectDetailOverview
        subjectName={subjectName}
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
                  <div className="grid grid-cols-[40px_1fr] p-3 gap-2">
                    <Avatar className="size-10 rounded-full object-cover object-center">
                      <AvatarImage src={comment.authorId.profileImage} />
                      <AvatarFallback className="uppercase">
                        {comment.authorId.userName[0]}
                      </AvatarFallback>
                    </Avatar>
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
                      <div className="mt-1 flex gap-2 items-center justify-between">
                        <div className="flex gap-2 items-center">
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
                              className={
                                comment.isReplyOpen ? "rotate-180" : ""
                              }
                            />
                            {formatNumber(comment.replies.length)} replies
                          </button>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 size-7 cursor-pointer border border-slate-500/20 text-xs disabled:opacity-55 disabled:cursor-none disabled:pointer-events-none"
                              disabled={
                                auth?.user?._id !== comment?.authorId._id ||
                                deleteLoadingId.includes(comment._id)
                              }
                            >
                              {deleteLoadingId.includes(comment._id) ? (
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
                      {comment?.isToReply && (
                        <form
                          onSubmit={(e) => handleReplySubmit(e, comment._id)}
                          className="mt-3 text-sm"
                        >
                          <Separator className="my-3" />
                          <input
                            className="bg-transparent border-b w-full border-green-500/30 py-1 px-2 outline-none focus:border-green-500"
                            placeholder="add a reply.."
                            name="reply"
                          />
                          <div className="flex justify-end gap-3 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={() => toggleReply(comment._id)}
                              type="button"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full submit-btn"
                              type="submit"
                            >
                              Reply
                            </Button>
                          </div>
                        </form>
                      )}
                      {comment?.isReplyOpen && comment.replies.length > 0 && (
                        <div className="mt-3">
                          {comment.replies.map((replie) => (
                            <span key={replie._id}>
                              <Separator />
                              <div className="mr-4 grid grid-cols-[30px_1fr] gap-2 text-xs my-3">
                                <div>
                                  <Avatar className="size-7 rounded-full object-cover object-center">
                                    <AvatarImage
                                      src={
                                        replie?.userId?.profileImage as string
                                      }
                                    />
                                    <AvatarFallback className="uppercase">
                                      {replie?.userId?.userName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div>
                                    <p className="opacity-60">
                                      @{replie?.userId?.userName} -{" "}
                                      {timeAgo.format(
                                        new Date(replie.createdAt)
                                      )}
                                    </p>
                                    <p>{replie.replie}</p>
                                  </div>
                                  <div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger
                                        className="flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 size-7 cursor-pointer border border-slate-500/20 text-xs disabled:opacity-55 disabled:cursor-none disabled:pointer-events-none"
                                        disabled={
                                          auth?.user?._id !==
                                            replie?.userId._id ||
                                          deleteLoadingId.includes(replie._id)
                                        }
                                      >
                                        {deleteLoadingId.includes(
                                          replie._id
                                        ) ? (
                                          <ImSpinner8 className="animate-spin text-sm" />
                                        ) : (
                                          <BsThreeDotsVertical />
                                        )}
                                      </DropdownMenuTrigger>
                                      {auth?.user?._id ===
                                        replie?.userId._id && (
                                        <DropdownMenuContent>
                                          <DropdownMenuItem
                                            className="flex items-center gap-1 text-xs"
                                            onClick={() =>
                                              deleteReply(
                                                comment._id,
                                                replie._id
                                              )
                                            }
                                          >
                                            <CiTrash /> Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      )}
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </span>
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
