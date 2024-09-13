import { ImSpinner8 } from "react-icons/im";
import { Button } from "./ui/button";

type PropType = {
  myId: string;
  userId: string;
  followers: string[];
  handleFollow: (userId: string) => void;
  loading: string[];
};

const FollowButton = ({
  myId,
  userId,
  followers,
  handleFollow,
  loading,
}: PropType) => {
  const isFollower = followers.includes(myId);
  return (
    myId !== userId && (
      <Button
        className={`rounded-full active:scale-x-110 active:scale-y-95 transition-all duration-75 ${
          isFollower ? "bg-green-400/30 border border-green-400/50" : ""
        }`}
        variant="blogDetail"
        onClick={() => handleFollow(userId)}
        disabled={loading.includes("follow")}
      >
        {loading.includes("follow") ? (
          <ImSpinner8 className="animate-spin px-3 box-content" />
        ) : isFollower ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </Button>
    )
  );
};

export default FollowButton;
