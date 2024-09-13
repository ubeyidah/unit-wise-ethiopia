import { ImSpinner8 } from "react-icons/im";
import { Button } from "./ui/button";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { formatNumber } from "@/lib/formatNumber";

type PropType = {
  loading: string[];
  likes: string[];
  userId: string;
  handleLike: (blogId: string) => void;
  blogId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | "iconsm" | "likeBtn" | "commetnBtn";
  variant?:
    | "blogDetail"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "cardLike";
};
const LikeButton = ({
  loading,
  likes,
  userId,
  handleLike,
  blogId,
  className,
  variant = "blogDetail",
  size = "default",
}: PropType) => {
  return (
    <Button
      className={`rounded-full flex gap-1 items-center active:scale-x-110 active:scale-y-95 transition-all duration-75 ${className} ${
        likes.includes(userId as string)
          ? " bg-green-400/30 border border-green-400/50"
          : ""
      }`}
      variant={variant}
      onClick={() => handleLike(blogId)}
      disabled={loading.includes("like")}
      size={size}
    >
      {loading.includes("like") || loading.includes(blogId) ? (
        <ImSpinner8 className="animate-spin px-3 box-content" />
      ) : (
        <>
          {likes.includes(userId as string) ? (
            <>
              <BiSolidLike />
              {formatNumber(likes.length)}
            </>
          ) : (
            <>
              <BiLike /> {formatNumber(likes.length)}
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default LikeButton;
