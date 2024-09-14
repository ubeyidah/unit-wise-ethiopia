import { UserBlogsType } from "@/apis/user/user.api";
import { useAuthContext } from "@/context/AuthProvider";
import { formatDate } from "@/lib/formatDate";
import { formatNumber } from "@/lib/formatNumber";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { IoMdMore } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

const PostCard = ({
  _id,
  title,
  coverImage,
  createdAt,
  likes,
  authorId,
}: UserBlogsType) => {
  const auth = useAuthContext();

  return (
    <Link to={`/dashboard/study-hub/${_id}`}>
      <div className="mb-2">
        <img
          src={coverImage}
          alt={title}
          className="w-full rounded-md h-[170px] max-sm:h-full object-cover object-center"
        />
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-sm font-bold leading-4 mb-1">{title}</h1>
          <p className="text-xs opacity-60 font-light ">
            {formatNumber(likes.length)} likes • {formatDate(createdAt)}
          </p>
        </div>
        <div>
          {auth?.user?._id.toString() === authorId.toString() && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <IoMdMore className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-1 text-xs">
                  <CiEdit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1 text-xs">
                  <FaRegTrashCan />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
