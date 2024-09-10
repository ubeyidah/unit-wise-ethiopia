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

export interface BlogsType {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  updatedAt: Date;
  author: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  likes: string[];
}
export const getBlogs = async (): Promise<BlogType[]> => {
  const res = await fetch("/api/blog");
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};
export interface BlogType {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  author: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  likes: string[];
  content: [any];
  tags: string[];
  updatedAt: Date;
}
export const getBlog = async (id: string): Promise<BlogType> => {
  const res = await fetch(`/api/blog/${id}`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};
