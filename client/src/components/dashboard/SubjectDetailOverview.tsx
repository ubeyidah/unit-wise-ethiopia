import { Link, useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GrEmoji } from "react-icons/gr";
import emojis from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useAuthContext } from "@/context/AuthProvider";
import { FormEvent, useState } from "react";
import { LoaderType } from "@/pages/app/SubjectDetail";
import { createSubjectComment } from "@/apis/dashboard/subjects.api";
import { ImSpinner8 } from "react-icons/im";

type PropType = {
  data: LoaderType;
  progress: { completed: number; total: number; percent: number };
};
const SubjectDetailOverview = ({ data, progress }: PropType) => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const totalCha = 200;
  const submitComment = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (commentText.trim() === "" || commentText.length < 8) return;
      const res = await createSubjectComment(data.subjectName, commentText);
      setCommentText("");
      navigate(".", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="rounded-md shadow-none  p-2">
      <div className="flex items-center justify-between gap-3">
        <Link to="/dashboard/subjects">
          <Button variant="outline">
            <GoArrowLeft />
          </Button>
        </Link>
        <h3 className="uppercase md:text-lg mr-3">{data.subjectName}</h3>
      </div>
      <h1 className="text-xl my-4">👋 Hi {auth?.user?.fullName}</h1>
      <p className="text-sm">
        You have completed {progress.completed} out of {progress.total} chapters
        in your English subject keep going! As you progress, use the structured
        chapter list to find topics in your books and track your understanding.
        You can also share anything short, like your feelings or feedback. If
        you want to share serious resources, you can do so on our{" "}
        <Link
          to="/dashboard/sudy-hub"
          className="text-blue-600 underline hover:opacity-70"
        >
          StudyHub
        </Link>{" "}
        platform.
      </p>
      <div className="text-sm mt-3">
        <p>{progress.percent}% Completed</p>
        <Progress value={progress.percent} className="h-3 rounded-md" />
      </div>

      <form onSubmit={submitComment}>
        <Separator className="my-3" />
        <h2 className="text-sm font-bold">Write Comment</h2>
        <Textarea
          placeholder="Add a comment"
          className="mt-1 h-28"
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={totalCha}
          value={commentText}
        />
        <p className="text-right text-xs mr-1">
          {totalCha - commentText.length} remaining
        </p>
        <div className="flex items-center justify-between relative pt-2">
          <Popover>
            <PopoverTrigger className="h-9 w-9 rounded-full ml-1">
              <GrEmoji />
            </PopoverTrigger>
            <PopoverContent className="bg-transparent border-none -mt-12 absolute mx-auto w-fit p-0">
              <Picker
                data={emojis}
                previewPosition="none"
                onEmojiSelect={({ native }: { native: string }) =>
                  setCommentText((prev) => prev + " " + native)
                }
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            disabled={commentText.length > 8 ? false : true || loading}
            className="rounded-full"
            type="submit"
          >
            {!loading ? (
              "Comment"
            ) : (
              <ImSpinner8 className="animate-spin px-4 box-content" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SubjectDetailOverview;
