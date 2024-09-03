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
  const subjects = await res.json();
  return subjects;
};
export const loadMoreSubjectComments = async (
  subject: string,
  page: number
): Promise<SubjectCommentsListType> => {
  const res = await fetch(`/api/user/subject-comments/${subject}?page=${page}`);
  const subjects = await res.json();
  if (!res.ok) {
    throw {
      message: subjects.message || res.statusText,
    };
  }
  return subjects;
};
