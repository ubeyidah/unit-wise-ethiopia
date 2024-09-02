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
