import { toast } from "sonner";

export interface SubjectsType {
  subjectName: string;
  percent: number;
  _id: string;
  total: number;
}

export type FromType = {
  unit: number;
  grade: number;
};

export type SubTopicType = {
  name?: string;
  child: string[];
};
type ProgressType = {
  chapter: string;
  isComplete: boolean;
};
export interface SubjectDetailType {
  chapter: string;
  title: string;
  from?: FromType[];
  subTopics?: SubTopicType[];
  progress: ProgressType;
  isOpen?: boolean;
}

export const getSubjects = async (): Promise<SubjectsType[]> => {
  const res = await fetch("/api/subject");
  const subjects = await res.json();
  return subjects;
};
export const getSubject = async (
  subject: string
): Promise<SubjectDetailType[]> => {
  const res = await fetch(`/api/subject/${subject}`);
  const subjects = await res.json();
  return subjects;
};
export type MarkSubjectType = {
  chapter: string;
  value: boolean;
};
export const markSubject = async (
  subject: string,
  markData: MarkSubjectType
): Promise<{ message: string }> => {
  const res = await fetch(`/api/subject/${subject}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(markData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
    };
  }
  return data;
};

export interface SubjectCommentType {
  _id: string;
  authorId: string;
  message: string;
  subject: string;
  likes: string[];
  replies: { userId: string; replie: string }[];
}

export const createSubjectComment = async (
  subject: string,
  comment: string
): Promise<SubjectCommentType | undefined> => {
  const res = await fetch("/api/user/subject-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, comment }),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status == 400) {
      toast.error(data.message);
      return;
    }
    throw {
      message: data.message,
    };
  }
  return data;
};

export type SubjectMessageType = {
  _id: string;
  userName: string;
  profileImage: string;
};

export type SubjectCommentReplieType = {
  userId: SubjectMessageType;
  replie: string;
  _id: string;
  createdAt: Date;
};

export type SubjectComType = {
  _id: string;
  authorId: SubjectMessageType;
  message: string;
  subject: string;
  likes: string[];
  replies: SubjectCommentReplieType[];
  createdAt: Date;
};

export interface SubjectCommentsListType {
  comments: SubjectComType[];
  totalPages: number;
  currentPage: number;
}

export const getSubjectComments = async (
  subject: string
): Promise<SubjectCommentsListType> => {
  const res = await fetch(`/api/user/subject-comments/${subject}`);
  const subjectComment = await res.json();
  return subjectComment;
};
export const loadMoreSubjectComments = async (
  subject: string,
  page: number
): Promise<SubjectCommentsListType> => {
  const res = await fetch(`/api/user/subject-comments/${subject}?page=${page}`);
  const loadedSubjectComments = await res.json();
  if (!res.ok) {
    throw {
      message: loadedSubjectComments.message || res.statusText,
    };
  }
  return loadedSubjectComments;
};

export const likeSubjectComment = async (
  commentId: string
): Promise<SubjectComType> => {
  const res = await fetch(`/api/user/comment-like/${commentId}`);
  const modifiedComment = await res.json();
  if (!res.ok) {
    throw {
      message: modifiedComment.message || res.statusText,
    };
  }
  return modifiedComment;
};

export const replySubjectComment = async (
  commentId: string,
  reply: string
): Promise<SubjectComType> => {
  const res = await fetch(`/api/user/subject-comment/replie/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reply }),
  });
  const replyComment = await res.json();
  if (!res.ok) {
    throw {
      message: replyComment.message || res.statusText,
    };
  }
  return replyComment;
};

export const deleteSubjectComment = async (commentId: string) => {
  const res = await fetch(`/api/user/subject-comment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw {
      message: result.message || res.statusText,
    };
  }
  return result;
};
export const deleteReplySubjectComment = async (
  commentId: string,
  replyId: string
) => {
  const res = await fetch(`/api/user/subject/replie/${replyId}`, {
    method: "PUT",
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
