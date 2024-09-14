import { User } from "@/context/AuthProvider";
import { IoIosClose } from "react-icons/io";
import { redirect } from "react-router-dom";
import { toast } from "sonner";
export const takeInfoToServer = async (
  data: ProfileType,
  login: (userData: User) => void
) => {
  const res = await fetch("/api/user/take-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    return toast.error(result.message, {
      className: "border border-slate-400",
      action: {
        label: <IoIosClose className="size-6 dark:text-white" />,
        onClick: () => null,
      },
    });
  }
  login(result.user);
  return redirect("/payment-verify");
};

export const followUser = async (id: string): Promise<string[]> => {
  const res = await fetch(`/api/user/follow/${id}`);
  const result = await res.json();
  if (!res.ok) {
    throw {
      message: result.message || res.statusText,
    };
  }
  return result;
};

export interface ProfileType {
  user: User;
  postsCount: number;
}

export const getUserProfile = async (
  username: string
): Promise<Partial<ProfileType>> => {
  const res = await fetch(`/api/user/${username}`);
  const result = await res.json();
  if (!res.ok) {
    throw {
      message: result.message || res.statusText,
    };
  }
  return result;
};

export interface UserBlogsType {
  _id: string;
  title: string;
  coverImage: string;
  createdAt: Date;
  likes: string[];
  authorId: string;
}

export interface UserBlogInfoType {
  blogs: UserBlogsType[];
  totalPages: number;
  currentPage: number;
}

export const getUserBlogs = async (
  username: string,
  page?: number
): Promise<UserBlogInfoType> => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page.toString());
  }
  const url = `/api/user/blog/${username}?${params.toString()}`; // Build URL with query params
  const res = await fetch(url);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || res.statusText);
  }

  return result;
};
