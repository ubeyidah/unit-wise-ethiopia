export interface SubjectsType {
  subjectName: string;
  percent: number;
  _id: string;
  total: number;
}

export const getSubjects = async (): Promise<SubjectsType[]> => {
  const res = await fetch("/api/subject");
  const subjects = await res.json();
  return subjects;
};
