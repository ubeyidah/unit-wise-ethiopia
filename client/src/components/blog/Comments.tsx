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

const Comments = () => {
  const isLikedComment = [0].includes(0);
  return (
    <div>
      <div id="comment">
        <label>
          Write Comment
          <Textarea placeholder="Add a comment" className="h-24" />
        </label>
        <div className="flex items-center justify-end relative pt-2">
          <Button variant="outline" className="rounded-full" type="submit">
            comment
          </Button>
        </div>
      </div>

      <h3>Comments</h3>
      <Separator />
      <div>
        <div className="grid grid-cols-[40px,1fr] gap-2 my-3">
          <Avatar className="w-10 h-10 rounded-full object-cover object-center">
            <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocKjo0iW0sEmIk1yNKbo0iTRC61RDzmd1wXaAlS10tDxw7uc7bY=s96-c" />
            <AvatarFallback className="uppercase">
              <Skeleton className="w-full h-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-xs flex items-center gap-1">
              <p>@ubeyidah - </p>
              <p className="opacity-60">30 min ago</p>
            </div>
            <div>
              <h2 className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                doloribus libero obcaecati, recusandae corrupti nam impedit
                consectetur minima molestiae quis necessitatibus dicta ea
                exercitationem deserunt magni officia odio deleniti provident.{" "}
              </h2>
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
    </div>
  );
};

export default Comments;
