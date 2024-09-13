export interface BlogType {
  title: string;
  coverImage: string;
  description: string;
  content: string;
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
  search?: string
): Promise<BlogInfoType> => {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page.toString());
  }

  if (search) {
    params.append("search", search);
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
    followers: string[];
  };
  likes: string[];
  content: string;
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

export const likeBlogs = async (blogId: string): Promise<string[]> => {
  const res = await fetch(`/api/blog/like/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};
export const createBlogComment = async (
  blogId: string,
  comment: string
): Promise<string[]> => {
  const res = await fetch(`/api/blog/comment/${blogId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};

type blogCommentAuthorType = {
  _id: string;
  userName: string;
  profileImage: string;
};

type blogCommentReplieType = {
  userId: blogCommentAuthorType;
  replie: string;
  _id: string;
  createdAt: Date;
};

export interface BlogCommentType {
  _id: string;
  authorId: blogCommentAuthorType;
  message: string;
  blogId: string;
  likes: string[];
  replies: blogCommentReplieType[];
  createdAt: Date;
  updatedAt: Date;
}
export interface BlogCommentInfoType {
  comments: BlogCommentType[];
  totalPages: number;
  currentPage: number;
}

export const getBlogComments = async (
  blogId: string,
  page?: number
): Promise<BlogCommentInfoType> => {
  const res = await fetch(`/api/blog/comment/${blogId}?page=${page || 1}`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};

export const likeBlogComments = async (
  commentId: string
): Promise<string[]> => {
  const res = await fetch(`/api/blog/comment/like/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};

export const deleteBlogComments = async (
  commentId: string
): Promise<string[]> => {
  const res = await fetch(`/api/blog/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};

export const replyBlogComment = async (commentId: string, reply: string) => {
  const res = await fetch(`/api/blog/comment/reply/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ reply }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }
  return result;
};

export const deleteReplyBlogComment = async (
  commentId: string,
  replyId: string
) => {
  const res = await fetch(`/api/blog/comment/reply/${replyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  const replyComment = await res.json();
  if (!res.ok) {
    throw {
      message: replyComment.message || res.statusText,
    };
  }
  return replyComment;
};
