export interface BlogType {
  title: string;
  coverImage: string;
  description: string;
  content: [any];
  tags: string[];
  createdAt: Date;
}

export const createBlog = async (blogData: Partial<BlogType>) => {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });
  const result = await res.json();
  if (!res.ok) {
    throw {
      message: result.message,
      hidden: true,
    };
  }
  return result;
};
