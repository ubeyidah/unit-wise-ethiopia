import { BlogType, getBlog } from "@/apis/blog/blog.api";
import "@blocknote/mantine/style.css";
import { Suspense, useState } from "react";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";

export const loader: LoaderFunction = ({ params }) => {
  const blogId = params.id || "";
  const blogPromise = getBlog(blogId);
  return defer({ blog: blogPromise });
};
type LoaderData = {
  blog: Promise<BlogType>;
};
const StudyHubDetail = () => {
  const { blog } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={blog}>
        {(blogDetail: BlogType) => {
          const [singleBlog, setSingleBlog] = useState<BlogType>(blogDetail);
          console.log(singleBlog);

          return (
            <section className="max-w-3xl mx-auto">
              <div>
                <img
                  src={blogDetail.coverImage}
                  alt="blog cover image"
                  className="w-full rounded-md"
                />
              </div>
              <h1 className="text-xl my-3">{blogDetail.title}</h1>
              {blogDetail.description}
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default StudyHubDetail;
