import { Suspense } from "react";
import { useImage } from "react-image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BlogsType } from "@/apis/blog/blog.api";
import { formatNumber } from "@/lib/formatNumber";
import { formatDate } from "@/lib/formatDate";

const StudyHubCard = ({
  title,
  _id,
  description,
  coverImage,
  updatedAt,
  author,
  likes,
}: BlogsType) => {
  return (
    <div className="border rounded-xl p-1 pb-8 relative">
      <Link
        className="group flex flex-col focus:outline-none"
        to={`/dashboard/${author.userName}/${_id}`}
      >
        <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg dark:bg-neutral-800">
          <Suspense>
            <Image
              url={coverImage}
              des={title}
              className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out object-cover object-center rounded-lg w-full h-full"
            />
          </Suspense>
        </div>

        <div className="pt-4 px-1">
          <h3 className="font-medium text-md text-black dark:text-white line-clamp-2">
            {title}
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400 text-xs line-clamp-3">
            {description}
          </p>
        </div>
      </Link>

      <div className="flex gap-6 bg-white dark:bg-black text-xs justify-between px-1 py-1 items-center border rounded-full absolute -bottom-5 left-1/2 -translate-x-1/2 h-[41px] w-full max-w-[240px]">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage
              src={author.profileImage}
              className="w-8 h-8 rounded-full object-cover object-center"
            />
            <AvatarFallback className="uppercase">
              {author.userName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm opacity-90">{author.userName}</p>
            <p className="text-[11px] -mt-1 opacity-70">
              {formatDate(updatedAt)}
            </p>
          </div>
        </div>
        <button
          className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1.5 px-3 border border-slate-500/20`}
        >
          {/* <ImSpinner8 className="animate-spin text-sm" /> */}
          {/* <BiSolidLike className="size-4" /> */}
          <BiLike className="size-4" />

          <span className="text-xs">{formatNumber(likes.length)}</span>
        </button>
      </div>
    </div>
  );
};

export default StudyHubCard;

function Image({
  url,
  des,
  className,
}: {
  url: string;
  des: string;
  className?: string;
}) {
  const { src } = useImage({
    srcList: url,
  });

  return <img src={src} alt={des} className={className} />;
}
