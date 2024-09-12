import { BlogType } from "@/pages/app/WriteStudyHubPost";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { PartialBlock } from "@blocknote/core";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
import Joi from "joi";
import { createBlog } from "@/apis/blog/blog.api";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

type PropType = {
  back: () => void;
  blog: BlogType;
  update: (name: string, value: string | [] | PartialBlock[]) => void;
};
const FinalPublishform = ({ back, blog, update }: PropType) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTags = (e: any) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault();
      if (blog.tags.length > 9) {
        toast.info("Maximum 10 tags are allowed", {
          className: "border",
          action: {
            label: "x",
            onClick: () => null,
          },
        });
        return;
      }
      const value = e.target.value;
      if (!value) return;
      update("tags", [...blog.tags, value.trim()]);
      e.target.value = "";
    }
  };

  const handleDelete = (tag: string) => {
    update(
      "tags",
      blog.tags.filter((t) => t !== tag)
    );
  };
  const maxDes = 200;

  const handlePublish = async () => {
    try {
      setLoading(true);
      const postSchema = Joi.object({
        title: Joi.string().required(),
        coverImage: Joi.string().required().uri(),
        content: Joi.array().required().min(2),
        description: Joi.string().required(),
        tags: Joi.array().required().min(1).max(10),
      });
      const { error } = postSchema.validate(blog);
      if (error) {
        return toast.error(error.details[0].message, {
          className: "border",
          action: {
            label: "x",
            onClick: () => null,
          },
        });
      }
      console.log(blog.content);

      await createBlog({ ...blog, content: JSON.stringify(blog.content) });
      toast.success("👍Your Blog Published Successfully", {
        className: "border",
        action: {
          label: "x",
          onClick: () => null,
        },
      });
      navigate("/dashboard/study-hub");
    } catch (error) {
      toast.error("Opps! No internet connection", {
        className: "border",
        action: {
          label: "x",
          onClick: () => null,
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl px-1 mx-auto pb-7">
      <div className="flex items-center justify-start w-full">
        <Button variant="outline" onClick={back}>
          Back
        </Button>
      </div>
      <div className="aspect-video my-5">
        <img
          className="w-full h-full object-cover object-center  rounded-md"
          src={blog.coverImage}
          alt="please add valid image"
        />
      </div>
      <div>
        <p className="-mb-1 text-sm">Title</p>
        <TextareaAutosize
          placeholder="Untitled"
          className="w-full resize-none text-3xl max-sm:text-xl outline-none font-extrabold appearance-none overflow-hidden bg-transparent"
          value={blog.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="mt-3">
        <p className=" text-sm">Description</p>
        <Textarea
          placeholder="description your blog with in 200 characters "
          value={blog.description}
          maxLength={maxDes}
          onChange={(e) => update("description", e.target.value)}
          className="h-32"
        />
        <small className="text-right w-full block mr-1">
          {maxDes - blog.description.length}
        </small>
      </div>
      <div className="mt-3">
        <p className="text-sm mb-1">Tags(help others to get your blog)</p>
        <Input placeholder="math, vector...." onKeyDown={handleTags} />
        <div className="flex items-center gap-2 flex-wrap mt-3 pr-0">
          {blog.tags.map((tag, i) => (
            <div
              key={i}
              className="border rounded-full bg-slate-400/10 pl-2 text-sm flex items-center"
            >
              {tag}
              <button
                className="ml-2 bg-red-400/20 hover:bg-red-400/30 rounded-full p-1"
                onClick={() => handleDelete(tag)}
              >
                <IoIosClose />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        <Button
          onClick={handlePublish}
          className="w-32 rounded-full flex gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <ImSpinner8 className="animate-spin" /> Publishing
            </>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FinalPublishform;
