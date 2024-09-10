import { useState } from "react";
import MainBlogForm from "@/components/blog/MainBlogForm";
import { PartialBlock } from "@blocknote/core";
import FinalPublishform from "@/components/blog/FinalPublishform";

export interface BlogType {
  title: string;
  coverImage: string;
  description: string;
  content: [{}];
  tags: [];
}
const WriteStudyHubPost = () => {
  const [blog, setBlog] = useState<BlogType>({
    title: "",
    coverImage: "",
    description: "",
    content: [{}],
    tags: [],
  });
  const [page, setPage] = useState<"main" | "publish">("main");

  const handleChange = (name: string, value: string | PartialBlock[] | []) => {
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const next = () => {
    setPage("publish");
  };

  const back = () => {
    setPage("main");
  };
  return (
    <section>
      {page == "publish" ? (
        <FinalPublishform back={back} blog={blog} update={handleChange} />
      ) : (
        <MainBlogForm blog={blog} update={handleChange} next={next} />
      )}
    </section>
  );
};

export default WriteStudyHubPost;
