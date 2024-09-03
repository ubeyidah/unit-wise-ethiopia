import {
  SubjectCommentsListType,
  SubjectComType,
  loadMoreSubjectComments,
} from "@/apis/dashboard/subjects.api";
import TimeAgo from "javascript-time-ago";
import { Card } from "../ui/card";
import en from "javascript-time-ago/locale/en";
import { Separator } from "../ui/separator";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

type PropType = {
  data: SubjectCommentsListType;
  subjectName: string;
};
const SubjectComment = ({ data, subjectName }: PropType) => {
  const [isOpenComment, setIsOpenComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<SubjectComType[]>(data.comments);
  const [pageInfo, setPageInfo] = useState({
    currentPage: data.currentPage,
    totalPage: data.totalPages,
    canLoadMore: data.currentPage < data.totalPages,
  });

  const loadMoreComments = async () => {
    try {
      setLoading(true);
      const loadedComments = await loadMoreSubjectComments(
        subjectName,
        pageInfo.currentPage + 1
      );
      setComments((prev) => [...prev, ...loadedComments.comments]);
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

  return (
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
          comments.map((comment) => (
            <div key={comment._id} className="mb-3">
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
                    <h2>{comment.message} </h2>
                  </div>
                  <div>
                    {comment.replies.length > 0 && (
                      <button className="flex items-center gap-1 border rounded-full px-3 text-sm py-1 mt-2">
                        <IoIosArrowDown /> {comment.replies.length} replies
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-6 opacity-50">
            No comments
          </div>
        ))}
      {pageInfo.canLoadMore &&
        (loading ? (
          <div className="flex items-center gap-3 text-xs opacity-70">
            <ImSpinner8 className="animate-spin" />
            loading...
          </div>
        ) : (
          <Button onClick={loadMoreComments} variant="link">
            See More
          </Button>
        ))}
    </Card>
  );
};

export default SubjectComment;
