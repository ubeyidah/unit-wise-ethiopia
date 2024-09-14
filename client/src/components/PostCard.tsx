import { UserBlogsType } from "@/apis/user/user.api";
import { formatDate } from "@/lib/formatDate";
import { formatNumber } from "@/lib/formatNumber";
import { Link } from "react-router-dom";

const PostCard = ({
  _id,
  title,
  coverImage,
  createdAt,
  likes,
}: UserBlogsType) => {
  return (
    <Link to={`/dashboard/study-hub/${_id}`}>
      <div className="mb-2">
        <img
          src={coverImage}
          alt={title}
          className="w-full rounded-md h-[170px] object-cover object-center "
        />
      </div>
      <div>
        <h1 className="text-sm font-bold leading-4 mb-1">{title}</h1>
        <p className="text-xs opacity-60 font-light ">
          {formatNumber(likes.length)} likes • {formatDate(createdAt)}{" "}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
