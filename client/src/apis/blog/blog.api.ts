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

export interface BlogInfoType {
  blogs: BlogsType[];
  totalPages: number;
  currentPage: number;
}

export const getBlogs = async (
  page?: number,
  search?: string,
  filter?: string
): Promise<BlogInfoType> => {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page.toString());
  }

  if (search) {
    params.append("search", search);
  }

  if (filter) {
    params.append("filter", filter);
  }

  const url = `/api/blog?${params.toString()}`; // Build URL with query params
  const res = await fetch(url);
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
