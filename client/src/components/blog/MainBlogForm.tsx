import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { MdMoreVert } from "react-icons/md";
import useUploadImage from "@/hooks/useUploadImage";
import { ChangeEvent, useEffect } from "react";
import Joi from "joi";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { PartialBlock } from "@blocknote/core";
import { BlogType } from "@/apis/blog/blog.api";

type PropType = {
  blog: BlogType;
  update: (name: string, value: string | [] | PartialBlock[]) => void;
  next: () => void;
};

const MainBlogForm = ({ blog, update, next }: PropType) => {
  let { progress, url, uploadImage } = useUploadImage();
  const handleImageUplaod = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    uploadImage(file, "postImages");
  };

  useEffect(() => {
    if (url && !blog.coverImage) {
      update("coverImage", url as string);
      url = null;
    }
  }, [url]);
  const handleURLImgae = (e: any) => {
    const urlSchema = Joi.string().required().uri();
    e.preventDefault();
    const inputElment = e.target.querySelector("input");
    const inputURL = inputElment.value;
    const { error } = urlSchema.validate(inputURL);
    if (error) {
      inputElment.style.borderColor = "red";
      toast.info("invalid image url.", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
      return;
    }
    inputElment.style.borderColor = "gray";
    update("coverImage", inputURL);
  };

  const handlePublishBtn = () => {
    const schema = Joi.object({
      title: Joi.string().required(),
      coverImage: Joi.string().required().uri(),
      content: Joi.array().required().min(2),
    });
    const { error } = schema.validate({
      title: blog.title,
      coverImage: blog.coverImage,
      content: blog.content,
    });
    if (error) {
      toast.error("Please fill all required fields to publish.", {
        action: {
          label: "x",
          onClick: () => null,
        },
      });
      return;
    }
    next();
  };
  return (
    <div className="max-w-3xl px-3 mx-auto pb-7">
      <div>
        <div className="flex items-end justify-between">
          <h1 className="text-xl text-green-600 font-bold">
            Share Your Knowledge
          </h1>
          <Button onClick={handlePublishBtn}>Next</Button>
        </div>
        <p className="my-4 max-sm:text-sm">
          Welcome to StudyHub, your place to share and help others. Write,
          upload an image, or share a resource. The more we share, the more we
          all grow!
        </p>
      </div>
      <TextareaAutosize
        placeholder="Untitled"
        className="w-full resize-none text-3xl max-sm:text-xl outline-none font-extrabold appearance-none overflow-hidden bg-transparent"
        value={blog.title}
        onChange={(e) => update("title", e.target.value)}
      />
      {blog.coverImage ? (
        <div className="relative my-7 aspect-video border rounded-md">
          <Button
            className="absolute right-1 top-1"
            variant="outline"
            onClick={() => update("coverImage", "")}
          >
            <IoClose className="size-5" />
          </Button>
          <img
            className="w-full h-full object-cover object-center  rounded-md"
            src={blog.coverImage}
            alt="please add valid image"
          />
        </div>
      ) : progress ? (
        <div className="flex items-center justify-center aspect-video border rounded-md my-7">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
          />
          <span className="text-xl absolute dark:text-white text-black">
            {progress.toFixed(0)}%
          </span>
        </div>
      ) : (
        <div className=" my-7">
          <div className="flex items-center justify-end mb-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  <MdMoreVert />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm text-gray-400 mb-2">
                  Add cover image from url
                </p>
                <form
                  onSubmit={handleURLImgae}
                  className="flex items-center gap-2"
                >
                  <Input placeholder="URL" />
                  <Button variant="outline">Add</Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800/20 dark:bg-gray-700/10 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUplaod}
            />
          </label>
        </div>
      )}
      <div>
        <Editor
          onChange={(value) => {
            update("content", value);
          }}
          initialContent={JSON.stringify(blog.content)}
        />
      </div>
    </div>
  );
};

export default MainBlogForm;
